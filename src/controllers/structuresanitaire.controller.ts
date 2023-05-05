import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody, response} from '@loopback/rest';
import {StructureSanitaire} from '../models';
import {StructureSanitaireRepository} from '../repositories';

export class StructuresanitaireController {
    constructor(@repository(StructureSanitaireRepository) public structureSanitaireRepository: StructureSanitaireRepository) {}

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @post('/structure-sanitaires')
    @response(200, {
        description: 'StructureSanitaire model instance',
        content: {'application/json': {schema: getModelSchemaRef(StructureSanitaire)}}
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(StructureSanitaire, {
                        title: 'NewStructureSanitaire',
                        exclude: ['structuresanitaireId']
                    })
                }
            }
        })
        structureSanitaire: Omit<StructureSanitaire, 'structuresanitaireId'>
    ): Promise<StructureSanitaire> {
        return this.structureSanitaireRepository.create(structureSanitaire);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @get('/structure-sanitaires/count')
    @response(200, {
        description: 'StructureSanitaire model count',
        content: {'application/json': {schema: CountSchema}}
    })
    async count(@param.where(StructureSanitaire) where?: Where<StructureSanitaire>): Promise<Count> {
        return this.structureSanitaireRepository.count(where);
    }

    @get('/structure-sanitaires')
    @response(200, {
        description: 'Array of StructureSanitaire model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(StructureSanitaire, {includeRelations: true})
                }
            }
        }
    })
    async find(@param.filter(StructureSanitaire) filter?: Filter<StructureSanitaire>): Promise<StructureSanitaire[]> {
        return this.structureSanitaireRepository.find(filter);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @patch('/structure-sanitaires')
    @response(200, {
        description: 'StructureSanitaire PATCH success count',
        content: {'application/json': {schema: CountSchema}}
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(StructureSanitaire, {partial: true})
                }
            }
        })
        structureSanitaire: StructureSanitaire,
        @param.where(StructureSanitaire) where?: Where<StructureSanitaire>
    ): Promise<Count> {
        return this.structureSanitaireRepository.updateAll(structureSanitaire, where);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @get('/structure-sanitaires/{id}')
    @response(200, {
        description: 'StructureSanitaire model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(StructureSanitaire, {includeRelations: true})
            }
        }
    })
    async findById(
        @param.path.number('id') id: number,
        @param.filter(StructureSanitaire, {exclude: 'where'})
        filter?: FilterExcludingWhere<StructureSanitaire>
    ): Promise<StructureSanitaire> {
        return this.structureSanitaireRepository.findById(id, filter);
    }
    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @patch('/structure-sanitaires/{id}')
    @response(204, {
        description: 'StructureSanitaire PATCH success'
    })
    async updateById(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(StructureSanitaire, {partial: true})
                }
            }
        })
        structureSanitaire: StructureSanitaire
    ): Promise<void> {
        await this.structureSanitaireRepository.updateById(id, structureSanitaire);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @put('/structure-sanitaires/{id}')
    @response(204, {
        description: 'StructureSanitaire PUT success'
    })
    async replaceById(@param.path.number('id') id: number, @requestBody() structureSanitaire: StructureSanitaire): Promise<void> {
        await this.structureSanitaireRepository.replaceById(id, structureSanitaire);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @del('/structure-sanitaires/{id}')
    @response(204, {
        description: 'StructureSanitaire DELETE success'
    })
    async deleteById(@param.path.number('id') id: number): Promise<void> {
        await this.structureSanitaireRepository.deleteById(id);
    }
}
