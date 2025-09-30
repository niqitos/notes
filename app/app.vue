<template>
  <UApp :locale="locales[locale]">
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'

const { locale } = useI18n()

const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark'
  ? useCssVar('--ui-color-neutral-900').value
  : useCssVar('--ui-color-white').value
)

useHead({
  htmlAttrs: {
    lang: locale.value
  },
  meta: [
    {
      name: 'theme-color',
      content: color
    }
  ]
})
</script>
