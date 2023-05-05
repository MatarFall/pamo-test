import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'pamo-backend-db', table: 'news'},
  },
})
export class News extends Entity {
  @property({
    type: 'number',
    required: false,
    precision: 10,
    scale: 0,
    id: true,
    mysql: {
      columnName: 'newId',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  newId: number;

  @property({
    type: 'string',
    required: true,
    length: 40,
    mysql: {
      columnName: 'titre',
      dataType: 'varchar',
      dataLength: 40,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  titre: string;

  @property({
    type: 'string',
    required: true,
    length: 20,
    mysql: {
      columnName: 'categorie',
      dataType: 'varchar',
      dataLength: 20,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  categorie: string;

  @property({
    type: 'string',
    length: 65535,
    mysql: {
      columnName: 'contenu',
      dataType: 'text',
      dataLength: 65535,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  contenu?: string;

  @property({
    type: 'string',
    length: 65535,
    mysql: {
      columnName: 'image_url',
      dataType: 'text',
      dataLength: 65535,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  imageUrl?: string;

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
  isActif?: boolean;

  @property({
    type: 'date',
    mysql: {
      columnName: 'date_publication',
      dataType: 'datetime',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  datePublication?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<News>) {
    super(data);
  }
}

export interface NewsRelations {
  // describe navigational properties here
}

export type NewsWithRelations = News & NewsRelations;
