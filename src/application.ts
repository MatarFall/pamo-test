import {AuthenticationComponent, registerAuthenticationStrategy} from '@loopback/authentication';
import {OPERATION_SECURITY_SPEC, SECURITY_SCHEME_SPEC} from '@loopback/authentication-jwt';
import {
    AuthorizationBindings,
    AuthorizationComponent,
    AuthorizationDecision,
    AuthorizationOptions,
    AuthorizationTags
} from '@loopback/authorization';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, createBindingFromClass} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {OpenApiSpec, RestApplication} from '@loopback/rest';
import {RestExplorerBindings, RestExplorerComponent} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {PasswordHasherBindings, TokenServiceBindings, TokenServiceConstants, UserServiceBindings} from './keys';
import {MySequence} from './sequence';
import {BcryptHasher, jwtService, MyUserService} from './services';
import {JWTAuthenticationStrategy} from './utils/authentication-strategies/jwt-strategy';
import {MyAuthorizationProvider} from './utils/authorization-provider/MyAuthorizationProvider';

export {ApplicationConfig};

const optionsAuthorization: AuthorizationOptions = {
    precedence: AuthorizationDecision.DENY,
    defaultDecision: AuthorizationDecision.DENY
};
export class PamoBackendApplication extends BootMixin(ServiceMixin(RepositoryMixin(RestApplication))) {
    constructor(options: ApplicationConfig = {}) {
        super(options);

        // Set up the custom sequence
        this.sequence(MySequence);

        // Set up default home page
        this.static('/', path.join(__dirname, '../public'));

        // Customize @loopback/rest-explorer configuration here
        this.configure(RestExplorerBindings.COMPONENT).to({
            path: '/explorer'
        });
        this.component(RestExplorerComponent);

        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true
            }
        };

        this.add(createBindingFromClass(JWTAuthenticationStrategy));
        registerAuthenticationStrategy(this, JWTAuthenticationStrategy);

        // Mount authentication system
        this.component(AuthenticationComponent);

        this.component(AuthorizationComponent);
        this.configure(AuthorizationBindings.COMPONENT).to(optionsAuthorization);

        this.setUpBindings();

        const spec: OpenApiSpec = {
            openapi: '3.0.0',
            info: {title: 'pkg.name', version: 'pkg.version'},
            paths: {},
            components: {securitySchemes: SECURITY_SCHEME_SPEC},
            servers: [{url: '/api'}],
            security: OPERATION_SECURITY_SPEC
        };
        this.api(spec);
    }

    private setUpBindings(): void {
        // Bind package.json to the application context
        // this.bind(PackageKey).to(pkg);

        this.bind(TokenServiceBindings.TOKEN_SECRET).to(TokenServiceConstants.TOKEN_SECRET_VALUE);

        this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE);

        this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(jwtService);

        // // Bind bcrypt hash services
        this.bind(PasswordHasherBindings.ROUNDS).to(10);
        this.bind(PasswordHasherBindings.PASSWORD_HASHER).toClass(BcryptHasher);

        this.bind(UserServiceBindings.USER_SERVICE).toClass(MyUserService);

        // Authorization
        this.bind('authorizationProviders.my-authorizer-provider').toProvider(MyAuthorizationProvider).tag(AuthorizationTags.AUTHORIZER);
    }
}
