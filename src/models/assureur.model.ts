import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {User} from './user.model';
import {Prestataire} from './prestataire.model';
import {AssureurHasPrestataire} from './assureur-has-prestataire.model';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'pamo-backend-db', table: 'assureur'},
  },
})
export class Assureur extends Entity {
  @property({
    type: 'number',
    required: false,
    precision: 10,
    scale: 0,
    id: true,
    mysql: {
      columnName: 'assureurId',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  assureurId: number;

  @belongsTo(() => User)
  userId: number;

  @hasMany(() => Prestataire, {through: {model: () => AssureurHasPrestataire}})
  prestataires: Prestataire[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Assureur>) {
    super(data);
  }
}

export interface AssureurRelations {
  // describe navigational properties here
}

export type AssureurWithRelations = Assureur & AssureurRelations;
