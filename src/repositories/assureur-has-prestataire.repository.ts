import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PamodbDataSource} from '../datasources';
import {AssureurHasPrestataire, AssureurHasPrestataireRelations} from '../models';

export class AssureurHasPrestataireRepository extends DefaultCrudRepository<
  AssureurHasPrestataire,
  typeof AssureurHasPrestataire.prototype.assureurId,
  AssureurHasPrestataireRelations
> {
  constructor(
    @inject('datasources.pamodb') dataSource: PamodbDataSource,
  ) {
    super(AssureurHasPrestataire, dataSource);
  }
}
