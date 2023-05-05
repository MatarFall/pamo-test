import {UserService} from '@loopback/authentication';
import {inject} from '@loopback/context';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId} from '@loopback/security';
import {PasswordHasherBindings} from '../keys';
import {User} from '../models';
import {Credentials, UserRepository} from '../repositories';
import {PasswordHasher} from './hash-password.service';

export class MyUserService implements UserService<User, Credentials> {
    constructor(
        @repository(UserRepository) public userRepository: UserRepository,
        @inject(PasswordHasherBindings.PASSWORD_HASHER) public passwordHasher: PasswordHasher
    ) {}

    async verifyCredentials(credentials: any): Promise<User> {
        const invalidCredentialsError = 'Invalid email or password.';

        const foundUser = await this.userRepository.findOne({
            where: {email: credentials.login},
            include: [{relation: 'role'}]
        });
        if (!foundUser) {
            throw new HttpErrors.Unauthorized(invalidCredentialsError);
        }

        const credentialsFound = await this.userRepository.findCredentials(foundUser.userId);
        if (!credentialsFound) {
            throw new HttpErrors.Unauthorized(invalidCredentialsError);
        }

        const passwordMatched = await this.passwordHasher.comparePassword(credentials.password, credentialsFound.password);

        if (!passwordMatched) {
            throw new HttpErrors.Unauthorized(invalidCredentialsError);
        }
        return foundUser;
    }

    convertToUserProfile(user: any): any {
        // since first name and lastName are optional, no error is thrown if not provided
        return {
            [securityId]: user.email,
            email: user.email,
            role: user.role.code
        };
    }
}
