import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody, response} from '@loopback/rest';
import {User} from '../models';
import {UserRepository} from '../repositories';

export class UserController {
    constructor(@repository(UserRepository) public userRepository: UserRepository) {}

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN','ROLE_USER']})
    @post('/users')
    @response(200, {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(User)}}
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(User, {
                        title: 'NewUser',
                        exclude: ['userId']
                    })
                }
            }
        })
        user: Omit<User, 'userId'>
    ): Promise<User> {
        return this.userRepository.create(user);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN', 'ROLE_MEDECIN']})
    @get('/users/count')
    @response(200, {
        description: 'User model count',
        content: {'application/json': {schema: CountSchema}}
    })
    async count(@param.where(User) where?: Where<User>): Promise<Count> {
        return this.userRepository.count(where);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN', 'ROLE_MEDECIN','ROLE_USER']})
    @get('/users')
    @response(200, {
        description: 'Array of User model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(User, {includeRelations: true})
                }
            }
        }
    })
    async find(@param.filter(User) filter?: Filter<User>): Promise<User[]> {
        return this.userRepository.find(filter);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN','ROLE_USER']})
    @patch('/users')
    @response(200, {
        description: 'User PATCH success count',
        content: {'application/json': {schema: CountSchema}}
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(User, {partial: true})
                }
            }
        })
        user: User,
        @param.where(User) where?: Where<User>
    ): Promise<Count> {
        return this.userRepository.updateAll(user, where);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN','ROLE_USER']})
    @get('/users/{id}')
    @response(200, {
        description: 'User model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(User, {includeRelations: true})
            }
        }
    })
    async findById(
        @param.path.number('id') id: number,
        @param.filter(User, {exclude: 'where'})
        filter?: FilterExcludingWhere<User>
    ): Promise<User> {
        return this.userRepository.findById(id, filter);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN', 'ROLE_USER']})
    @patch('/users/{id}')
    @response(204, {
        description: 'User PATCH success'
    })
    async updateById(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(User, {partial: true})
                }
            }
        })
        user: User
    ): Promise<void> {
        await this.userRepository.updateById(id, user);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN','ROLE_USER']})
    @put('/users/{id}')
    @response(204, {
        description: 'User PUT success'
    })
    async replaceById(@param.path.number('id') id: number, @requestBody() user: User): Promise<void> {
        await this.userRepository.replaceById(id, user);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN','ROLE_USER']})
    @del('/users/{id}')
    @response(204, {
        description: 'User DELETE success'
    })
    async deleteById(@param.path.number('id') id: number): Promise<void> {
        await this.userRepository.deleteById(id);
    }
}
