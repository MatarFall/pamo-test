import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {PamodbDataSource} from '../datasources';
import {Medecin, StructureSanitaire, StructureSanitaireRelations} from '../models';
import {MedecinRepository} from './medecin.repository';

export class StructureSanitaireRepository extends DefaultCrudRepository<
    StructureSanitaire,
    typeof StructureSanitaire.prototype.structuresanitaireId,
    StructureSanitaireRelations
> {
    public readonly medecins: HasManyRepositoryFactory<Medecin, typeof StructureSanitaire.prototype.structuresanitaireId>;

    constructor(
        @inject('datasources.pamodb') dataSource: PamodbDataSource,
        @repository.getter('MedecinRepository') protected medecinRepositoryGetter: Getter<MedecinRepository>
    ) {
        super(StructureSanitaire, dataSource);
        this.medecins = this.createHasManyRepositoryFactoryFor('medecins', medecinRepositoryGetter);
        this.registerInclusionResolver('medecins', this.medecins.inclusionResolver);
    }
}
