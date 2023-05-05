import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody, response} from '@loopback/rest';
import {Fichemedicale} from '../models';
import {FichemedicaleRepository} from '../repositories';

export class FichemedicaleController {
    constructor(@repository(FichemedicaleRepository) public fichemedicaleRepository: FichemedicaleRepository) {}

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_MEDECIN']})
    @post('/fichemedicales')
    @response(200, {
        description: 'Fichemedicale model instance',
        content: {'application/json': {schema: getModelSchemaRef(Fichemedicale)}}
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Fichemedicale, {
                        title: 'NewFichemedicale',
                        exclude: ['fichemedicaleId']
                    })
                }
            }
        })
        fichemedicale: Omit<Fichemedicale, 'fichemedicaleId'>
    ): Promise<Fichemedicale> {
        return this.fichemedicaleRepository.create(fichemedicale);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_MEDECIN']})
    @get('/fichemedicales/count')
    @response(200, {
        description: 'Fichemedicale model count',
        content: {'application/json': {schema: CountSchema}}
    })
    async count(@param.where(Fichemedicale) where?: Where<Fichemedicale>): Promise<Count> {
        return this.fichemedicaleRepository.count(where);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN', 'ROLE_MEDECIN']})
    @get('/fichemedicales')
    @response(200, {
        description: 'Array of Fichemedicale model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(Fichemedicale, {includeRelations: true})
                }
            }
        }
    })
    async find(@param.filter(Fichemedicale) filter?: Filter<Fichemedicale>): Promise<Fichemedicale[]> {
        return this.fichemedicaleRepository.find(filter);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @patch('/fichemedicales')
    @response(200, {
        description: 'Fichemedicale PATCH success count',
        content: {'application/json': {schema: CountSchema}}
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Fichemedicale, {partial: true})
                }
            }
        })
        fichemedicale: Fichemedicale,
        @param.where(Fichemedicale) where?: Where<Fichemedicale>
    ): Promise<Count> {
        return this.fichemedicaleRepository.updateAll(fichemedicale, where);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_MEDECIN']})
    @get('/fichemedicales/{id}')
    @response(200, {
        description: 'Fichemedicale model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(Fichemedicale, {includeRelations: true})
            }
        }
    })
    async findById(
        @param.path.number('id') id: number,
        @param.filter(Fichemedicale, {exclude: 'where'})
        filter?: FilterExcludingWhere<Fichemedicale>
    ): Promise<Fichemedicale> {
        return this.fichemedicaleRepository.findById(id, filter);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_MEDECIN']})
    @patch('/fichemedicales/{id}')
    @response(204, {
        description: 'Fichemedicale PATCH success'
    })
    async updateById(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Fichemedicale, {partial: true})
                }
            }
        })
        fichemedicale: Fichemedicale
    ): Promise<void> {
        await this.fichemedicaleRepository.updateById(id, fichemedicale);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_MEDECIN']})
    @put('/fichemedicales/{id}')
    @response(204, {
        description: 'Fichemedicale PUT success'
    })
    async replaceById(@param.path.number('id') id: number, @requestBody() fichemedicale: Fichemedicale): Promise<void> {
        await this.fichemedicaleRepository.replaceById(id, fichemedicale);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @del('/fichemedicales/{id}')
    @response(204, {
        description: 'Fichemedicale DELETE success'
    })
    async deleteById(@param.path.number('id') id: number): Promise<void> {
        await this.fichemedicaleRepository.deleteById(id);
    }
}
