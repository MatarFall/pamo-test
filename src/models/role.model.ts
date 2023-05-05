import {Entity, hasMany, model, property} from '@loopback/repository';
import {User} from './user.model';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'pamo-backend-db', table: 'role'},
  },
})
export class Role extends Entity {
  @property({
    type: 'number',
    required: false,
    precision: 10,
    scale: 0,
    id: true,
    mysql: {
      columnName: 'roleId',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  roleId: number;

  @property({
    type: 'string',
    required: true,
    length: 20,
    mysql: {
      columnName: 'nom',
      dataType: 'varchar',
      dataLength: 20,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  nom: string;

  @property({
    type: 'string',
    required: true,
    length: 20,
    mysql: {
      columnName: 'code',
      dataType: 'varchar',
      dataLength: 20,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  code: string;

  @hasMany(() => User)
  users: User[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Role>) {
    super(data);
  }
}

export interface RoleRelations {
  // describe navigational properties here
}

export type RoleWithRelations = Role & RoleRelations;
