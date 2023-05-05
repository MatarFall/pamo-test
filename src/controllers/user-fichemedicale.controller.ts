import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {Count, CountSchema, Filter, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, getWhereSchemaFor, param, patch, post, requestBody} from '@loopback/rest';
import {Fichemedicale, User} from '../models';
import {UserRepository} from '../repositories';

export class UserFichemedicaleController {
    constructor(@repository(UserRepository) protected userRepository: UserRepository) {}

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_MEDECIN']})
    @get('/users/{id}/fichemedicale', {
        responses: {
            '200': {
                description: 'User has one Fichemedicale',
                content: {
                    'application/json': {
                        schema: getModelSchemaRef(Fichemedicale)
                    }
                }
            }
        }
    })
    async get(@param.path.number('id') id: number, @param.query.object('filter') filter?: Filter<Fichemedicale>): Promise<Fichemedicale> {
        return this.userRepository.fichemedicale(id).get(filter);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_MEDECIN']})
    @post('/users/{id}/fichemedicale', {
        responses: {
            '200': {
                description: 'User model instance',
                content: {'application/json': {schema: getModelSchemaRef(Fichemedicale)}}
            }
        }
    })
    async create(
        @param.path.number('id') id: typeof User.prototype.userId,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Fichemedicale, {
                        title: 'NewFichemedicaleInUser',
                        exclude: ['fichemedicaleId'],
                        optional: ['userId']
                    })
                }
            }
        })
        fichemedicale: Omit<Fichemedicale, 'fichemedicaleId'>
    ): Promise<Fichemedicale> {
        return this.userRepository.fichemedicale(id).create(fichemedicale);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_MEDECIN']})
    @patch('/users/{id}/fichemedicale', {
        responses: {
            '200': {
                description: 'User.Fichemedicale PATCH success count',
                content: {'application/json': {schema: CountSchema}}
            }
        }
    })
    async patch(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Fichemedicale, {partial: true})
                }
            }
        })
        fichemedicale: Partial<Fichemedicale>,
        @param.query.object('where', getWhereSchemaFor(Fichemedicale))
        where?: Where<Fichemedicale>
    ): Promise<Count> {
        return this.userRepository.fichemedicale(id).patch(fichemedicale, where);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @del('/users/{id}/fichemedicale', {
        responses: {
            '200': {
                description: 'User.Fichemedicale DELETE success count',
                content: {'application/json': {schema: CountSchema}}
            }
        }
    })
    async delete(
        @param.path.number('id') id: number,
        @param.query.object('where', getWhereSchemaFor(Fichemedicale))
        where?: Where<Fichemedicale>
    ): Promise<Count> {
        return this.userRepository.fichemedicale(id).delete(where);
    }
}
