import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {Count, CountSchema, Filter, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, getWhereSchemaFor, param, patch, post, requestBody} from '@loopback/rest';
import {User, UserCredentials} from '../models';
import {UserRepository} from '../repositories';

export class UserUserCredentialsController {
    constructor(@repository(UserRepository) protected userRepository: UserRepository) {}

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_MEDECIN']})
    @get('/users/{id}/user-credentials', {
        responses: {
            '200': {
                description: 'User has one UserCredentials',
                content: {
                    'application/json': {
                        schema: getModelSchemaRef(UserCredentials)
                    }
                }
            }
        }
    })
    async get(
        @param.path.number('id') id: number,
        @param.query.object('filter') filter?: Filter<UserCredentials>
    ): Promise<UserCredentials> {
        return this.userRepository.userCredentials(id).get(filter);
    }

    @post('/users/{id}/user-credentials', {
        responses: {
            '200': {
                description: 'User model instance',
                content: {'application/json': {schema: getModelSchemaRef(UserCredentials)}}
            }
        }
    })
    async create(
        @param.path.number('id') id: typeof User.prototype.userId,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(UserCredentials, {
                        title: 'NewUserCredentialsInUser',
                        exclude: ['id'],
                        optional: ['userId']
                    })
                }
            }
        })
        userCredentials: Omit<UserCredentials, 'id'>
    ): Promise<UserCredentials> {
        return this.userRepository.userCredentials(id).create(userCredentials);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @patch('/users/{id}/user-credentials', {
        responses: {
            '200': {
                description: 'User.UserCredentials PATCH success count',
                content: {'application/json': {schema: CountSchema}}
            }
        }
    })
    async patch(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(UserCredentials, {partial: true})
                }
            }
        })
        userCredentials: Partial<UserCredentials>,
        @param.query.object('where', getWhereSchemaFor(UserCredentials))
        where?: Where<UserCredentials>
    ): Promise<Count> {
        return this.userRepository.userCredentials(id).patch(userCredentials, where);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @del('/users/{id}/user-credentials', {
        responses: {
            '200': {
                description: 'User.UserCredentials DELETE success count',
                content: {'application/json': {schema: CountSchema}}
            }
        }
    })
    async delete(
        @param.path.number('id') id: number,
        @param.query.object('where', getWhereSchemaFor(UserCredentials))
        where?: Where<UserCredentials>
    ): Promise<Count> {
        return this.userRepository.userCredentials(id).delete(where);
    }
}
