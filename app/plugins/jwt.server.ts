import jwt from 'jsonwebtoken'

export default defineNuxtPlugin((nuxtApp) => ({
  provide: {
    verifyJwtToken: (token, secret, options) => {
      return jwt.verify(token, secret, options)
    }
  }
}))
