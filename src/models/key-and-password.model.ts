import {Model, model, property} from '@loopback/repository';

@model()
export class KeyAndPassword extends Model {
  @property({
    type: 'string',
    required: true,
  })
  resetKey: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  confirmPassword: string;


  constructor(data?: Partial<KeyAndPassword>) {
    super(data);
  }
}

export interface KeyAndPasswordRelations {
  // describe navigational properties here
}

export type KeyAndPasswordWithRelations = KeyAndPassword & KeyAndPasswordRelations;