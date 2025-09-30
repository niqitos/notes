import bcrypt from 'bcryptjs'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import prisma from '@@/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    if (!validator.isEmail(body.email)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid email, please change.',
      })
    }

    if (
      !validator.isStrongPassword(body.password, {
        minLength: 8,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
      })
    ) {
      throw createError({
        statusCode: 400,
        message: 'Password is not minimum 8 characters, please change.',
      })
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(body.password, salt)

    // Sends to database
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: passwordHash,
        salt: salt,
      },
    })

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)

    setCookie(event, 'NotesJWT', token)

    return { data: 'success!' }
  } catch (error) {
    console.log(error.code)

    if (error.code === 'P2002') {
      throw createError({
        statusCode: 409,
        message: 'An email with this address already exists.',
      })
    }

    throw error
  }
})
