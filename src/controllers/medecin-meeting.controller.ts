import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {Count, CountSchema, Filter, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, getWhereSchemaFor, param, patch, post, requestBody} from '@loopback/rest';
import {Medecin, Meeting} from '../models';
import {MedecinRepository} from '../repositories';

@authenticate('jwt')
@authorize({allowedRoles: ['ROLE_ADMIN', 'ROLE_MEDECIN']})
export class MedecinMeetingController {
    constructor(@repository(MedecinRepository) protected medecinRepository: MedecinRepository) {}

    @get('/medecins/{id}/meetings', {
        responses: {
            '200': {
                description: 'Array of Medecin has many Meeting',
                content: {
                    'application/json': {
                        schema: {type: 'array', items: getModelSchemaRef(Meeting)}
                    }
                }
            }
        }
    })
    async find(@param.path.number('id') id: number, @param.query.object('filter') filter?: Filter<Meeting>): Promise<Meeting[]> {
        return this.medecinRepository.meetings(id).find(filter);
    }

    @post('/medecins/{id}/meetings', {
        responses: {
            '200': {
                description: 'Medecin model instance',
                content: {'application/json': {schema: getModelSchemaRef(Meeting)}}
            }
        }
    })
    async create(
        @param.path.number('id') id: typeof Medecin.prototype.medecinid,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Meeting, {
                        title: 'NewMeetingInMedecin',
                        exclude: ['meetingId'],
                        optional: ['medecinId']
                    })
                }
            }
        })
        meeting: Omit<Meeting, 'meetingId'>
    ): Promise<Meeting> {
        return this.medecinRepository.meetings(id).create(meeting);
    }

    @patch('/medecins/{id}/meetings', {
        responses: {
            '200': {
                description: 'Medecin.Meeting PATCH success count',
                content: {'application/json': {schema: CountSchema}}
            }
        }
    })
    async patch(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Meeting, {partial: true})
                }
            }
        })
        meeting: Partial<Meeting>,
        @param.query.object('where', getWhereSchemaFor(Meeting))
        where?: Where<Meeting>
    ): Promise<Count> {
        return this.medecinRepository.meetings(id).patch(meeting, where);
    }

    @del('/medecins/{id}/meetings', {
        responses: {
            '200': {
                description: 'Medecin.Meeting DELETE success count',
                content: {'application/json': {schema: CountSchema}}
            }
        }
    })
    async delete(
        @param.path.number('id') id: number,
        @param.query.object('where', getWhereSchemaFor(Meeting))
        where?: Where<Meeting>
    ): Promise<Count> {
        return this.medecinRepository.meetings(id).delete(where);
    }
}
