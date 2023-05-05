import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {PamodbDataSource} from '../datasources';
import {Fichemedicale, FichemedicaleRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class FichemedicaleRepository extends DefaultCrudRepository<
    Fichemedicale,
    typeof Fichemedicale.prototype.fichemedicaleId,
    FichemedicaleRelations
> {
    public readonly user: BelongsToAccessor<User, typeof Fichemedicale.prototype.fichemedicaleId>;

    constructor(
        @inject('datasources.pamodb') dataSource: PamodbDataSource,
        @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>
    ) {
        super(Fichemedicale, dataSource);
        this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);
        this.registerInclusionResolver('user', this.user.inclusionResolver);
    }
}
