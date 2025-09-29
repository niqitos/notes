export default defineNuxtRouteMiddleware(async (event) => {
  if (import.meta.client) return

  const { $verifyJwtToken } = useNuxtApp()

  console.log('middleware fired')
  const jwt = useCookie('NotesJWT')
  console.log(jwt.value)

  if (!jwt.value) {
    return navigateTo('/register')
  }

  try {
    await $verifyJwtToken(jwt.value, process.env.JWT_SECRET)
  } catch (error) {
    console.log(error)
    return navigateTo('/register')
  }
})
