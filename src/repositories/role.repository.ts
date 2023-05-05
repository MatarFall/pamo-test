import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {PamodbDataSource} from '../datasources';
import {Role, RoleRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class RoleRepository extends DefaultCrudRepository<
  Role,
  typeof Role.prototype.roleId,
  RoleRelations
> {
  public readonly users: HasManyRepositoryFactory<
    User,
    typeof Role.prototype.roleId
  >;

  constructor(
    @inject('datasources.pamodb') dataSource: PamodbDataSource,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Role, dataSource);
    this.users = this.createHasManyRepositoryFactoryFor(
      'users',
      userRepositoryGetter,
    );
    this.registerInclusionResolver('users', this.users.inclusionResolver);
  }

  findRoleByCode(code: string) {
    return this.findOne({where: {code}});
  }
}
