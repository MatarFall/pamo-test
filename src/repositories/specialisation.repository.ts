import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {PamodbDataSource} from '../datasources';
import {Specialisation, SpecialisationRelations} from '../models';

export class SpecialisationRepository extends DefaultCrudRepository<
    Specialisation,
    typeof Specialisation.prototype.specialisationId,
    SpecialisationRelations
> {
    constructor(@inject('datasources.pamodb') dataSource: PamodbDataSource) {
        super(Specialisation, dataSource);
    }

    async filterExistingCodeSpecialisation(list: Specialisation[]) {
        const allSpecialisation: string[] = (await this.find()).map((value: Specialisation) => {
            return value.code;
        });

        const listCorrectSpecialisationCodes = list.filter((item: Specialisation) => {
            return allSpecialisation.includes(item.code);
        });
        if (!listCorrectSpecialisationCodes.length) {
            throw new HttpErrors.BadRequest('Specialisation Not Found');
        } else {
            return listCorrectSpecialisationCodes;
        }
    }
}
