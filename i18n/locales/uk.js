export default {
  app: 'Нотатки',
  fields: {
    email: {
      label: 'Ел. пошта',
      placeholder: 'Введіть email',
      invalid: 'Недійсна електронна адреса',
      required: 'Пароль обов’язкове поле',
      min: 'Має бути щонайменше 8 символів'
    },
    password: {
      label: 'Пароль',
      placeholder: 'Введіть пароль'
    }
  },
  register: {
    title: 'Зареєструйте безкоштовний обліковий запис',
    already: 'Вже зареєстровані?',
    login: {
      button: 'Увійти',
      text: 'до свого аккаунту'
    },
    submit: 'Зареєструватися',
    success: {
      title: 'Успіх!',
      description: 'Акаунт успішно створено.'
    },
    error: {
      title: 'Помилка!'
    }
  },
  login: {
    title: 'Увійдіть до свого облікового запису',
    notRegistered: 'Не зареєстровані?',
    signup: {
      button: 'Створіть',
      text: 'акаунт.'
    },
    submit: 'Увійти',
    success: {
      title: 'Успіх!',
      description: 'Успішно авторизовано.'
    },
    error: {
      title: 'Помилка!'
    }
  },
  today: 'Сьогодні',
  yesterday: 'Вчора',
  earlier: 'Раніше',
  create: 'Створити нотатку',
  delete: {
    title: 'Ви впевнені?',
    description: 'Це призведе до видалення вашої нотатки. Ви впевнені, що хочете зробити це?',
    trigger: 'Видалити',
    cancel: 'Відміна',
    confirm: 'Так, видалити'
  },
  logout: {
    title: 'Ви впевнені?',
    description: 'Вас буде виведено із системи.',
    trigger: 'Вийти',
    cancel: 'Відміна',
    confirm: 'Вийти'
  }
}
