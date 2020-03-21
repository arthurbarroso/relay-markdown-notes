import nodemailer from 'nodemailer';
import mailConfig from '../config/mail';

class Mail {
  transporter: any;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: mailConfig.host,
      port: Number(mailConfig.port),
      secure: mailConfig.secure,
      auth: {
        user: mailConfig.auth.user,
        pass: mailConfig.auth.pass,
      },
    });
  }

  sendMail(message) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }
}

export default new Mail();
