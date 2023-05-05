import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import {Meeting, User} from '../models';
import {constructEmailContent, emailSubject} from '../utils';

const EMAIL_CONFIG = {
    type: 'SMTP',
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: 'pamoapp001@gmail.com',
        pass: 'urzepmrzlkwvcjge'
    }
};

@injectable({scope: BindingScope.TRANSIENT})
export class EmailSenderService {
    constructor(/* Add @inject to inject parameters */) {}

    async sendMail(mailObj: Mail.Options): Promise<object> {
        const configOption = EMAIL_CONFIG;

        const transporter = nodemailer.createTransport(configOption);
        return await transporter.sendMail(mailObj);
    }

    async sendUserEmailNotification(
        typeEmail: 'REGISTRATION' | 'REGISTRATION_IN_PROGRESS' | 'FORGOTTEN_PASSWORD' | 'CHANGE_PASSWORD' | 'PASSWORD_CHANGE_SUCCESS',
        user: any,
        data?: any
    ) {
        const emailContent = constructEmailContent(typeEmail, user, data);

        return await this.sendMail({
            from: EMAIL_CONFIG.auth.user,
            to: user.email,
            subject: emailSubject[typeEmail],
            html: emailContent
        });
    }

    async sendMeetingNotification(
        typeEmail:
            | 'NOTIFY_USER_MEETING'
            | 'REGISTRATION_IN_PROGRESS'
            | 'FORGOTTEN_PASSWORD'
            | 'CHANGE_PASSWORD'
            | 'PASSWORD_CHANGE_SUCCESS',
        destinataire: User,
        data?: {medecin?: any; meeting?: Meeting, statusMeeting?: any}
    ) {
        const emailContent = constructEmailContent(typeEmail, destinataire, data);

        return await this.sendMail({
            from: EMAIL_CONFIG.auth.user,
            to: data?.meeting?.mailContact,
            subject: emailSubject[typeEmail],
            html: emailContent
        });
    }
}
