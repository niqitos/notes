<template>
  <div class="flex bg-default md:bg-elevated h-dvh">
    <div class="bg-default w-[516px] mx-auto md:mx-0 p-4 sm:p-12 flex flex-col justify-center">
      <Logo class="mb-6" />

      <UAuthForm
        :schema="schema"
        title="Log in to your account"
        :fields="fields"
        :ui="{
          header: 'text-left',
          description: 'text-muted text-sm mt-0.5'
        }"
        @submit="submit"
      >
        <template #description>
          Don't have an account?

          <NuxtLink to="/register" class="font-bold text-primary-500 underline">Sign Up</NuxtLink>

          for one.
        </template>

        <template #submit>
          <UButton
            trailing-icon="i-lucide:arrow-right"
            label="Log in"
            type="submit"
            :loading="loading"
            size="xl"
            :ui="{
              base: 'text-black w-full mt-6 rounded-full text-sm font-bold flex justify-center items-center cursor-pointer',
              trailingIcon: 'size-5'
            }"
          />
        </template>
      </UAuthForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'

const toast = useToast()

const fields: AuthFormField[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    size: 'xl',
    required: true
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    size: 'xl',
    required: true
  }
]

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string('Password is required').min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const loading = ref<boolean>(false)

const submit = async (payload: FormSubmitEvent<Schema>) => {
  console.log(payload.data)
  loading.value = true

  try {
    await $fetch('/api/login', {
      method: 'POST',
      body: {
        email: payload.data.email,
        password: payload.data.password
      }
    })

    toast.add({
      title: 'Success!',
      description: 'Logged in successfully.',
      icon: 'i-lucide:circle-check',
      color: 'success',
      duration: 3000
    })

    loading.value = false

    navigateTo('/')
  } catch (error: any) {
    loading.value = false

    toast.add({
      title: 'Error!',
      description: error.response?._data?.message,
      icon: 'i-lucide:circle-check',
      color: 'error',
      duration: 3000
    })
  }
}
</script>
