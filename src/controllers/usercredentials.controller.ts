// Uncomment these imports to begin using these cool features!

import {authenticate} from '@loopback/authentication';
import {
  TokenServiceBindings,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {Entity, model, property, repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  HttpErrors,
  post,
  put,
  requestBody,
  response,
  SchemaObject,
} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import _ from 'lodash';
import {v4 as uuidv4} from 'uuid';
import {PasswordHasherBindings} from '../keys';
import {
  KeyAndPassword,
  Medecin,
  Meeting,
  ResetPasswordInit,
  User,
} from '../models';
import {
  MedecinRepository,
  MeetingRepository,
  RoleRepository,
  StructureSanitaireRepository,
  UserCredentialsRepository,
  UserRepository,
} from '../repositories';
import {
  EmailSenderService,
  jwtService,
  MyUserService,
  PasswordHasher,
  validateCredentials,
} from '../services';
import {ERROR_CODE, PAMO_CODE_ROLES} from '../utils';

const CredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['login', 'password'],
  properties: {
    login: {
      type: 'string',
    },
    password: {
      type: 'string',
      minLength: 3,
    },
  },
};

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  },
};

@model()
export class NewUserRequest extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  nom: string;

  @property({
    type: 'string',
    required: true,
  })
  prenom: string;

  @property({
    type: 'string',
    required: false,
  })
  roleCode: string;

  @property({
    type: 'string',
    required: true,
  })
  numero: string;

  @property({
    type: 'string',
    required: true,
  })
  adresse: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'boolean',
    required: false,
  })
  account_status?: boolean;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'number',
    required: false,
  })
  structuresanitaireId: number;
}

export class UserInfos extends User {
  @property({
    type: 'number',
    required: false,
  })
  medecinId?: number;
  @property({
    type: 'number',
    required: false,
  })
  patientId?: number;
}

