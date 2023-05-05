import { belongsTo, Entity, hasMany, model, property } from '@loopback/repository';
import { MedecinHasSpecialisation } from './medecin-has-specialisation.model';
import { Meeting } from './meeting.model';
import { Specialisation } from './specialisation.model';
import { StructureSanitaire } from './structure-sanitaire.model';
import { User, UserWithRelations } from './user.model';

@model({
    settings: {
        idInjection: false,
        mysql: { schema: 'pamo-backend-db', table: 'medecin' }
    }
})
export class Medecin extends Entity {
    @property({
        type: 'number',
        required: false,
        precision: 10,
        scale: 0,
        id: true,
        mysql: {
            columnName: 'medecinid',
            dataType: 'int',
            dataLength: null,
            dataPrecision: 10,
            dataScale: 0,
            nullable: 'N'
        }
    })
    medecinid: number;
    @belongsTo(() => User)
    userId: number;
    @hasMany(() => Specialisation, {
        through: { model: () => MedecinHasSpecialisation }
    })
    specialisations: Specialisation[];

    @hasMany(() => Meeting, { keyTo: 'medecinId' })
    meetings: Meeting[];

    @belongsTo(() => StructureSanitaire)
    structuresanitaireId: number;
    // Define well-known properties here

    // Indexer property to allow additional data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [prop: string]: any;

    constructor(data?: Partial<Medecin>) {
        super(data);
    }
}

export interface MedecinRelations {
    // describe navigational properties here
    user: UserWithRelations;
}

export type MedecinWithRelations = Medecin & MedecinRelations;
