import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'pamo-backend-db', table: 'medecin_has_specialisation'}
  }
})
export class MedecinHasSpecialisation extends Entity {
  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    id: 1,
    mysql: {columnName: 'medecinId', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  medecinId: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    id: 2,
    mysql: {columnName: 'specialisationId', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  specialisationId: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<MedecinHasSpecialisation>) {
    super(data);
  }
}

export interface MedecinHasSpecialisationRelations {
  // describe navigational properties here
}

export type MedecinHasSpecialisationWithRelations = MedecinHasSpecialisation & MedecinHasSpecialisationRelations;
