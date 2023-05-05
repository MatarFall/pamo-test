import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  HasManyThroughRepositoryFactory,
  repository,
} from '@loopback/repository';
import {PamodbDataSource} from '../datasources';
import {
  Medecin,
  MedecinHasSpecialisation,
  MedecinRelations,
  Meeting,
  Specialisation,
  StructureSanitaire,
  User,
} from '../models';
import {MedecinHasSpecialisationRepository} from './medecin-has-specialisation.repository';
import {MeetingRepository} from './meeting.repository';
import {SpecialisationRepository} from './specialisation.repository';
import {StructureSanitaireRepository} from './structure-sanitaire.repository';
import {UserRepository} from './user.repository';

export class MedecinRepository extends DefaultCrudRepository<
  Medecin,
  typeof Medecin.prototype.medecinid,
  MedecinRelations
> {
  public readonly user: BelongsToAccessor<
    User,
    typeof Medecin.prototype.medecinid
  >;

  public readonly structureSanitaire: BelongsToAccessor<
    StructureSanitaire,
    typeof Medecin.prototype.medecinid
  >;

  public readonly specialisations: HasManyThroughRepositoryFactory<
    Specialisation,
    typeof Specialisation.prototype.specialisationId,
    MedecinHasSpecialisation,
    typeof Medecin.prototype.medecinid
  >;

  public readonly meetings: HasManyRepositoryFactory<
    Meeting,
    typeof Medecin.prototype.medecinid
  >;

  public readonly structuresanitaire: BelongsToAccessor<StructureSanitaire, typeof Medecin.prototype.medecinid>;

  constructor(
    @inject('datasources.pamodb') dataSource: PamodbDataSource,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
    @repository.getter('StructureSanitaireRepository')
    protected structureSanitaireRepositoryGetter: Getter<StructureSanitaireRepository>,
    @repository.getter('MedecinHasSpecialisationRepository')
    protected medecinHasSpecialisationRepositoryGetter: Getter<MedecinHasSpecialisationRepository>,
    @repository.getter('SpecialisationRepository')
    protected specialisationRepositoryGetter: Getter<SpecialisationRepository>,
    @repository.getter('MeetingRepository')
    protected meetingRepositoryGetter: Getter<MeetingRepository>,
  ) {
    super(Medecin, dataSource);
    this.structuresanitaire = this.createBelongsToAccessorFor('structuresanitaire', structureSanitaireRepositoryGetter,);
    this.registerInclusionResolver('structuresanitaire', this.structuresanitaire.inclusionResolver);
    this.meetings = this.createHasManyRepositoryFactoryFor(
      'meetings',
      meetingRepositoryGetter,
    );
    this.registerInclusionResolver('meetings', this.meetings.inclusionResolver);
    this.specialisations = this.createHasManyThroughRepositoryFactoryFor(
      'specialisations',
      specialisationRepositoryGetter,
      medecinHasSpecialisationRepositoryGetter,
    );
    this.registerInclusionResolver(
      'specialisations',
      this.specialisations.inclusionResolver,
    );
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
