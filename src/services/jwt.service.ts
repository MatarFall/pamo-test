import {TokenService} from '@loopback/authentication';
import {TokenServiceBindings} from '@loopback/authentication-jwt';
import {/* inject, */ BindingScope, inject, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {promisify} from 'util';
import {RoleRepository} from '../repositories';

const jwt = require('jsonwebtoken');
const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);

@injectable({scope: BindingScope.TRANSIENT})
export class jwtService implements TokenService {
    constructor(
        @inject(TokenServiceBindings.TOKEN_SECRET) private jwtSecret: string,
        @inject(TokenServiceBindings.TOKEN_EXPIRES_IN) private jwtExpiresIn: string,
        @repository(RoleRepository) public roleRepository: RoleRepository
    ) {}

    /*
   * Add service methods here
   */

    async verifyToken(token: string): Promise<any> {
        if (!token) {
            throw new HttpErrors.Unauthorized(`Error verifying token : 'token' is null`);
        }

        let userProfile: UserProfile;

        try {
            // decode user profile from token
            const decodedToken = await verifyAsync(token, this.jwtSecret);
            console.log('decodedToken', decodedToken);

            // don't copy over  token field 'iat' and 'exp', nor 'email' to user profile
            userProfile = Object.assign(
                {[securityId]: ''},
                {
                    [securityId]: decodedToken.email,
                    email: decodedToken.email,
                    role: decodedToken.role
                }
            );
        } catch (error) {
            throw new HttpErrors.Unauthorized(`Error verifying token : ${error.message}`);
        }
        return userProfile;
    }

    async generateToken(userProfile: any): Promise<any> {
        if (!userProfile) {
            throw new HttpErrors.Unauthorized('Error generating token : userProfile is null');
        }
        const userInfoForToken = {
            email: userProfile.email,
            role: userProfile.role
        };
        // Generate a JSON Web Token
        let token: string;
        try {
            token = await signAsync(userInfoForToken, this.jwtSecret, {
                expiresIn: Number(this.jwtExpiresIn)
            });
        } catch (error) {
            throw new HttpErrors.Unauthorized(`Error encoding token : ${error}`);
        }

        return token;
    }
}
