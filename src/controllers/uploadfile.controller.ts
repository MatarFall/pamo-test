// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import multer = require('multer');
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {post, Request, requestBody, Response, RestBindings} from '@loopback/rest';
import {UploadService} from '../services';

@authenticate('jwt')
@authorize({allowedRoles: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_MEDECIN']})
export class UploadfileController {
    constructor(@inject('services.UploadService') public uploadService: UploadService) {}

    @post('/files', {
        responses: {
            200: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object'
                        }
                    }
                },
                description: 'Files and fields'
            }
        }
    })
    async uploadImage(
        @requestBody({
            description: 'multipart/form-data',
            required: true,
            content: {
                'multipart/form-data': {
                    'x-parser': 'stream',
                    schema: {type: 'object'}
                }
            }
        })
        request: Request,
        @inject(RestBindings.Http.RESPONSE) response: Response
    ): Promise<object> {
        const upload = multer();
        return new Promise<object>((resolve, reject) => {
            upload.any()(request, response, (err: any) => {
                if (err) reject(err);
                else {
                    const dataFile = this.uploadService.getFilesAndFields(request);
                    resolve(dataFile);
                }
            });
        });
    }
}
