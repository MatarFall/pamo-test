import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'pamo-backend-db', table: 'specialisation'},
  },
})
export class Specialisation extends Entity {
  @property({
    type: 'number',
    required: false,
    precision: 10,
    scale: 0,
    id: true,
    mysql: {
      columnName: 'specialisationId',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  specialisationId: number;

  @property({
    type: 'string',
    required: true,
    length: 100,
    mysql: {
      columnName: 'nom',
      dataType: 'varchar',
      dataLength: 100,
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
    index: {
      unique: true,
    },
    mysql: {
      columnName: 'code',
      dataType: 'varchar',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  code: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Specialisation>) {
    super(data);
  }
}

export interface SpecialisationRelations {
  // describe navigational properties here
}

export type SpecialisationWithRelations = Specialisation &
  SpecialisationRelations;
