import nodemailer from 'nodemailer';
import { resolve } from 'path';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';
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

    this.configureTemplates();
  }

  configureTemplates() {
    const path = resolve(__dirname, 'mail');
    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(path, 'layouts'),
          partialsDir: resolve(path, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath: path,
        extName: '.hbs',
      })
    );
  }

  sendMail(message) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }
}

export default new Mail();
