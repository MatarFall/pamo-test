import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  StructureSanitaire,
  Medecin,
} from '../models';
import {StructureSanitaireRepository} from '../repositories';

export class StructureSanitaireMedecinController {
  constructor(
    @repository(StructureSanitaireRepository) protected structureSanitaireRepository: StructureSanitaireRepository,
  ) { }

  @get('/structure-sanitaires/{id}/medecins', {
    responses: {
      '200': {
        description: 'Array of StructureSanitaire has many Medecin',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Medecin)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Medecin>,
  ): Promise<Medecin[]> {
    return this.structureSanitaireRepository.medecins(id).find(filter);
  }

  @post('/structure-sanitaires/{id}/medecins', {
    responses: {
      '200': {
        description: 'StructureSanitaire model instance',
        content: {'application/json': {schema: getModelSchemaRef(Medecin)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof StructureSanitaire.prototype.structuresanitaireId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Medecin, {
            title: 'NewMedecinInStructureSanitaire',
            exclude: ['medecinid'],
            optional: ['structuresanitaireId']
          }),
        },
      },
    }) medecin: Omit<Medecin, 'medecinid'>,
  ): Promise<Medecin> {
    return this.structureSanitaireRepository.medecins(id).create(medecin);
  }

  @patch('/structure-sanitaires/{id}/medecins', {
    responses: {
      '200': {
        description: 'StructureSanitaire.Medecin PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Medecin, {partial: true}),
        },
      },
    })
    medecin: Partial<Medecin>,
    @param.query.object('where', getWhereSchemaFor(Medecin)) where?: Where<Medecin>,
  ): Promise<Count> {
    return this.structureSanitaireRepository.medecins(id).patch(medecin, where);
  }

  @del('/structure-sanitaires/{id}/medecins', {
    responses: {
      '200': {
        description: 'StructureSanitaire.Medecin DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Medecin)) where?: Where<Medecin>,
  ): Promise<Count> {
    return this.structureSanitaireRepository.medecins(id).delete(where);
  }
}
