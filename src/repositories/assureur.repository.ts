import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {PamodbDataSource} from '../datasources';
import {Assureur, AssureurRelations, User, Prestataire, AssureurHasPrestataire} from '../models';
import {UserRepository} from './user.repository';
import {AssureurHasPrestataireRepository} from './assureur-has-prestataire.repository';
import {PrestataireRepository} from './prestataire.repository';

export class AssureurRepository extends DefaultCrudRepository<
  Assureur,
  typeof Assureur.prototype.assureurId,
  AssureurRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Assureur.prototype.assureurId>;

  public readonly prestataires: HasManyThroughRepositoryFactory<Prestataire, typeof Prestataire.prototype.prestataireId,
          AssureurHasPrestataire,
          typeof Assureur.prototype.assureurId
        >;

  constructor(
    @inject('datasources.pamodb') dataSource: PamodbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('AssureurHasPrestataireRepository') protected assureurHasPrestataireRepositoryGetter: Getter<AssureurHasPrestataireRepository>, @repository.getter('PrestataireRepository') protected prestataireRepositoryGetter: Getter<PrestataireRepository>,
  ) {
    super(Assureur, dataSource);
    this.prestataires = this.createHasManyThroughRepositoryFactoryFor('prestataires', prestataireRepositoryGetter, assureurHasPrestataireRepositoryGetter,);
    this.registerInclusionResolver('prestataires', this.prestataires.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
