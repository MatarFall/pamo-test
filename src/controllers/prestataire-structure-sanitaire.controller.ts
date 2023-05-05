import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {
  Count,
  CountSchema,
  Entity,
  Filter,
  property,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef, HttpErrors,
  param, put,
  requestBody,
  response
} from '@loopback/rest';
import {
  PeriodicityType,
  Prestataire,
  StructureSanitaire
} from '../models';
import {PrestataireHasStructureRepository, PrestataireRepository, StructureSanitaireRepository} from '../repositories';

class StructureSanitaireModel extends Entity {
  @property({
      type: 'number',
      required: false,
      precision: 10,
      scale: 0,
      id: true,
      mysql: {
          columnName: 'structuresanitaireId',
          dataType: 'int',
          dataLength: null,
          dataPrecision: 10,
          dataScale: 0,
          nullable: 'N'
      }
  })
  structuresanitaireId: number;

  @property({
      type: 'string',
      required: false,
      length: 50,
      mysql: {
          columnName: 'nom',
          dataType: 'varchar',
          dataLength: 50,
          dataPrecision: null,
          dataScale: null,
          nullable: 'N'
      }
  })
  nom: string;

  @property({
      type: 'string',
      length: 50
  })
  ville?: string;

  @property({
      type: 'string',
      required: false,
      length: 50
  })

  code: string;

  @property({
      type: 'string',
      required: true,
      length: 50
  })
  typePrestataire: string;

  @property({
      type: 'string',
      length: 50
  })
  email?: string;

  @property({
      type: 'date'
  })
  date_creation?: string;

  @property({
      type: 'string',
      length: 150
  })
  adresse?: string;

  @property({
      type: 'number'
  })
  longitude?: number;

  @property({
      type: 'number'
  })
  latitude?: number;

  @property({
      type: 'boolean',
      precision: 3,
      scale: 0
  })
  is_actif?: boolean;

  @property({
      type: 'boolean',
      precision: 3,
      scale: 0
  })
  is_all_night?: boolean;

  @property({
      type: 'string',
      length: 150,
      jsonSchema: {
          enum: Object.values(PeriodicityType)
      }
  })
  periodicityType?: string;

  @property({
      type: 'date'
  })
  watch_start_date?: string;

  @property({
      type: 'date'
  })
  watch_end_date?: string;

  @property({
      type: 'string',
      length: 150
  })
  watch_periodicity_value?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<StructureSanitaire>) {
      super(data);
  }
}
export class PrestataireStructureSanitaireController {
  constructor(
    @repository(PrestataireRepository) protected prestataireRepository: PrestataireRepository,
    @repository(PrestataireHasStructureRepository) protected prestataireHasStructureRepo: PrestataireHasStructureRepository,
    @repository(StructureSanitaireRepository) protected structureSanitaireRepo: StructureSanitaireRepository,
  ) { }

