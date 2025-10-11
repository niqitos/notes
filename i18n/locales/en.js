export default {
  app: {
    name: 'Notes'
  },
  fields: {
    email: {
      label: 'Email',
      placeholder: 'Enter your email',
      invalid: 'Invalid email'
    },
    password: {
      label: 'Password',
      placeholder: 'Enter your password',
      required: 'Password is required',
      min: 'Must be at least 8 characters'
    }
  },
  register: {
    title: 'Sign up for a free account',
    already: 'Already registered?',
    login: {
      button: 'Log in',
      text: 'to your account'
    },
    submit: 'Sign Up',
    success: {
      description: 'Account created successfully.'
    }
  },
  login: {
    title: 'Log in to your account',
    notRegistered: 'Don\'t have an account?',
    signup: {
      button: 'Sign Up',
      text: 'for one.'
    },
    submit: 'Log in',
    success: {
      description: 'Logged in successfully.'
    }
  },
  success: {
    title: 'Success!'
  },
  error: {
    title: 'Error!',
    500: 'Something went wrong 😒'
  },
  today: 'Today',
  yesterday: 'Yesterday',
  earlier: 'Earlier',
  create: 'Create Note',
  delete: {
    title: 'Are you sure?',
    description: 'This will delete your note permanently, are you extra sure you like to do this?',
    trigger: 'Delete',
    cancel: 'Cancel',
    confirm: 'Yes, delete'
  },
  logout: {
    title: 'Are you sure?',
    description: 'You will be logged out.',
    trigger: 'Logout',
    cancel: 'Cancel',
    confirm: 'Logout'
  }
}
