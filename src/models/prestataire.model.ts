import {Entity, hasMany, model, property} from '@loopback/repository';
import {PrestataireHasStructure} from './prestataire-has-structure.model';
import {StructureSanitaire} from './structure-sanitaire.model';

@model({
    settings: {
        idInjection: false,
        mysql: {schema: 'pamo-backend-db', table: 'prestataire'}
    }
})
export class Prestataire extends Entity {
    @property({
        type: 'number',
        required: false,
        precision: 10,
        scale: 0,
        id: true,
        mysql: {
            columnName: 'prestataireId',
            dataType: 'int',
            dataLength: null,
            dataPrecision: 10,
            dataScale: 0,
            nullable: 'N'
        }
    })
    prestataireId: number;

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
            nullable: 'N'
        }
    })
    nom: string;

    @property({
        type: 'string',
        required: true,
        length: 400,
        mysql: {
            columnName: 'libelle',
            dataType: 'varchar',
            dataLength: 400,
            dataPrecision: null,
            dataScale: null,
            nullable: 'Y'
        }
    })
    libelle: string;

    @property({
        type: 'string',
        required: true,
        length: 400,
        mysql: {
            columnName: 'adresse',
            dataType: 'varchar',
            dataLength: 400,
            dataPrecision: null,
            dataScale: null,
            nullable: 'Y'
        }
    })
    adresse: string;

    @property({
        type: 'number',
        mysql: {
            columnName: 'longitude',
            dataType: 'decimal',
            nullable: 'Y',
            dataPrecision: 10,
            dataScale: 7
        }
    })
    longitude?: number;

    @property({
        type: 'number',
        mysql: {
            columnName: 'latitude',
            dataType: 'decimal',
            nullable: 'Y',
            dataPrecision: 10,
            dataScale: 7
        }
    })
    latitude?: number;

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
            nullable: 'N'
        }
    })
    numero: string;

    @property({
        type: 'boolean',
        precision: 3,
        scale: 0,
        default: true,
        required: false,
        mysql: {
            columnName: 'status',
            dataType: 'tinyint',
            dataLength: null,
            dataPrecision: 3,
            dataScale: 0,
            nullable: 'Y'
        }
    })
    status?: boolean;

    @hasMany(() => StructureSanitaire, {through: {model: () => PrestataireHasStructure}})
    structureSanitaires: StructureSanitaire[];
    // Define well-known properties here

    // Indexer property to allow additional data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [prop: string]: any;

    constructor(data?: Partial<Prestataire>) {
        super(data);
    }
}

export interface PrestataireRelations {
    // describe navigational properties here
}

export type PrestataireWithRelations = Prestataire & PrestataireRelations;