  @authenticate('jwt')
  @authorize({allowedRoles: ['ROLE_ADMIN','ROLE_USER', 'ROLE_MEDECIN']})
  @get('/prestataires/{id}/structure-sanitaires', {
    responses: {
      '200': {
        description: 'Array of Prestataire has many StructureSanitaire through PrestataireHasStructure',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(StructureSanitaire)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<StructureSanitaire>,
  ): Promise<StructureSanitaire[]> {
    return this.prestataireRepository.structureSanitaires(id).find(filter);
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['ROLE_ADMIN']})
  @put('/prestataires/{id}/add-structure-sanitaires')
  @response(200, {
    description: 'Add Structure Sanitaire list to a prestataire success',
    content: {
      'application/json': {
        schema: {type: 'array', items: getModelSchemaRef(StructureSanitaire)},
      },
    }
  })
  async addSpecialisationByIdPrestataire(
    @param.path.number('id') id: number,
    @requestBody({
      description: 'Add Structure sanitaire list to a prestataire entity',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              'x-ts-type': getModelSchemaRef(StructureSanitaireModel)
            },
          },
        },
      },
    })
    listStructure: StructureSanitaire[],
    @param.filter(Prestataire) filter?: Filter<Prestataire>
  ): Promise<unknown> {
    const structureSanitairesAll: StructureSanitaire[] = await this.structureSanitaireRepo.find();

    listStructure = listStructure.filter((item: StructureSanitaire) => {
      return structureSanitairesAll.find((elt) => elt.structuresanitaireId === item?.structuresanitaireId )
    })

    if (listStructure.length) {
      for (const value of listStructure) {
        try {
          await this.prestataireRepository
            .structureSanitaires(id)
            .link(value.structuresanitaireId);
        } catch (error) {
          throw new HttpErrors.BadRequest(
            "Erreur lors de l'ajout de(s) structures",
          );
        }
      }
    } else {
      throw new HttpErrors.BadRequest(
        "Structures Sanitaires non trouvées ",
      );
    }
    return this.prestataireRepository.structureSanitaires(id).find(filter);
  }

  // @post('/prestataires/{id}/structure-sanitaires', {
  //   responses: {
  //     '200': {
  //       description: 'create a StructureSanitaire model instance',
  //       content: {'application/json': {schema: getModelSchemaRef(StructureSanitaire)}},
  //     },
  //   },
  // })
  // async create(
  //   @param.path.number('id') id: typeof Prestataire.prototype.prestataireId,
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(StructureSanitaire, {
  //           title: 'NewStructureSanitaireInPrestataire',
  //           exclude: ['structuresanitaireId'],
  //         }),
  //       },
  //     },
  //   }) structureSanitaire: Omit<StructureSanitaire, 'structuresanitaireId'>,
  // ): Promise<StructureSanitaire> {
  //   return this.prestataireRepository.structureSanitaires(id).create(structureSanitaire);
  // }

  // @patch('/prestataires/{id}/structure-sanitaires', {
  //   responses: {
  //     '200': {
  //       description: 'Prestataire.StructureSanitaire PATCH success count',
  //       content: {'application/json': {schema: CountSchema}},
  //     },
  //   },
  // })
  // async patch(
  //   @param.path.number('id') id: number,
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(StructureSanitaire, {partial: true}),
  //       },
  //     },
  //   })
  //   structureSanitaire: Partial<StructureSanitaire>,
  //   @param.query.object('where', getWhereSchemaFor(StructureSanitaire)) where?: Where<StructureSanitaire>,
  // ): Promise<Count> {
  //   return this.prestataireRepository.structureSanitaires(id).patch(structureSanitaire, where);
  // }
  @authenticate('jwt')
  @authorize({allowedRoles: ['ROLE_ADMIN']})
  @get('/prestataires/{id}/structure-sanitaires/count')
  @response(200, {
    description: 'Patient model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.path.number('id') id: number,
    @param.where(StructureSanitaire) where?: Where<StructureSanitaire>,
  ): Promise<Count> {
    const count = ( await this.prestataireRepository.structureSanitaires( id ).find() ).length;
    return {
      count
    }
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['ROLE_ADMIN']})
  @del('/prestataires/{id}/structure-sanitaires', {
    responses: {
      '200': {
        description: 'Prestataire StructureSanitaire DELETE success',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(StructureSanitaire)},
          },
        }
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @requestBody({
      description: 'Delete Structure sanitaire list of a prestataire entity',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              'x-ts-type': getModelSchemaRef(StructureSanitaireModel),
            },
          },
        },
      },
    })
    listStructure: StructureSanitaire[]
  ): Promise<StructureSanitaire[]> {
    for (const structure of listStructure) {
      try {
         await this.prestataireRepository.structureSanitaires(id).unlink(structure.structuresanitaireId);
      } catch (error) {
        throw new HttpErrors.BadRequest(
          "Erreur lors de la suppression des structures",
        );
      }

    }
    return this.prestataireRepository.structureSanitaires(id).find();
  }
}
