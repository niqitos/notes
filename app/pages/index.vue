<template>
  <div class="flex max-h-dhv h-dvh overflow-clip">
    <div
      ref="drawerRef"
      :class="[
        'p-4 flex-col overflow-scroll max-h-dhv h-dvh absolute md:relative transition-all bg-default z-100 shadow-md md:shadow-sm dark:shadow-gray-500',
        drawerOpen ? 'block md:flex w-full md:w-[338px]' : 'hidden w-0'
      ]"
    >
      <div class="flex justify-between -mr-1.5">
        <Logo />

        <UButton
          icon="i-lucide:panel-right-open"
          title="Close drawer"
          color="neutral"
          variant="link"
          :ui="{
            base: 'text-muted hover:text-default cursor-pointer'
          }"
          @click="drawerOpen = false"
        />
      </div>

      <div class="flex-grow">
        <p
          class="text-xs font-bold text-muted mt-12 mb-4"
          v-text="$t('today')"
        />

        <div class="space-y-2">
          <div
            v-for="note in todaysNotes"
            :key="note.id"
            class="p-2 rounded-lg cursor-pointer"
            :class="{
              'bg-primary-500 text-black': note.id === selectedNote.id,
              'text-default hover:bg-primary-500/50 hover:text-black': note.id !== selectedNote.id,
            }"
            @click="setNote(note)"
          >
            <h3
              class="text-sm font-bold truncate"
              v-text="getPreview(note.text).substring(0, 50)"
            />

            <div class="leading-none truncate">
              <span
                class="text-xs mr-4"
                v-text="formatTime(note.updatedAt)"
              />

              <span
                v-if="getPreview(note.text).length > 50" c
                lass="text-xs"
                v-text="`... ${getPreview(note.text).substring(50, 100)}`"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <p
          class="text-xs font-bold text-muted mt-12 mb-4"
          v-text="$t('yesterday')"
        />

        <div class="space-y-2">
          <div
            v-for="note in yesterdaysNotes"
            :key="note.id"
            class="p-2 rounded-lg cursor-pointer"
            :class="{
              'bg-primary-500 text-black': note.id === selectedNote.id,
              'text-default hover:bg-primary-500/50 hover:text-black': note.id !== selectedNote.id,
            }"
            @click="setNote(note)"
          >
            <h3
              class="text-sm font-bold truncate"
              v-text="getPreview(note.text).substring(0, 50)"
            />

            <div class="leading-none truncate">
              <span
                class="text-xs mr-4"
                v-text="formatDateTime(note.updatedAt)"
              />

              <span
                v-if="getPreview(note.text).length > 50"
                class="text-xs"
                v-text="`... ${getPreview(note.text).substring(50, 100)}`"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <p
          class="text-xs font-bold text-muted mt-12 mb-4"
          v-text="$t('earlier')"
        />

        <div class="space-y-2">
          <div
            v-for="note in earlierNotes"
            :key="note.id"
            class="p-2 rounded-lg cursor-pointer"
            :class="{
              'bg-primary-500 text-black': note.id === selectedNote.id,
              'text-default hover:bg-primary-500/50 hover:text-black': note.id !== selectedNote.id,
            }"
            @click="setNote(note)"
          >
            <h3
              class="text-sm font-bold truncate"
              v-text="getPreview(note.text).substring(0, 50)"
            />

            <div class="leading-none truncate">
              <span
                class="text-xs mr-4"
                v-text="formatDateTime(note.updatedAt)"
              />

              <span
                v-if="getPreview(note.text).length > 50" class="text-xs"
                v-text="`... ${getPreview(note.text).substring(50, 100)}`"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full flex flex-col max-h-dhv h-dvh relative">
      <div class="flex justify-between w-full items-start py-4 px-2.5 absolute bg-default/75 backdrop-blur z-10">
        <div class="space-x-2">
          <UButton
            :icon="drawerOpen ? 'i-lucide:panel-right-open' : 'i-lucide:panel-right-close'"
            title="Toggle drawer"
            color="neutral"
            variant="link"
            :ui="{
              base: [
                'text-muted hover:text-default cursor-pointer',
                drawerOpen ? ' md:hidden inline-flex' : ''
              ]
            }"
            @click.stop="drawerOpen = !drawerOpen"
          />

          <UButton
            icon="i-lucide:pencil"
            :label="$t('create')"
            color="neutral"
            variant="link"
            :ui="{
              base: 'text-muted hover:text-default cursor-pointer'
            }"
            @click="createNewNote"
          />
        </div>

        <UModal
          v-model:open="deleteModalOpen"
          :title="$t('delete.title')"
          :description="$t('delete.description')"
          :ui="{
            footer: 'justify-end space-x-2'
          }"
        >
          <UButton
            icon="i-lucide:trash"
            :title="$t('delete.trigger')"
            color="neutral"
            variant="link"
            :ui="{
              base: 'text-muted hover:text-default cursor-pointer'
            }"
          />

          <template #footer>
            <UButton
              color="neutral"
              :label="$t('delete.cancel')"
              @click="deleteModalOpen = false"
            />

            <UButton
              color="error"
              icon="i-lucide:trash"
              :label="$t('delete.confirm')"
              @click="deleteNote"
            />
          </template>
        </UModal>
      </div>

      <div class="pt-16 overflow-auto">
        <ClientOnly>
          <TiptapEditor
            :content="updatedNote"
            :label="formatDateTime(selectedNote.updatedAt)"
            @change="($event: any) => {
              debouncedFn($event)
              selectedNote.text = $event
            }"
          />
        </ClientOnly>
      </div>

      <UModal
        v-model:open="logoutModalOpen"
        :title="$t('logout.title')"
        :description="$t('logout.description')"
        :ui="{
          footer: 'justify-end space-x-2'
        }"
      >
        <UButton
          icon="i-lucide:log-out"
          :title="$t('logout.trigger')"
          color="neutral"
          variant="link"
          :ui="{
            base: 'text-muted hover:text-default m-4 cursor-pointer absolute right-0 bottom-0'
          }"
          @click="logoutModalOpen = true"
        />

        <template #footer>
          <UButton
            color="neutral"
            :label="$t('logout.cancel')"
            @click="logoutModalOpen = false"
          />

          <UButton
            color="error"
            icon="i-lucide:log-out"
            :label="$t('logout.confirm')"
            @click="logout"
          />
        </template>
      </UModal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)
