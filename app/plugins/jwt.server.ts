import jwt from 'jsonwebtoken'

export default defineNuxtPlugin(() => ({
  provide: {
    verifyJwtToken: (token: any, secret: any, options: any) => {
      return jwt.verify(token, secret, options)
    }
  }
}))
