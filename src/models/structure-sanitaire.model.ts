import {Entity, hasMany, model, property} from '@loopback/repository';
import {Medecin} from './medecin.model';

export enum PeriodicityType {
  OCCCURENCY = 'occurency',
  DURATION = 'duration',
}
@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'pamo-backend-db', table: 'structure_sanitaire'},
  },
})
export class StructureSanitaire extends Entity {
  @property({
    type: 'number',
    required: false,
    precision: 10,
    scale: 0,
    id: true,
    mysql: {
      columnName: 'structuresanitaireId',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  structuresanitaireId: number;

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
    length: 50,
    mysql: {
      columnName: 'ville',
      dataType: 'varchar',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  ville?: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
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

  @property({
    type: 'string',
    required: true,
    length: 50,
    mysql: {
      columnName: 'typePrestataire',
      dataType: 'varchar',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  typePrestataire: string;

  @property({
    type: 'string',
    length: 50,
    mysql: {
      columnName: 'email',
      dataType: 'varchar',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  email?: string;

  @property({
    type: 'date',
    defaultFn: 'now',
    mysql: {
      columnName: 'date_creation',
      dataType: 'date',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  date_creation?: string;

  @property({
    type: 'string',
    length: 150,
    mysql: {
      columnName: 'adresse',
      dataType: 'varchar',
      dataLength: 150,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  adresse?: string;

  @property({
    type: 'number',
    mysql: {
      columnName: 'longitude',
      dataType: 'decimal',
      nullable: 'Y',
      dataPrecision: 10,
      dataScale: 7,
    },
  })
  longitude?: number;

  @property({
    type: 'number',
    mysql: {
      columnName: 'latitude',
      dataType: 'decimal',
      nullable: 'Y',
      dataPrecision: 10,
      dataScale: 7,
    },
  })
  latitude?: number;

  @property({
    type: 'boolean',
    precision: 3,
    scale: 0,
    mysql: {
      columnName: 'is_actif',
      dataType: 'tinyint',
      dataLength: null,
      dataPrecision: 3,
      dataScale: 0,
      nullable: 'Y',
    },
  })
  is_actif?: boolean;

  @property({
    type: 'boolean',
    precision: 3,
    scale: 0,
    mysql: {
      columnName: 'is_all_night',
      dataType: 'tinyint',
      dataLength: null,
      dataPrecision: 3,
      dataScale: 0,
      nullable: 'Y',
    },
  })
  is_all_night?: boolean;

  @property({
    type: 'string',
    length: 150,
    jsonSchema: {
      enum: Object.values(PeriodicityType),
    },
    mysql: {
      columnName: 'periodicity_type',
      dataType: 'varchar',
      dataLength: 150,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  periodicityType?: string;

  @property({
    type: 'date',
    jsonSchema: {
      format: 'date', //This can be changed to 'date-time', 'time' or 'date'
    },
    mysql: {
      columnName: 'watch_start_date',
      dataType: 'date',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  watch_start_date?: string;

  @property({
    type: 'date',
    jsonSchema: {
      format: 'date', //This can be changed to 'date-time', 'time' or 'date'
    },
    mysql: {
      columnName: 'watch_end_date',
      dataType: 'date',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  watch_end_date?: string;

  @property({
    type: 'string',
    length: 150,
    mysql: {
      columnName: 'watch_periodicity_value',
      dataType: 'varchar',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  watch_periodicity_value?: string;

  @hasMany(() => Medecin, {keyTo: 'structuresanitaireId'})
  medecins: Medecin[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<StructureSanitaire>) {
    super(data);
  }
}

export interface StructureSanitaireRelations {
  // describe navigational properties here
}

export type StructureSanitaireWithRelations = StructureSanitaire &
  StructureSanitaireRelations;
