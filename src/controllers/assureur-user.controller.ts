import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Assureur,
  User,
} from '../models';
import {AssureurRepository} from '../repositories';

export class AssureurUserController {
  constructor(
    @repository(AssureurRepository)
    public assureurRepository: AssureurRepository,
  ) { }

  @get('/assureurs/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Assureur',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof Assureur.prototype.assureurId,
  ): Promise<User> {
    return this.assureurRepository.user(id);
  }
}
