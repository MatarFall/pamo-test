import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PamodbDataSource} from '../datasources';
import {PrestataireHasStructure, PrestataireHasStructureRelations} from '../models';

export class PrestataireHasStructureRepository extends DefaultCrudRepository<
  PrestataireHasStructure,
  typeof PrestataireHasStructure.prototype.id,
  PrestataireHasStructureRelations
> {
  constructor(
    @inject('datasources.pamodb') dataSource: PamodbDataSource,
  ) {
    super(PrestataireHasStructure, dataSource);
  }
}
