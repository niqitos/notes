export default {
  app: 'Notes',
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
      title: 'Success!',
      description: 'Account created successfully.'
    },
    error: {
      title: 'Error!'
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
      title: 'Success!',
      description: 'Logged in successfully.'
    },
    error: {
      title: 'Error!'
    }
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
