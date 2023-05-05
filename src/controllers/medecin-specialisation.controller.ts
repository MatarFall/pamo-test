import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, getWhereSchemaFor, HttpErrors, param, put, requestBody, response} from '@loopback/rest';
import {Medecin, Specialisation} from '../models';
import {MedecinRepository, SpecialisationRepository} from '../repositories';

export class MedecinSpecialisationController {
    constructor(
        @repository(MedecinRepository) protected medecinRepository: MedecinRepository,
        @repository(SpecialisationRepository) public specialisationRepository: SpecialisationRepository
    ) {}

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_MEDECIN']})
    @get('/medecins/{id}/specialisations', {
        responses: {
            '200': {
                description: 'Array of Medecin has many Specialisation through MedecinHasSpecialisation',
                content: {
                    'application/json': {
                        schema: {type: 'array', items: getModelSchemaRef(Specialisation)}
                    }
                }
            }
        }
    })
    async find(
        @param.path.number('id') id: number,
        @param.query.object('filter') filter?: Filter<Specialisation>
    ): Promise<Specialisation[]> {
        return this.medecinRepository.specialisations(id).find(filter);
    }

    @put('/medecins/{id}/add-specialisation')
    @response(204, {
        description: 'Medecin PUT Specialisation success'
    })
    async addSpecialisationByIDMedecin(
        @param.path.number('id') id: number,
        @requestBody({
            description: 'Add specialisation to a medecin entity',
            content: {
                'application/json': {
                    schema: {
                        type: 'array',
                        items: {
                            'x-ts-type': Specialisation
                        }
                    }
                }
            }
        })
        listSpecialisation: Specialisation[]
    ): Promise<unknown> {
        const medecinSpecialisationCode: string[] = (await this.medecinRepository.specialisations(id).find()).map((el: Specialisation) => {
            return el.code;
        });
        const codeSpecialisationfound = await this.specialisationRepository.filterExistingCodeSpecialisation(listSpecialisation);

        let addSpecialisation: Specialisation[] = codeSpecialisationfound;
        if (medecinSpecialisationCode.length) {
            addSpecialisation = addSpecialisation.filter((item: Specialisation) => {
                return !medecinSpecialisationCode.includes(item.code);
            });
        }
        if (addSpecialisation.length) {
            for (const value of addSpecialisation) {
                try {
                    await this.medecinRepository.specialisations(id).link(value.specialisationId);
                } catch (error) {
                    throw new HttpErrors.BadRequest("Erreur lors de l'ajout des spécialisations");
                }
            }
        }
        return await this.medecinRepository.find({
            where: {medecinid: id},
            include: ['specialisations', 'user', 'structuresanitaire']
        });
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN', 'ROLE_MEDECIN']})
    @get('/medecins-infos/{id}')
    @response(200, {
        description: 'Medecin model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(Medecin, {includeRelations: true})
            }
        }
    })
    async findByIdWithAllInformations(
        @param.path.number('id') id: number,
        @param.filter(Medecin, {exclude: 'where'})
        filter?: FilterExcludingWhere<Medecin>
    ): Promise<Medecin> {
        return this.medecinRepository.findById(id, {
            include: ['specialisations', 'user', 'structuresanitaire']
        });
    }

    // @post('/medecins/{id}/specialisations', {
    //   responses: {
    //     '200': {
    //       description: 'create a Specialisation model instance',
    //       content: {
    //         'application/json': {schema: getModelSchemaRef(Specialisation)},
    //       },
    //     },
    //   },
    // })
    // async create(
    //   @param.path.number('id') id: typeof Medecin.prototype.medecinid,
    //   @requestBody({
    //     content: {
    //       'application/json': {
    //         schema: getModelSchemaRef(Specialisation, {
    //           title: 'NewSpecialisationInMedecin',
    //           exclude: ['specialisationId'],
    //         }),
    //       },
    //     },
    //   })
    //   specialisation: Omit<Specialisation, 'specialisationId'>,
    // ): Promise<Specialisation> {
    //   return this.medecinRepository.specialisations(id).create(specialisation);
    // }

    // @patch('/medecins/{id}/specialisations', {
    //   responses: {
    //     '200': {
    //       description: 'Medecin.Specialisation PATCH success count',
    //       content: {'application/json': {schema: CountSchema}},
    //     },
    //   },
    // })
    // async patch(
    //   @param.path.number('id') id: number,
    //   @requestBody({
    //     content: {
    //       'application/json': {
    //         schema: getModelSchemaRef(Specialisation, {partial: true}),
    //       },
    //     },
    //   })
    //   specialisation: Partial<Specialisation>,
    //   @param.query.object('where', getWhereSchemaFor(Specialisation))
    //   where?: Where<Specialisation>,
    // ): Promise<Count> {
    //   return this.medecinRepository
    //     .specialisations(id)
    //     .patch(specialisation, where);
    // }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @del('/medecins/{id}/specialisations', {
        responses: {
            '200': {
                description: 'Medecin.Specialisation DELETE success count',
                content: {'application/json': {schema: CountSchema}}
            }
        }
    })
    async delete(
        @param.path.number('id') id: number,
        @param.query.object('where', getWhereSchemaFor(Specialisation))
        where?: Where<Specialisation>
    ): Promise<Count> {
        return this.medecinRepository.specialisations(id).delete(where);
    }
}
