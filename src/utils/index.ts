export const ID = 'AKIATRB7YTAYFIUV6WPR';
export const SECRET = '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';
export const PAMO_CODE_ROLES = {
  ROLE_USER: 'ROLE_USER',
  ROLE_MEDECIN: 'ROLE_MEDECIN',
  ROLE_ADMIN: 'ROLE_ADMIN',
};

export const ERROR_CODE = {
  DUPLICATE_ENTRY: 'ER_DUP_ENTRY',
};
export const BUCKET_NAME = 'pamo';

export const APPLICATION_URL = 'https://pamo.netlify.app';
// export const APPLICATION_URL = 'https://amazing-hamilton-899951.netlify.app';

export const emailsTitle = {
  REGISTRATION_DONE:
    '<h3>Inscription bien effectuée sur la plateforme PAMO</h3>',
  REGISTRATION_IN_PROGRESS:
    '<h3>Inscription en attente de validation sur la plateforme PAMO</h3>',
  NOTIFY_USER_MEETING:
    '<h3>Information Prise de rendez-vous PAMO</h3>',
  CHANGED_PASSWORD:
    '<h3>Réinitialisation Mot de passe PAMO</h3>'
};

export const emailContent = {
  REGISTRATION: `<p>Bienvenue sur PAMO.</p>
  <p> PAMO est une plateforme ... </p>
  <ol>
      <li>Mettre un descriptif de la plateforme et de ses objectifs</li>
  </ol>
  <p>Cdt.&nbsp;</p><br />`,
  FORGOTTEN_PASSWORD_INIT: ``,
  CHANGE_PASSWORD_INIT: ``,
  PASSWORD_INIT_DONE: ``,
  FOOTER: `<table cellpadding="0" cellspacing="0" width="100%">
  <tbody>
      <tr>
          <td width="560" class="esd-container-frame" align="center" valign="top">
              <table cellpadding="0" cellspacing="0" width="100%">
                  <tbody>
                      <tr>
                          <td align="center" class="esd-block-text es-infoblock">
                              <p style="line-height: 150%;">PAMO</p>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </td>
      </tr>
  </tbody>
</table><br />`,
};

export const emailSubject = {
  REGISTRATION: 'Inscription sur PAMO',
  REGISTRATION_IN_PROGRESS: 'Inscription sur PAMO',
  FORGOTTEN_PASSWORD: 'Réinitialisation du mot de passe',
  CHANGE_PASSWORD: 'Réinitialisation du mot de passe',
  PASSWORD_CHANGE_SUCCESS: 'Réinitialisation du mot de passe',
  NOTIFY_USER_MEETING: 'Informations Rendez-vous PAMO',
};

export function constructEmailContent(
  typeEmail:
    | 'REGISTRATION'
    | 'REGISTRATION_IN_PROGRESS'
    | 'FORGOTTEN_PASSWORD'
    | 'CHANGE_PASSWORD'
    | 'PASSWORD_CHANGE_SUCCESS' |
    'NOTIFY_USER_MEETING',
  user: any,
  data?: any
) {
  console.log('data', data);

  switch (typeEmail) {
    case 'REGISTRATION':
      return `
        ${emailsTitle.REGISTRATION_DONE}<br />
        Cher(Chère) M.,Mme <b>${user?.prenom} ${user?.prenom} </b>,
        ${emailContent.REGISTRATION}
        ${emailContent.FOOTER}`;
    case 'REGISTRATION_IN_PROGRESS':
      return `
        ${emailsTitle.REGISTRATION_IN_PROGRESS}<br />
        Cher(Chère) M.,Mme ${user?.prenom} ${user?.prenom},
        ${emailContent.REGISTRATION}
        ${emailContent.FOOTER}`;
    case 'CHANGE_PASSWORD':
      return `
        ${emailsTitle.CHANGED_PASSWORD}<br />
        <div>
          <p>Hello,</p>
          <p style="color: red;">Ceci est un email destiné à réinitialiser votre mot de passe</p>
          <p>Pour réinitialiser votre mot de passe, veuillez cliquer sur le lien ci-dessous.</p>
          <a href="${APPLICATION_URL}/reset-password/finish?resetKey=${user?.resetKey}">Reinitialiser votre mot de passe</a>
          <p>Si vous n'avez pas initié cette demande de changement de mot de passe,veuillez ignorer ce mail.</p>
          <p>Merci</p>
          <p>PAMO team</p></div>
        ${emailContent.FOOTER}`;
    case 'NOTIFY_USER_MEETING':
      return `
        ${emailsTitle.NOTIFY_USER_MEETING}<br />
        Cher(Chère) M./Mme ${data?.meeting?.prenomPatient} ${data?.meeting?.nomPatient},
        <p> Votre rendez-vous avec le medecin ${data?.medecin?.prenom + ' ' + data?.medecin?.nom} a été ${data?.statusMeeting} </p>
        <p>
            Veuillez accéder à la plateforme pour avoir plus de détails.
        </p>
        <p>Contacts : 00221 33 800 00 00 </p><br />
        <p>Cdt.&nbsp;</p><br />`
    default:
      break;
  }
}

