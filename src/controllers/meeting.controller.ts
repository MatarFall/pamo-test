import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/context';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody, response} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {Medecin, Meeting, User} from '../models';
import {MeetingRepository, UserRepository} from '../repositories';
import {EmailSenderService} from '../services';
import {PAMO_CODE_ROLES} from '../utils';

const VALID_NOTIFICATION_TYPE = ['CONFIRMED', 'RESCHEDULE', 'REJECT'];
const NOTIFICATION_LABEL = {
    CONFIRMED : 'confirmé',
    RESCHEDULE: 'reprogrammé',
    REJECT: 'Annulé'
}
export class MeetingController {
    constructor(@repository(MeetingRepository) public meetingRepository: MeetingRepository,  @repository(UserRepository) protected userRepository: UserRepository, @inject('services.EmailSenderService')
    protected emailService: EmailSenderService) {}

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN', 'ROLE_USER']})
    @post('/meetings')
    @response(200, {
        description: 'Meeting model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Meeting) } }
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Meeting, {
                        title: 'NewMeeting',
                        exclude: ['meetingId']
                    })
                }
            }
        })
        meeting: Omit<Meeting, 'meetingId'>
    ): Promise<Meeting> {
        return this.meetingRepository.create(meeting);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @get('/meetings/count')
    @response(200, {
        description: 'Meeting model count',
        content: { 'application/json': { schema: CountSchema } }
    })
    async count(@param.where(Meeting) where?: Where<Meeting>): Promise<Count> {
        return this.meetingRepository.count(where);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN','ROLE_USER','ROLE_MEDECIN']})
    @get('/meetings')
    @response(200, {
        description: 'Array of Meeting model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(Meeting, { includeRelations: true })
                }
            }
        }
    })
    async find(@param.filter(Meeting) filter?: Filter<Meeting>): Promise<Meeting[]> {
        return this.meetingRepository.find(filter);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN','ROLE_USER','ROLE_MEDECIN']})
    @patch('/meetings')
    @response(200, {
        description: 'Meeting PATCH success count',
        content: { 'application/json': { schema: CountSchema } }
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Meeting, { partial: true })
                }
            }
        })
        meeting: Meeting,
        @param.where(Meeting) where?: Where<Meeting>
    ): Promise<Count> {
        return this.meetingRepository.updateAll(meeting, where);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN','ROLE_USER','ROLE_MEDECIN']})
    @get('/meetings/{id}')
    @response(200, {
        description: 'Meeting model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(Meeting, { includeRelations: true })
            }
        }
    })
    async findById(
        @param.path.number('id') id: number,
        @param.filter(Meeting, { exclude: 'where' })
        filter?: FilterExcludingWhere<Meeting>
    ): Promise<Meeting> {
        return this.meetingRepository.findById(id, filter);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN','ROLE_USER','ROLE_MEDECIN']})
    @get('/meetings/all-infos')
    async getCustomer(@param.filter(Medecin) filter?: Filter<Medecin>): Promise<Meeting[]> {
        return this.meetingRepository.find({
            include: [
                {
                    relation: 'medecin',
                    scope: {
                        include: [
                            {
                                relation: 'user'
                            },
                            {
                                relation: 'structuresanitaire'
                            }
                        ]
                    }
                }
            ]
        });
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN','ROLE_USER','ROLE_MEDECIN']})
    @patch('/meetings/{id}/typeNotification={notificationType}')
    @response(204, {
        description: 'Meeting PATCH success'
    })
    async updateByIdWithNotification(
        @inject(SecurityBindings.USER)
        currentUserProfile: UserProfile,
        @param.path.number('id') id: number,
        @param.path.string('notificationType') notificationType: 'CONFIRMED' | 'RESCHEDULE' | 'REJECT',
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Meeting, { partial: true })
                }
            }
        })
        meeting: Meeting
    ): Promise<void> {
        const userEmail = currentUserProfile[securityId];
        const user: User | null = await this.userRepository.findOne({
        where: { email : userEmail},
        include: [ { relation : 'role'} ],
        });
        if(user?.role?.code === PAMO_CODE_ROLES.ROLE_MEDECIN) {
            let mailData = { medecin: user }

            if(notificationType) {
                if(VALID_NOTIFICATION_TYPE.includes(notificationType)) {
                    mailData = Object.assign({}, mailData, { statusMeeting: NOTIFICATION_LABEL[notificationType]} )
                    const meetingInfos = await this.meetingRepository.findById(id);
                    mailData = Object.assign({}, mailData, { meeting: meetingInfos });
                    this.emailService.sendMeetingNotification('NOTIFY_USER_MEETING', user, mailData).then( _ => {})
                    .catch( (err: any) => {
                        console.error(err);
                    });
                } else {
                    throw new HttpErrors.BadRequest(`Le type de notification est inconnue: ${notificationType}`);
                }
            }
        }
        await this.meetingRepository.updateById(id, meeting);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN','ROLE_USER','ROLE_MEDECIN']})
    @patch('/meetings/{id}')
    @response(204, {
        description: 'Meeting PATCH success'
    })
    async updateById(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Meeting, { partial: true })
                }
            }
        })
        meeting: Meeting
    ): Promise<void> {
        await this.meetingRepository.updateById(id, meeting);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN','ROLE_USER','ROLE_MEDECIN']})
    @put('/meetings/{id}')
    @response(204, {
        description: 'Meeting PUT success'
    })
    async replaceById(@param.path.number('id') id: number, @requestBody() meeting: Meeting): Promise<void> {
        await this.meetingRepository.replaceById(id, meeting);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @del('/meetings/{id}')
    @response(204, {
        description: 'Meeting DELETE success'
    })
    async deleteById(@param.path.number('id') id: number): Promise<void> {
        await this.meetingRepository.deleteById(id);
    }
}
