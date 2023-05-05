import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Medecin, StructureSanitaire} from '../models';
import {MedecinRepository} from '../repositories';

@authenticate('jwt')
@authorize({allowedRoles: ['ROLE_ADMIN', 'ROLE_MEDECIN']})
export class MedecinStructureSanitaireController {
    constructor(@repository(MedecinRepository) public medecinRepository: MedecinRepository) {}

    @get('/medecins/{id}/structure-sanitaire', {
        responses: {
            '200': {
                description: 'StructureSanitaire belonging to Medecin',
                content: {
                    'application/json': {
                        schema: {type: 'array', items: getModelSchemaRef(StructureSanitaire)}
                    }
                }
            }
        }
    })
    async getStructureSanitaire(@param.path.number('id') id: typeof Medecin.prototype.medecinid): Promise<StructureSanitaire> {
        return this.medecinRepository.structuresanitaire(id);
    }
}
