import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {PamodbDataSource} from '../datasources';
import {Medecin, Meeting, MeetingRelations, User} from '../models';
import {MedecinRepository} from './medecin.repository';
import {UserRepository} from './user.repository';

export class MeetingRepository extends DefaultCrudRepository<
  Meeting,
  typeof Meeting.prototype.meetingId,
  MeetingRelations
> {
  public readonly medecin: BelongsToAccessor<
    Medecin,
    typeof Medecin.prototype.id
  >;
  public readonly user: BelongsToAccessor<User, typeof User.prototype.id>;
  constructor(
    @inject('datasources.pamodb') dataSource: PamodbDataSource,
    @repository.getter('MedecinRepository')
    medecinRepositoryGetter: Getter<MedecinRepository>,
    @repository.getter('UserRepository')
    userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Meeting, dataSource);
    this.medecin = this.createBelongsToAccessorFor(
      'medecin',
      medecinRepositoryGetter,
    );
    this.registerInclusionResolver('medecin', this.medecin.inclusionResolver);

    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
