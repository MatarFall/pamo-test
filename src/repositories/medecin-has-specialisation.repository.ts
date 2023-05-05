import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PamodbDataSource} from '../datasources';
import {MedecinHasSpecialisation, MedecinHasSpecialisationRelations} from '../models';

export class MedecinHasSpecialisationRepository extends DefaultCrudRepository<
  MedecinHasSpecialisation,
  typeof MedecinHasSpecialisation.prototype.medecinId,
  MedecinHasSpecialisationRelations
> {
  constructor(
    @inject('datasources.pamodb') dataSource: PamodbDataSource,
  ) {
    super(MedecinHasSpecialisation, dataSource);
  }
}
