import Mail from '../util/mail';

class RegisteredEmail {
  get key() {
    return 'RegisteredEmail';
  }

  async handle({ data }) {
    const { newUser } = data;
    await Mail.sendMail({
      to: newUser.email,
      subject: 'Welcome to marknotes',
      template: 'registered',
      context: {
        name: newUser.username,
      },
    });
  }
}

export default new RegisteredEmail();
