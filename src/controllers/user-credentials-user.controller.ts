import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {User, UserCredentials} from '../models';
import {UserCredentialsRepository} from '../repositories';

export class UserCredentialsUserController {
    constructor(@repository(UserCredentialsRepository) public userCredentialsRepository: UserCredentialsRepository) {}

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN', 'ROLE_USER']})
    @get('/user-credentials/{id}/user', {
        responses: {
            '200': {
                description: 'User belonging to UserCredentials',
                content: {
                    'application/json': {
                        schema: {type: 'array', items: getModelSchemaRef(User)}
                    }
                }
            }
        }
    })
    async getUser(@param.path.number('id') id: typeof UserCredentials.prototype.id): Promise<User> {
        return this.userCredentialsRepository.user(id);
    }
}
