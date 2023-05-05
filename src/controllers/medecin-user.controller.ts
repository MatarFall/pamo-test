import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Medecin, User} from '../models';
import {MedecinRepository} from '../repositories';

@authenticate('jwt')
@authorize({allowedRoles: ['ROLE_ADMIN', 'ROLE_MEDECIN']})
export class MedecinUserController {
    constructor(@repository(MedecinRepository) public medecinRepository: MedecinRepository) {}

    @get('/medecins/{id}/user', {
        responses: {
            '200': {
                description: 'User belonging to Medecin',
                content: {
                    'application/json': {
                        schema: {type: 'array', items: getModelSchemaRef(User)}
                    }
                }
            }
        }
    })
    async getUser(@param.path.number('id') id: typeof Medecin.prototype.medecinid): Promise<User> {
        return this.medecinRepository.user(id);
    }
}
