import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody, response} from '@loopback/rest';
import {Prestataire} from '../models';
import {PrestataireRepository} from '../repositories';

export class PrestataireController {
    constructor(@repository(PrestataireRepository) public prestataireRepository: PrestataireRepository) {}

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @post('/prestataires')
    @response(200, {
        description: 'Prestataire model instance',
        content: {'application/json': {schema: getModelSchemaRef(Prestataire)}}
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Prestataire, {
                        title: 'NewPrestataire',
                        exclude: ['prestataireId']
                    })
                }
            }
        })
        prestataire: Omit<Prestataire, 'prestataireId'>
    ): Promise<Prestataire> {
        return this.prestataireRepository.create(prestataire);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @get('/prestataires/count')
    @response(200, {
        description: 'Prestataire model count',
        content: {'application/json': {schema: CountSchema}}
    })
    async count(@param.where(Prestataire) where?: Where<Prestataire>): Promise<Count> {
        return this.prestataireRepository.count(where);
    }

    @get('/prestataires')
    @response(200, {
        description: 'Array of Prestataire model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(Prestataire, {includeRelations: true})
                }
            }
        }
    })
    async find(@param.filter(Prestataire) filter?: Filter<Prestataire>): Promise<Prestataire[]> {
        return this.prestataireRepository.find(filter);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @patch('/prestataires')
    @response(200, {
        description: 'Prestataire PATCH success count',
        content: {'application/json': {schema: CountSchema}}
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Prestataire, {partial: true})
                }
            }
        })
        prestataire: Prestataire,
        @param.where(Prestataire) where?: Where<Prestataire>
    ): Promise<Count> {
        return this.prestataireRepository.updateAll(prestataire, where);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @get('/prestataires/{id}')
    @response(200, {
        description: 'Prestataire model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(Prestataire, {includeRelations: true})
            }
        }
    })
    async findById(
        @param.path.number('id') id: number,
        @param.filter(Prestataire, {exclude: 'where'})
        filter?: FilterExcludingWhere<Prestataire>
    ): Promise<Prestataire> {
        return this.prestataireRepository.findById(id, filter);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @patch('/prestataires/{id}')
    @response(204, {
        description: 'Prestataire PATCH success'
    })
    async updateById(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Prestataire, {partial: true})
                }
            }
        })
        prestataire: Prestataire
    ): Promise<void> {
        await this.prestataireRepository.updateById(id, prestataire);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @put('/prestataires/{id}')
    @response(204, {
        description: 'Prestataire PUT success'
    })
    async replaceById(@param.path.number('id') id: number, @requestBody() prestataire: Prestataire): Promise<void> {
        await this.prestataireRepository.replaceById(id, prestataire);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @del('/prestataires/{id}')
    @response(204, {
        description: 'Prestataire DELETE success'
    })
    async deleteById(@param.path.number('id') id: number): Promise<void> {
        await this.prestataireRepository.deleteById(id);
    }
}
