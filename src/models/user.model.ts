import {
  belongsTo,
  Entity,
  hasMany,
  hasOne,
  model,
  property,
} from '@loopback/repository';
import {Fichemedicale} from './fichemedicale.model';
import {Meeting} from './meeting.model';
import {Role} from './role.model';
import {UserCredentials} from './user-credentials.model';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'pamo-backend-db', table: 'user'},
  },
})
export class User extends Entity {
  @property({
    type: 'number',
    required: false,
    precision: 10,
    scale: 0,
    id: true,
    mysql: {
      columnName: 'userId',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  userId: number;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mysql: {
      columnName: 'nom',
      dataType: 'varchar',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  nom: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mysql: {
      columnName: 'prenom',
      dataType: 'varchar',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  prenom: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mysql: {
      columnName: 'numero',
      dataType: 'varchar',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  numero: string;

  @property({
    type: 'string',
    required: true,
    length: 100,
    mysql: {
      columnName: 'adresse',
      dataType: 'varchar',
      dataLength: 100,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  adresse: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    index: {
      unique: true,
    },
    mysql: {
      columnName: 'email',
      dataType: 'varchar',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  email: string;

  @property({
    type: 'string',
    required: false,
    length: 200,
    default: '',
    mysql: {
      columnName: 'image',
      dataType: 'varchar',
      dataLength: 200,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  image: string;

  @property({
    type: 'boolean',
    precision: 3,
    scale: 0,
    default: true,
    required: false,
    mysql: {
      columnName: 'account_status',
      dataType: 'tinyint',
      dataLength: null,
      dataPrecision: 3,
      dataScale: 0,
      nullable: 'Y',
    },
  })
  account_status?: boolean;

  @property({
    type: 'date',
    defaultFn: 'now',
    mysql: {
      columnName: 'date_creation',
      dataType: 'datetime',
      nullable: 'N',
    },
  })
  date_creation?: string;

  @belongsTo(() => Role)
  roleId: number;

  @hasOne(() => UserCredentials)
  userCredentials: UserCredentials;

  @hasOne(() => Fichemedicale, {keyTo: 'userId'})
  fichemedicale: Fichemedicale;

  @hasMany(() => User, {keyTo: 'userIdLinked'})
  linkedUsers: User[];

  @property({
    type: 'number',
  })
  userIdLinked?: number;

  @hasMany(() => Meeting, {keyTo: 'userId'})
  meetings: Meeting[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