const { locale } = useI18n()

const updatedNote = ref<any>('')
const notes = ref<any>([])
const selectedNote = ref<any>({})
const drawerOpen = ref<boolean>(breakpoints.isGreater('md'))
const drawerRef = useTemplateRef<HTMLElement>('drawerRef')
const deleteModalOpen = ref<boolean>(false)
const logoutModalOpen = ref<boolean>(false)

definePageMeta({
  middleware: ['auth']
})

onClickOutside(drawerRef, () => {
  if (breakpoints.isGreater('md') && drawerOpen.value) {
    drawerOpen.value = false
  }
})

const setNote = (note: any) => {
  selectedNote.value = note
  updatedNote.value = note.text
}

const logout = () => {
  const jwtCookie = useCookie('NotesJWT')
  jwtCookie.value = null
  navigateTo('/login')
}

const deleteNote = async () => {
  await $fetch(`/api/notes/${selectedNote.value.id}`, {
    method: 'DELETE',
  })

  const index = notes.value.findIndex((note: any) => note.id === selectedNote.value.id)

  notes.value.splice(index, 1)

  deleteModalOpen.value = false
}

const createNewNote = async () => {
  try {
    const newNote = await $fetch(`/api/notes`, {
      method: 'POST',
    })

    notes.value.unshift(newNote)
    selectedNote.value = notes.value[0]
    updatedNote.value = ''
  } catch (err) {
    console.log(err)
  }
}

const debouncedFn = useDebounceFn(async (text: any) => {
  await updateNote(text)
}, 1000)

const updateNote = async (text: any) => {
  try {
    await $fetch(`/api/notes/${selectedNote.value.id}`, {
      method: 'PATCH',
      body: {
        updatedNote: text
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const formatTime = (date: string) => date
  ? new Date(date).toLocaleTimeString(locale.value, {
    hour: '2-digit',
    minute: '2-digit'
  })
  : ''

const formatDateTime = (date: string) => date
  ? new Date(date).toLocaleDateString(locale.value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
  : ''

const todaysNotes = computed(() => notes.value.filter((note: any) => new Date(note.updatedAt).toDateString() === new Date().toDateString()))

const yesterdaysNotes = computed(() => {
  const yesterday = new Date()

  yesterday.setDate(yesterday.getDate() - 1)

  return notes.value.filter((note: any) => new Date(note.updatedAt).toDateString() === yesterday.toDateString())
})

const earlierNotes = computed(() => {
  const yesterday = new Date()

  yesterday.setDate(yesterday.getDate() - 1)

  return notes.value.filter((note: any) => {
    const noteDate = new Date(note.updatedAt)

    return noteDate < yesterday && noteDate.toDateString() !== yesterday.toDateString()
  })
})

const getPreview: any = (html: string, maxLength: number = 50) => {
  if (!html) return ''

  const div = document.createElement('div')
  div.innerHTML = html.trim()

  const firstEl = div.firstElementChild
  if (!firstEl) return ''

  const text = firstEl.textContent?.trim() || ''

  return text.length > maxLength
    ? text.slice(0, maxLength) + '…'
    : text
}

onMounted(async () => {
  notes.value = await $fetch('/api/notes')
  notes.value.sort((a: any, b: any) => new Date(b.updatedAt) > new Date(a.updatedAt))

  if (notes.value.length > 0) {
    selectedNote.value = notes.value[0]
  } else {
    await createNewNote()
    selectedNote.value = notes.value[0]
  }

  updatedNote.value = selectedNote.value.text
})
</script>
