import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'pamodb',
  connector: 'mysql',
  url: '',
  host: 'pamo-backend-db.cthrifi31ewm.eu-west-3.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  password: '13792580Se!',
  database: 'pamo-backend-db',
};

// const config = {
//   name: 'pamodb',
//   connector: 'mysql',
//   url: '',
//   host: 'localhost',
//   port: 3306,
//   user: 'root',
//   password: 'password',
//   database: 'pamo-backend-db',
// };

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class PamodbDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'pamodb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.pamodb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
