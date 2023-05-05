import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {Entity, property, repository} from '@loopback/repository';
import {get, getModelSchemaRef} from '@loopback/rest';
import {
    MeetingRepository,
    NewsRepository,
    PrestataireRepository,
    SpecialisationRepository,
    StructureSanitaireRepository,
    UserRepository
} from '../repositories';

class EntityStatsModel extends Entity {
    @property({
        type: 'number',
        required: true,
        length: 50
    })
    users: number;

    @property({
        type: 'number',
        required: false
    })
    news: number;

    @property({
        type: 'number',
        required: false
    })
    meetings: number;

    @property({
        type: 'number',
        required: false
    })
    prestataires: number;

    @property({
        type: 'number',
        required: false
    })
    structureSanitaires: number;

    @property({
        type: 'number',
        required: false
    })
    specialisations: number;

    // Define well-known properties here

    // Indexer property to allow additional data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [prop: string]: any;

    constructor(users: number, news: number, meetings: number, prestataires: number, structureSanitaires: number, specialisations: number) {
        super();
        this.users = users;
        this.news = news;
        this.meetings = meetings;
        this.prestataires = prestataires;
        this.structureSanitaires = structureSanitaires;
        this.specialisations = specialisations;
    }
}

@authenticate('jwt')
@authorize({allowedRoles: ['ROLE_ADMIN']})
export class EntityStats {
    constructor(
        @repository(NewsRepository) protected newsRepo: NewsRepository,
        @repository(StructureSanitaireRepository) protected structureSanitaireRepo: StructureSanitaireRepository,
        @repository(MeetingRepository) protected meetingRepo: MeetingRepository,
        @repository(UserRepository) protected userRepo: UserRepository,
        @repository(PrestataireRepository) protected prestataireRepo: PrestataireRepository,
        @repository(SpecialisationRepository) protected speciaRepo: SpecialisationRepository
    ) {}

    @get('/entity-stats', {
        responses: {
            '200': {
                description: 'Array of Medecin has many Meeting',
                schema: getModelSchemaRef(EntityStatsModel)
            }
        }
    })
    async find(): Promise<EntityStatsModel> {
        const newsCount = await this.newsRepo.count();
        const structuresSanitairesCount = await this.structureSanitaireRepo.count();
        const meetingsCount = await this.meetingRepo.count();
        const usersCount = await this.userRepo.count();
        const prestatairesCount = await this.prestataireRepo.count();
        const specialisationsCount = await this.speciaRepo.count();

        const result: EntityStatsModel = new EntityStatsModel(
            usersCount.count,
            newsCount.count,
            meetingsCount.count,
            prestatairesCount.count,
            structuresSanitairesCount.count,
            specialisationsCount.count
        );

        return result;
    }
}
