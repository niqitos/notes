export default {
  app: {
    name: 'Заметки'
  },
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
      description: 'Аккаунт успешно создан.'
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
      description: 'Авторизация выполнена успешно.'
    }
  },
  success: {
    title: 'Успех!'
  },
  error: {
    title: 'Ошибка!',
    500: 'Что-то пошло не так 😒'
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
