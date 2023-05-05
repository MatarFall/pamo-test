import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class PrestataireHasStructure extends Entity {
    @property({
        type: 'number',
        id: 1
    })
    prestataireId?: number;

    @property({
        type: 'number',
        id: 2
    })
    structureSanitaireId?: number;
    // Define well-known properties here

    // Indexer property to allow additional data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [prop: string]: any;

    constructor(data?: Partial<PrestataireHasStructure>) {
        super(data);
    }
}

export interface PrestataireHasStructureRelations {
    // describe navigational properties here
}

export type PrestataireHasStructureWithRelations = PrestataireHasStructure & PrestataireHasStructureRelations;
