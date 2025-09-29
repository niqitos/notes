<template>
  <div class="flex bg-black md:bg-zinc-900 h-screen">
    <div class="bg-black w-[516px] mx-auto md:mx-0 p-12 flex flex-col justify-center">
      <Logo />

      <h1 class="text-white font-bold text-lg mt-8">
        Log in to your account
      </h1>

      <p class="text-zinc-300 text-sm mt-0.5">
        Don't have an account?

        <NuxtLink to="/register" class="font-bold text-primary-500 underline">Sign Up</NuxtLink>

        for one.
      </p>

      <form @submit.prevent="submit">
        <div class="mt-8">
          <label for="" class="text-zinc-300 text-sm block mb-0.5">
            Email Address
          </label>

          <input
            v-model="email"
            placeholder="you@example.com"
            type="email"
            class="block w-full bg-[#27272A] border border-[#3F3F46] rounded text-white px-4 py-2 placeholder:text-zinc-500 text-sm"
          />
        </div>

        <div class="mt-6">
          <label for="" class="text-zinc-300 text-sm block mb-0.5">
            Password
          </label>

          <input
            v-model="password"
            placeholder="****************"
            type="password"
            class="block w-full bg-[#27272A] border border-[#3F3F46] rounded text-white px-4 py-2 placeholder:text-zinc-500 text-sm"
          />
        </div>

        <button class="w-full mt-6 bg-primary-500 rounded-full px-4 py-2 text-sm font-bold flex justify-center items-center space-x-2">
          <span>Log in</span>

          <ArrowRight />
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swal from 'sweetalert2'

const email = ref<string>('')
const password = ref<string>('')

const submit = async () => {
  try {
    const response = await $fetch('/api/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
      },
    })

    const { isConfirmed } = await Swal.fire({
      title: 'Success!',
      text: 'Logged in successfully.',
      icon: 'success',
      confirmButtonText: 'Close',
    })

    if (isConfirmed) {
      navigateTo('/')
    }
  } catch (error) {
    console.log('ERROR:')
    console.log(error)
    console.log(error.response?._data?.message)
    Swal.fire({
      title: 'Error!',
      text: error.response?._data?.message,
      icon: 'error',
      confirmButtonText: 'Close',
    })
  }
}
</script>