export class UsercredentialsController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwt_service: jwtService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
    @repository(UserRepository) protected userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @repository(RoleRepository) protected roleRepository: RoleRepository,
    @repository(MedecinRepository)
    protected medecinRepository: MedecinRepository,
    @repository(StructureSanitaireRepository)
    protected structureSanitaireRepository: StructureSanitaireRepository,
    @inject('services.EmailSenderService')
    protected emailService: EmailSenderService,
    @repository(MeetingRepository)
    public meetingRepository: MeetingRepository,
    @repository(UserCredentialsRepository)
    public userCreRepository: UserCredentialsRepository,
  ) {}

  @get('/user/me', {
    responses: {
      '200': {
        description: 'The current user profile',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User),
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async printCurrentUser(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<UserInfos | null> {
    const userEmail = currentUserProfile[securityId];
    const user: User | null = await this.userRepository.findOne({
      where: {email: userEmail},
      include: [{relation: 'role'}],
    });
    const userInfos: UserInfos = Object.assign({}, user);
    if (user && user.role.code === PAMO_CODE_ROLES.ROLE_MEDECIN) {
      const medecin: Medecin | null = await this.medecinRepository.findOne({
        where: {userId: user.userId},
      });
      userInfos.medecinId = medecin?.medecinid;
    }
    return userInfos;
  }

  @post('/user/signup')
  @response(200, {
    description: 'Registration User ',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async signUp(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NewUserRequest),
        },
      },
    })
    newUserRequest: NewUserRequest,
  ): Promise<User> {
    // ensure a valid email value and password value
    validateCredentials(_.pick(newUserRequest, ['email', 'password']));
    // let role: Role | null;
    let savedUser: User;
    const userPayload = _.omit(newUserRequest, [
      'password',
      'structuresanitaireId',
    ]);

    if (!newUserRequest.roleCode) {
      newUserRequest.roleCode = PAMO_CODE_ROLES.ROLE_USER;
    }
    const role = await this.roleRepository.findRoleByCode(
      newUserRequest.roleCode,
    );
    if (!role) {
      throw new HttpErrors.BadRequest('Role invalide');
    }

    if (role?.code === PAMO_CODE_ROLES.ROLE_MEDECIN) {
      try {
        await this.structureSanitaireRepository.findById(
          newUserRequest.structuresanitaireId,
        );
      } catch (error) {
        throw new HttpErrors.BadRequest('Structure Sanitaire invalide');
      }
    }
    // encrypt the password
    const password = await this.passwordHasher.hashPassword(
      newUserRequest.password,
    );
    try {
      // create the new user
      const account_status =
        role.code === PAMO_CODE_ROLES.ROLE_USER ? true : false;
      savedUser = await this.userRepository.create({
        nom: userPayload.nom,
        prenom: userPayload.prenom,
        adresse: userPayload.adresse,
        email: userPayload.email,
        numero: userPayload.numero,
        roleId: role?.roleId,
        account_status,
      });
    } catch (error: any) {
      if (error?.code === ERROR_CODE.DUPLICATE_ENTRY) {
        throw new HttpErrors.BadRequest('Email déjà utilisé');
      } else {
        throw error;
      }
    }

    if (role?.code === PAMO_CODE_ROLES.ROLE_MEDECIN) {
      try {
        await this.medecinRepository.create({
          userId: savedUser.userId,
          structuresanitaireId: newUserRequest.structuresanitaireId,
        });
      } catch (error) {
        throw new HttpErrors.ServiceUnavailable(
          "Une erreur est survenue lors de l'inscription du medecin",
        );
      }
    }

    try {
      // set the password
      await this.userRepository
        .userCredentials(savedUser.userId)
        .create({email: savedUser.email, password});
    } catch (error) {
      throw new HttpErrors.BadRequest('Le compte existe déjà');
    }

    this.emailService
      .sendUserEmailNotification('REGISTRATION', savedUser)
      .then((res: any) => {})
      .catch((err: any) => {
        console.error(err);
      });

    return savedUser;
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_MEDECIN']})
  @post('/user/register-meeting')
  @response(200, {
    description: 'User Meeting instance',
    content: {'application/json': {schema: getModelSchemaRef(Meeting)}},
  })
  async createMeeting(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Meeting, {
            title: 'NewMeeting',
            exclude: ['meetingId'],
          }),
        },
      },
    })
    meeting: Omit<Meeting, 'meetingId'>,
  ): Promise<Meeting> {
    const userEmail = currentUserProfile[securityId];
    const user: User | null = await this.userRepository.findOne({
      where: {email: userEmail},
    });
    if (!user) throw new HttpErrors.BadRequest('User invalide');
    return this.meetingRepository.create(meeting);
  }

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody)
    credentials: {
      login: any;
      password: any;
    },
  ): Promise<{token: string}> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);
    if (!user.account_status)
      throw new HttpErrors.Forbidden(
        'Account Deactivated, please contact the administrator',
      );
    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.jwt_service.generateToken(userProfile);

    return {token};
  }

  @post('/users/check-account', {
    responses: {
      '200': {
        description: 'Return True or False if account Exists or Not',
        content: {
          'application/json': {
            schema: {
              type: 'boolean',
            },
          },
        },
      },
    },
  })
  async checkAccountExist(
    @requestBody({
      description: 'Enter the email to check if it is already used',
      required: true,
      content: {
        'application/json': {
          schema: {
            properties: {
              email: {
                type: 'string',
                format: 'email',
              },
            },
          },
        },
      },
    })
    emailPayload: {
      email: string;
    },
  ): Promise<boolean> {
    const userAccount = await this.userRepository.findOne({
      where: {email: emailPayload.email},
    });
    return !!userAccount;
  }

  @post('/reset-password/init')
  async resetPasswordInit(
    @requestBody() resetPasswordInit: ResetPasswordInit,
  ): Promise<any> {
    // checks whether email is valid as per regex pattern provided
    const email = await this.validateEmail(resetPasswordInit.email);

    // At this point we are dealing with valid email.
    // Lets check whether there is an associated account
    const foundUser = await this.userCreRepository.findOne({
      where: {email},
    });

    // No account found
    if (!foundUser) {
      return 'OK';
    }

    // We generate unique reset key to associate with reset request
    foundUser.resetKey = uuidv4();
    try {
      // Updates the user to store their reset key with error handling
      await this.userCreRepository.updateById(foundUser.id, foundUser);
    } catch (e) {
      return e;
    }

    this.emailService
      .sendUserEmailNotification('CHANGE_PASSWORD', foundUser)
      .then((res: any) => {
        return 'Un email de réinitialisation avec les instructions a été envoyé sur votre mail';
      })
      .catch((err: any) => {
        console.error(err);
        throw new HttpErrors.InternalServerError(
          "Impossible d'envoyer l'email de réinitialisation",
        );
      });
  }

  @put('/reset-password/finish')
  async resetPasswordFinish(
    @requestBody() keyAndPassword: KeyAndPassword,
  ): Promise<{message: string}> {
    // Checks whether password and reset key meet minimum security requirements
    const {resetKey, password} = await this.validateKeyPassword(keyAndPassword);

    // Search for a user using reset key
    const foundUser = await this.userCreRepository.findOne({
      where: {resetKey: resetKey},
    });

    // No user account found
    if (!foundUser) {
      throw new HttpErrors.NotFound(
        'No associated account for the provided reset key',
      );
    }

    // Encrypt password to avoid storing it as plain text
    const passwordHash = await this.passwordHasher.hashPassword(password);
    try {
      // Update user password with the newly provided password
      this.userRepository
        .userCredentials(foundUser.userId)
        .patch({password: passwordHash});

      // Remove reset key from database its no longer valid
      foundUser.resetKey = '';

      // Update the user removing the reset key
      await this.userCreRepository.updateById(foundUser.id, foundUser);
    } catch (e) {
      return e;
    }

    return {message: 'Password reset request completed successfully'};
  }

  async validateKeyPassword(
    keyAndPassword: KeyAndPassword,
  ): Promise<KeyAndPassword> {
    if (!keyAndPassword.password || keyAndPassword.password.length < 8) {
      throw new HttpErrors.UnprocessableEntity(
        'Password must be minimum of 8 characters',
      );
    }

    if (keyAndPassword.password !== keyAndPassword.confirmPassword) {
      throw new HttpErrors.UnprocessableEntity(
        'Password and confirmation password do not match',
      );
    }

    if (
      keyAndPassword.resetKey.length === 0 ||
      keyAndPassword.resetKey.trim() === ''
    ) {
      throw new HttpErrors.UnprocessableEntity('Reset key is mandatory');
    }

    return keyAndPassword;
  }

  async validateEmail(email: string): Promise<string> {
    const emailRegPattern = /\S+@\S+\.\S+/;
    if (!emailRegPattern.test(email)) {
      throw new HttpErrors.UnprocessableEntity('Invalid email address');
    }
    return email;
  }
}
