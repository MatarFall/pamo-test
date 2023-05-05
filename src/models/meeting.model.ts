import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Medecin, MedecinWithRelations} from './medecin.model';
import {User} from './user.model';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'pamo-backend-db', table: 'meeting'},
  },
})
export class Meeting extends Entity {
  @property({
    type: 'number',
    required: false,
    precision: 10,
    scale: 0,
    id: true,
    mysql: {
      columnName: 'meetingId',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  meetingId: number;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mysql: {
      columnName: 'objet',
      dataType: 'varchar',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  objet: string;

  @property({
    type: 'string',
    required: false,
    length: 50,
    mysql: {
      columnName: 'type',
      dataType: 'varchar',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  type: string;

  //Ajout de paramètres supplémentaires
  //Ajout nom_patient
  @property({
    type: 'string',
    required: false,
    length: 50,
    mysql: {
      columnName: 'nomPatient',
      dataType: 'varchar',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  nomPatient?: string;

  @property({
    type: 'string',
    required: false,
    length: 50,
    mysql: {
      columnName: 'prenomPatient',
      dataType: 'varchar',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  prenomPatient?: string;

  @property({
    type: 'string',
    required: false,
    length: 50,
    mysql: {
      columnName: 'numeroPatient',
      dataType: 'varchar',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  numeroPatient?: string;

  @property({
    type: 'string',
    required: false,
    length: 50,
    mysql: {
      columnName: 'mailContact',
      dataType: 'varchar',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  mailContact?: string;

  @property({
    type: 'string',
    required: false,
    mysql: {
      columnName: 'symptomes',
      dataType: 'mediumtext',
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  symptomes: string;

  //Les notes doivent être ajouter par le médecin en renseignant la nouvelle date s'il veut proposer une nouvelle date pour un RV
  @property({
    type: 'string',
    required: false,
    mysql: {
      columnName: 'notes',
      dataType: 'mediumtext',
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  notes: string;

  @property({
    type: 'string',
    required: false,
    length: 50,
    mysql: {
      columnName: 'status',
      dataType: 'varchar',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  status: string;

  @belongsTo(() => User)
  userId?: number;

  @property({
    type: 'date',
    required: true,
    mysql: {
      columnName: 'date_patient',
      dataType: 'datetime',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  datePatient: string;

  @property({
    type: 'date',
    required: false,
    mysql: {
      columnName: 'date_medecin',
      dataType: 'datetime',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  dateMedecin: string;

  @property({
    type: 'boolean',
    precision: 3,
    scale: 0,
    default: true,
    mysql: {
      columnName: 'is_approved_by_patient',
      dataType: 'tinyint',
      dataLength: null,
      dataPrecision: 3,
      dataScale: 0,
      nullable: 'Y',
    },
  })
  isApprovedByPatient?: number;

  @property({
    type: 'boolean',
    precision: 3,
    scale: 0,
    default: false,
    mysql: {
      columnName: 'is_approved_by_medecin',
      dataType: 'tinyint',
      dataLength: null,
      dataPrecision: 3,
      dataScale: 0,
      nullable: 'Y',
    },
  })
  isApprovedByMedecin?: number;

  @belongsTo(() => Medecin)
  medecinId: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Meeting>) {
    super(data);
  }
}

export interface MeetingRelations {
  // describe navigational properties here
  medecin: MedecinWithRelations;
}

export type MeetingWithRelations = Meeting & MeetingRelations;
