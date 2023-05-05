import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {PamodbDataSource} from '../datasources';
import {Prestataire, PrestataireRelations, StructureSanitaire, PrestataireHasStructure} from '../models';
import {PrestataireHasStructureRepository} from './prestataire-has-structure.repository';
import {StructureSanitaireRepository} from './structure-sanitaire.repository';

export class PrestataireRepository extends DefaultCrudRepository<
  Prestataire,
  typeof Prestataire.prototype.prestataireId,
  PrestataireRelations
> {

  public readonly structureSanitaires: HasManyThroughRepositoryFactory<StructureSanitaire, typeof StructureSanitaire.prototype.structuresanitaireId,
          PrestataireHasStructure,
          typeof Prestataire.prototype.prestataireId
        >;

  constructor(
    @inject('datasources.pamodb') dataSource: PamodbDataSource, @repository.getter('PrestataireHasStructureRepository') protected prestataireHasStructureRepositoryGetter: Getter<PrestataireHasStructureRepository>, @repository.getter('StructureSanitaireRepository') protected structureSanitaireRepositoryGetter: Getter<StructureSanitaireRepository>,
  ) {
    super(Prestataire, dataSource);
    this.structureSanitaires = this.createHasManyThroughRepositoryFactoryFor('structureSanitaires', structureSanitaireRepositoryGetter, prestataireHasStructureRepositoryGetter,);
    this.registerInclusionResolver('structureSanitaires', this.structureSanitaires.inclusionResolver);
  }
}
