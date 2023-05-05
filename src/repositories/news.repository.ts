import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PamodbDataSource} from '../datasources';
import {News, NewsRelations} from '../models';

export class NewsRepository extends DefaultCrudRepository<
  News,
  typeof News.prototype.newId,
  NewsRelations
> {
  constructor(
    @inject('datasources.pamodb') dataSource: PamodbDataSource,
  ) {
    super(News, dataSource);
  }
}
