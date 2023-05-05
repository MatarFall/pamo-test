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
Assureur,
AssureurHasPrestataire,
Prestataire,
} from '../models';
import {AssureurRepository} from '../repositories';

export class AssureurPrestataireController {
  constructor(
    @repository(AssureurRepository) protected assureurRepository: AssureurRepository,
  ) { }

  @get('/assureurs/{id}/prestataires', {
    responses: {
      '200': {
        description: 'Array of Assureur has many Prestataire through AssureurHasPrestataire',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Prestataire)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Prestataire>,
  ): Promise<Prestataire[]> {
    return this.assureurRepository.prestataires(id).find(filter);
  }

  @post('/assureurs/{id}/prestataires', {
    responses: {
      '200': {
        description: 'create a Prestataire model instance',
        content: {'application/json': {schema: getModelSchemaRef(Prestataire)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Assureur.prototype.assureurId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prestataire, {
            title: 'NewPrestataireInAssureur',
            exclude: ['prestataireId'],
          }),
        },
      },
    }) prestataire: Omit<Prestataire, 'prestataireId'>,
  ): Promise<Prestataire> {
    return this.assureurRepository.prestataires(id).create(prestataire);
  }

  @patch('/assureurs/{id}/prestataires', {
    responses: {
      '200': {
        description: 'Assureur.Prestataire PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prestataire, {partial: true}),
        },
      },
    })
    prestataire: Partial<Prestataire>,
    @param.query.object('where', getWhereSchemaFor(Prestataire)) where?: Where<Prestataire>,
  ): Promise<Count> {
    return this.assureurRepository.prestataires(id).patch(prestataire, where);
  }

  @del('/assureurs/{id}/prestataires', {
    responses: {
      '200': {
        description: 'Assureur.Prestataire DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Prestataire)) where?: Where<Prestataire>,
  ): Promise<Count> {
    return this.assureurRepository.prestataires(id).delete(where);
  }
}
