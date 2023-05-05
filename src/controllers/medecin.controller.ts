import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {
    belongsTo,
    Count,
    CountSchema,
    Entity,
    Filter,
    FilterExcludingWhere,
    model,
    property,
    repository,
    Where
} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody, response} from '@loopback/rest';
import {Medecin, Specialisation, StructureSanitaire, User} from '../models';
import {MedecinHasSpecialisationRepository, MedecinRepository} from '../repositories';

@model()
export class specialisationCode extends Entity {
    @property({
        type: 'array',
        required: true
    })
    nom: string;
}

@model()
export class MedecinPatchModel extends Entity {
    @property({
        type: 'number',
        required: false,
        precision: 10,
        scale: 0,
        id: true,
        mysql: {
            columnName: 'medecinid',
            dataType: 'int',
            dataLength: null,
            dataPrecision: 10,
            dataScale: 0,
            nullable: 'N'
        }
    })
    medecinid: number;
    @belongsTo(() => User)
    userId: number;
    @property({
        type: 'array',
        itemType: 'object',
        required: false
    })
    list_specialisations: Specialisation[];

    @belongsTo(() => StructureSanitaire)
    structuresanitaireId: number;
    // Define well-known properties here

    // Indexer property to allow additional data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [prop: string]: any;
}

export class MedecinController {
    constructor(
        @repository(MedecinRepository) public medecinRepository: MedecinRepository,
        @repository(MedecinHasSpecialisationRepository) public medecinSpecialisationRepo: MedecinHasSpecialisationRepository
    ) {}

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @post('/medecins')
    @response(200, {
        description: 'Medecin model instance',
        content: {'application/json': {schema: getModelSchemaRef(Medecin)}}
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Medecin, {
                        title: 'NewMedecin',
                        exclude: ['medecinId']
                    })
                }
            }
        })
        medecin: Omit<Medecin, 'medecinId'>
    ): Promise<Medecin> {
        return this.medecinRepository.create(medecin);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @get('/medecins/count')
    @response(200, {
        description: 'Medecin model count',
        content: {'application/json': {schema: CountSchema}}
    })
    async count(@param.where(Medecin) where?: Where<Medecin>): Promise<Count> {
        return this.medecinRepository.count(where);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN', 'ROLE_USER']})
    @get('/medecins')
    @response(200, {
        description: 'Array of Medecin model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(Medecin, {includeRelations: true})
                }
            }
        }
    })
    async find(@param.filter(Medecin) filter?: Filter<Medecin>): Promise<Medecin[]> {
        return this.medecinRepository.find(filter);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @patch('/medecins')
    @response(200, {
        description: 'Medecin PATCH success count',
        content: {'application/json': {schema: CountSchema}}
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Medecin, {partial: true})
                }
            }
        })
        medecin: Medecin,
        @param.where(Medecin) where?: Where<Medecin>
    ): Promise<Count> {
        return this.medecinRepository.updateAll(medecin, where);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_MEDECIN']})
    @get('/medecins/{id}')
    @response(200, {
        description: 'Medecin model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(Medecin, {includeRelations: true})
            }
        }
    })
    async findById(
        @param.path.number('id') id: number,
        @param.filter(Medecin, {exclude: 'where'})
        filter?: FilterExcludingWhere<Medecin>
    ): Promise<Medecin> {
        return this.medecinRepository.findById(id, filter);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN', 'ROLE_USER']})
    @patch('/medecins/{id}')
    @response(204, {
        description: 'Medecin PATCH success'
    })
    async updateById(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(MedecinPatchModel, {partial: true})
                }
            }
        })
        medecin: MedecinPatchModel
    ): Promise<void> {
        const currentSpecialites = await this.medecinRepository.specialisations(id).find();
        for (const specialisation of currentSpecialites) {
            this.medecinRepository.specialisations(id).unlink(specialisation.specialisationId);
        }
        for (const specialisation of medecin.list_specialisations) {
            this.medecinRepository.specialisations(id).link(specialisation.specialisationId);
        }
        await this.medecinRepository.updateById(id, medecin);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @put('/medecins/{id}')
    @response(204, {
        description: 'Medecin PUT success'
    })
    async replaceById(@param.path.number('id') id: number, @requestBody() medecin: Medecin): Promise<void> {
        await this.medecinRepository.replaceById(id, medecin);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @del('/medecins/{id}')
    @response(204, {
        description: 'Medecin DELETE success'
    })
    deleteById(@param.path.number('id') id: number): Promise<void> {
        return this.medecinRepository.deleteById(id);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_MEDECIN']})
    @get('/filter-medecins/{codeSpecialisation}')
    @response(200, {
        description: 'Medecin model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(Medecin, {includeRelations: true})
            }
        }
    })
    async findMedecinBySpecialisation(@param.path.string('codeSpecialisation') codeSpecialisation: string): Promise<Medecin[]> {
        const resp: Medecin[] = await this.medecinRepository.find({
            include: [
                {
                    relation: 'specialisations',
                    scope: {
                        where: {code: {eq: codeSpecialisation}}
                    }
                },
                {
                    relation: 'user'
                },
                {
                    relation: 'structuresanitaire'
                }
            ]
        });

        return resp.filter((item: Medecin) => {
            if (item.specialisations) return item.specialisations.length;
            return false;
        });
    }
}
