import {HttpErrors} from '@loopback/rest';
import {Credentials} from '../repositories';

export function validateCredentials(credentials: Credentials) {
  // Validate Password Length
  if (!credentials.password || credentials.password.length < 5) {
    throw new HttpErrors.UnprocessableEntity(
      'password must be minimum 5 characters',
    );
  }
}
