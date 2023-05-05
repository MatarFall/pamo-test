import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody, response} from '@loopback/rest';
import {Assureur} from '../models';
import {AssureurRepository} from '../repositories';

@authenticate('jwt')
@authorize({allowedRoles: ['ROLE_ADMIN']})
export class AssureurController {
    constructor(@repository(AssureurRepository) public assureurRepository: AssureurRepository) {}

    @post('/assureurs')
    @response(200, {
        description: 'Assureur model instance',
        content: {'application/json': {schema: getModelSchemaRef(Assureur)}}
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Assureur, {
                        title: 'NewAssureur',
                        exclude: ['assureurId']
                    })
                }
            }
        })
        assureur: Omit<Assureur, 'assureurId'>
    ): Promise<Assureur> {
        return this.assureurRepository.create(assureur);
    }

    @get('/assureurs/count')
    @response(200, {
        description: 'Assureur model count',
        content: {'application/json': {schema: CountSchema}}
    })
    async count(@param.where(Assureur) where?: Where<Assureur>): Promise<Count> {
        return this.assureurRepository.count(where);
    }

    @get('/assureurs')
    @response(200, {
        description: 'Array of Assureur model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(Assureur, {includeRelations: true})
                }
            }
        }
    })
    async find(@param.filter(Assureur) filter?: Filter<Assureur>): Promise<Assureur[]> {
        return this.assureurRepository.find(filter);
    }

    @patch('/assureurs')
    @response(200, {
        description: 'Assureur PATCH success count',
        content: {'application/json': {schema: CountSchema}}
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Assureur, {partial: true})
                }
            }
        })
        assureur: Assureur,
        @param.where(Assureur) where?: Where<Assureur>
    ): Promise<Count> {
        return this.assureurRepository.updateAll(assureur, where);
    }

    @get('/assureurs/{id}')
    @response(200, {
        description: 'Assureur model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(Assureur, {includeRelations: true})
            }
        }
    })
    async findById(
        @param.path.number('id') id: number,
        @param.filter(Assureur, {exclude: 'where'})
        filter?: FilterExcludingWhere<Assureur>
    ): Promise<Assureur> {
        return this.assureurRepository.findById(id, filter);
    }

    @patch('/assureurs/{id}')
    @response(204, {
        description: 'Assureur PATCH success'
    })
    async updateById(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Assureur, {partial: true})
                }
            }
        })
        assureur: Assureur
    ): Promise<void> {
        await this.assureurRepository.updateById(id, assureur);
    }

    @put('/assureurs/{id}')
    @response(204, {
        description: 'Assureur PUT success'
    })
    async replaceById(@param.path.number('id') id: number, @requestBody() assureur: Assureur): Promise<void> {
        await this.assureurRepository.replaceById(id, assureur);
    }

    @del('/assureurs/{id}')
    @response(204, {
        description: 'Assureur DELETE success'
    })
    async deleteById(@param.path.number('id') id: number): Promise<void> {
        await this.assureurRepository.deleteById(id);
    }
}
