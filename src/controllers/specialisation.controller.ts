import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody, response} from '@loopback/rest';
import {Specialisation} from '../models';
import {SpecialisationRepository} from '../repositories';

export class SpecialisationController {
    constructor(@repository(SpecialisationRepository) public specialisationRepository: SpecialisationRepository) {}

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @post('/specialisations')
    @response(200, {
        description: 'Specialisation model instance',
        content: {'application/json': {schema: getModelSchemaRef(Specialisation)}}
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Specialisation, {
                        title: 'NewSpecialisation',
                        exclude: ['specialisationId']
                    })
                }
            }
        })
        specialisation: Omit<Specialisation, 'specialisationId'>
    ): Promise<Specialisation> {
        return this.specialisationRepository.create(specialisation);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @get('/specialisations/count')
    @response(200, {
        description: 'Specialisation model count',
        content: {'application/json': {schema: CountSchema}}
    })
    async count(@param.where(Specialisation) where?: Where<Specialisation>): Promise<Count> {
        return this.specialisationRepository.count(where);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN', 'ROLE_USER']})
    @get('/specialisations')
    @response(200, {
        description: 'Array of Specialisation model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(Specialisation, {includeRelations: true})
                }
            }
        }
    })
    async find(@param.filter(Specialisation) filter?: Filter<Specialisation>): Promise<Specialisation[]> {
        return this.specialisationRepository.find(filter);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @patch('/specialisations')
    @response(200, {
        description: 'Specialisation PATCH success count',
        content: {'application/json': {schema: CountSchema}}
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Specialisation, {partial: true})
                }
            }
        })
        specialisation: Specialisation,
        @param.where(Specialisation) where?: Where<Specialisation>
    ): Promise<Count> {
        return this.specialisationRepository.updateAll(specialisation, where);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @get('/specialisations/{id}')
    @response(200, {
        description: 'Specialisation model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(Specialisation, {includeRelations: true})
            }
        }
    })
    async findById(
        @param.path.number('id') id: number,
        @param.filter(Specialisation, {exclude: 'where'})
        filter?: FilterExcludingWhere<Specialisation>
    ): Promise<Specialisation> {
        return this.specialisationRepository.findById(id, filter);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @patch('/specialisations/{id}')
    @response(204, {
        description: 'Specialisation PATCH success'
    })
    async updateById(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Specialisation, {partial: true})
                }
            }
        })
        specialisation: Specialisation
    ): Promise<void> {
        await this.specialisationRepository.updateById(id, specialisation);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @put('/specialisations/{id}')
    @response(204, {
        description: 'Specialisation PUT success'
    })
    async replaceById(@param.path.number('id') id: number, @requestBody() specialisation: Specialisation): Promise<void> {
        await this.specialisationRepository.replaceById(id, specialisation);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @del('/specialisations/{id}')
    @response(204, {
        description: 'Specialisation DELETE success'
    })
    async deleteById(@param.path.number('id') id: number): Promise<void> {
        await this.specialisationRepository.deleteById(id);
    }
}
