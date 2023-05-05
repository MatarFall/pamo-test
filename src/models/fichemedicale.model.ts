import {belongsTo, Entity, model, property} from '@loopback/repository';
import {User} from './user.model';

@model({
    settings: {
        idInjection: false,
        mysql: {schema: 'pamo-backend-db', table: 'fichemedicale'}
    }
})
export class Fichemedicale extends Entity {
    @property({
        type: 'number',
        required: false,
        precision: 10,
        scale: 0,
        id: true,
        mysql: {
            columnName: 'fichemedicaleId',
            dataType: 'int',
            dataLength: null,
            dataPrecision: 10,
            dataScale: 0,
            nullable: 'N'
        }
    })
    fichemedicaleId: number;

    @property({
        type: 'date',
        mysql: {
            columnName: 'date_naissance',
            dataType: 'date',
            dataLength: null,
            dataPrecision: null,
            dataScale: null,
            nullable: 'Y'
        }
    })
    date_naissance?: string;

    @property({
        type: 'string',
        length: 25,
        required: false,
        mysql: {
            columnName: 'groupe_sanguin',
            dataType: 'varchar',
            dataLength: 25,
            dataPrecision: null,
            dataScale: null,
            nullable: 'Y'
        }
    })
    groupe_sanguin?: string;

    @property({
        type: 'string',
        length: 25,
        mysql: {
            columnName: 'sexe',
            dataType: 'varchar',
            dataLength: 25,
            dataPrecision: null,
            dataScale: null,
            nullable: 'Y'
        }
    })
    sexe?: string;

    @property({
        type: 'string',
        length: 255,
        mysql: {
            columnName: 'maladies',
            dataType: 'varchar',
            dataLength: 255,
            dataPrecision: null,
            dataScale: null,
            nullable: 'Y'
        }
    })
    maladies?: string;

    @property({
        type: 'string',
        length: 255,
        mysql: {
            columnName: 'allergies',
            dataType: 'varchar',
            dataLength: 255,
            dataPrecision: null,
            dataScale: null,
            nullable: 'Y'
        }
    })
    allergies?: string;

    @property({
        type: 'string',
        length: 255,
        mysql: {
            columnName: 'traitementsAnterieurs',
            dataType: 'varchar',
            dataLength: 255,
            dataPrecision: null,
            dataScale: null,
            nullable: 'Y'
        }
    })
    traitements_anterieurs?: string;

    @property({
        type: 'number',
        required: false,
        mysql: {
            columnName: 'poids',
            dataType: 'double',
            nullable: 'Y'
        }
    })
    poids?: number;

    @property({
        type: 'number',
        required: false,
        mysql: {
            columnName: 'taille',
            dataType: 'double',
            nullable: 'Y'
        }
    })
    taille?: number;

    @property({
        type: 'string',
        length: 200,
        mysql: {
            columnName: 'contact_urgence',
            dataType: 'varchar',
            dataLength: 200,
            dataPrecision: null,
            dataScale: null,
            nullable: 'Y'
        }
    })
    contact_urgence?: string;

    @belongsTo(() => User)
    userId: number;
    // Define well-known properties here

    // Indexer property to allow additional data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [prop: string]: any;

    constructor(data?: Partial<Fichemedicale>) {
        super(data);
    }
}

export interface FichemedicaleRelations {
    // describe navigational properties here
}

export type FichemedicaleWithRelations = Fichemedicale & FichemedicaleRelations;
