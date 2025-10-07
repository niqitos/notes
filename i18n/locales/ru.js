export default {
  app: 'Заметки',
  fields: {
    email: {
      label: 'Эл. почта',
      placeholder: 'Введите email',
      invalid: 'Неверный адрес электронной почты'
    },
    password: {
      label: 'Пароль',
      placeholder: 'Введите пароль',
      required: 'Пароль обязательное поле',
      min: 'Должно быть не менее 8 символов.'
    }
  },
  register: {
    title: 'Зарегистрируйте бесплатную учетную запись',
    already: 'Уже зарегистрированы?',
    login: {
      button: 'Войти',
      text: 'в свой аккаунт'
    },
    submit: 'Зарегистрироваться',
    success: {
      title: 'Успех!',
      description: 'Аккаунт успешно создан.'
    },
    error: {
      title: 'Ошибка!'
    }
  },
  login: {
    title: 'Войдите в свою учетную запись',
    notRegistered: 'Не зарегистрированы?',
    signup: {
      button: 'Создайте',
      text: 'аккаунт.'
    },
    submit: 'Войти',
    success: {
      title: 'Успех!',
      description: 'Авторизация выполнена успешно.'
    },
    error: {
      title: 'Ошибка!'
    }
  },
  today: 'Сегодня',
  yesterday: 'Вчера',
  earlier: 'Ранее',
  create: 'Создать заметку',
  delete: {
    title: 'Вы уверены?',
    description: 'Это приведет к безвозвратному удалению вашей заметки. Вы уверены, что хотите это сделать?',
    trigger: 'Удалить',
    cancel: 'Отмена',
    confirm: 'Да, удалить'
  },
  logout: {
    title: 'Вы уверены?',
    description: 'Вы будете выведены из системы.',
    trigger: 'Выйти',
    cancel: 'Отмена',
    confirm: 'Выйти'
  }
}
