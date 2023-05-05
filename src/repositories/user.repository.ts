import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasOneRepositoryFactory, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PamodbDataSource} from '../datasources';
import {Fichemedicale, Role, User, UserCredentials, UserRelations, Meeting} from '../models';
import {FichemedicaleRepository} from './fichemedicale.repository';
import {MedecinRepository} from './medecin.repository';
import {RoleRepository} from './role.repository';
import {UserCredentialsRepository} from './user-credentials.repository';
import {MeetingRepository} from './meeting.repository';

export type Credentials = {
    email: string;
    password: string;
    role?: string;
};

export class UserRepository extends DefaultCrudRepository<User, typeof User.prototype.userId, UserRelations> {
    public readonly role: BelongsToAccessor<Role, typeof User.prototype.userId>;

    public readonly userCredentials: HasOneRepositoryFactory<UserCredentials, typeof User.prototype.userId>;

    public readonly fichemedicale: HasOneRepositoryFactory<Fichemedicale, typeof User.prototype.userId>;

  public readonly meetings: HasManyRepositoryFactory<Meeting, typeof User.prototype.userId>;

    constructor(
        @inject('datasources.pamodb') dataSource: PamodbDataSource,
        @repository.getter('RoleRepository') protected roleRepositoryGetter: Getter<RoleRepository>,
        @repository.getter('UserCredentialsRepository') protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>,
        @repository.getter('FichemedicaleRepository') protected fichemedicaleRepositoryGetter: Getter<FichemedicaleRepository>,
        @repository.getter('MedecinRepository') protected medecinRepositoryGetter: Getter<MedecinRepository>, @repository.getter('MeetingRepository') protected meetingRepositoryGetter: Getter<MeetingRepository>,
    ) {
        super(User, dataSource);
      this.meetings = this.createHasManyRepositoryFactoryFor('meetings', meetingRepositoryGetter,);
      this.registerInclusionResolver('meetings', this.meetings.inclusionResolver);
        this.fichemedicale = this.createHasOneRepositoryFactoryFor('fichemedicale', fichemedicaleRepositoryGetter);
        this.registerInclusionResolver('fichemedicale', this.fichemedicale.inclusionResolver);
        this.userCredentials = this.createHasOneRepositoryFactoryFor('userCredentials', userCredentialsRepositoryGetter);
        this.registerInclusionResolver('userCredentials', this.userCredentials.inclusionResolver);

        this.role = this.createBelongsToAccessorFor('role', roleRepositoryGetter);
        this.registerInclusionResolver('role', this.role.inclusionResolver);
    }

    async findCredentials(userId: typeof User.prototype.id): Promise<UserCredentials | undefined> {
        try {
            return await this.userCredentials(userId).get();
        } catch (err) {
            if (err.code === 'ENTITY_NOT_FOUND') {
                return undefined;
            }
            throw err;
        }
    }
}
