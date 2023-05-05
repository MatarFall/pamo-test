import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {Request} from '@loopback/rest';
import {BUCKET_NAME, ID, SECRET} from '../utils';
const AWS = require('aws-sdk');
/*
 * Fix the service type. Possible options can be:
 * - import {UploadService} from 'your-module';
 * - export type UploadService = string;
 * - export interface UploadService {}
 */
//export type UploadService = unknown;

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
});
@injectable({scope: BindingScope.TRANSIENT})
export class UploadService {
  constructor(/* Add @inject to inject parameters */) {}

  async getFilesAndFields(request: Request) {
    const uploadedFiles = request.files;
    let files: any;
    if (Array.isArray(uploadedFiles)) {
      files = uploadedFiles[0];
    }

    const filename = Date.now().toString().concat('_', files['originalname']);

    const params = {
      Bucket: BUCKET_NAME,
      Key: filename, // File name you want to save as in S3
      Body: files.buffer,
      ACL: 'public-read',
    };

    return new Promise((resolve, reject) => {
      return s3.upload(params, (err: any, result: any) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
}
