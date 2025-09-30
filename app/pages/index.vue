<template>
  <div class="flex h-dvh">
    <div
      ref="drawerRef"
      :class="[
        'p-4 flex-col overflow-scroll h-dvh absolute md:relative transition-all bg-default z-10 shadow-md md:shadow-sm',
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
          v-text="'Today'"
        />

        <div class="ml-2 space-y-2">
          <div
            v-for="note in todaysNotes"
            class="p-2 rounded-lg cursor-pointer"
            :class="{
              'bg-primary-500 text-inverted': note.id === selectedNote.id,
              'text-default hover:bg-primary-500/50 hover:text-inverted': note.id !== selectedNote.id,
            }"
            @click="setNote(note)"
          >
            <h3
              class="text-sm font-bold truncate"
              v-text="note.text.substring(0, 50)"
            />

            <div class="leading-none truncate">
              <span
                class="text-xs mr-4"
                v-text="formatTime(note.updatedAt)"
              />

              <span
                v-if="note.text.length > 50" c
                lass="text-xs"
                v-text="`... ${note.text.substring(50, 100)}`"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <p
          class="text-xs font-bold text-muted mt-12 mb-4"
          v-text="'Yesterday'"
        />

        <div class="ml-2 space-y-2">
          <div
            v-for="note in yesterdaysNotes"
            class="p-2 rounded-lg cursor-pointer"
            :class="{
              'bg-primary-500 text-inverted': note.id === selectedNote.id,
              'text-default hover:bg-primary-500/50 hover:text-inverted': note.id !== selectedNote.id,
            }"
            @click="setNote(note)"
          >
            <h3
              class="text-sm font-bold text-inverted truncate"
              v-text="note.text.substring(0, 50)"
            />

            <div class="leading-none truncate text-inverted">
              <span
                class="text-xs text-inverted mr-4"
                v-text="formatDateTime(note.updatedAt)"
              />

              <span
                v-if="note.text.length > 50"
                class="text-xs text-inverted"
                v-text="`... ${note.text.substring(50, 100)}`"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <p
          class="text-xs font-bold text-muted mt-12 mb-4"
          v-text="'Earlier'"
        />

        <div class="ml-2 space-y-2">
          <div
            v-for="note in earlierNotes"
            class="p-2 rounded-lg cursor-pointer"
            :class="{
              'bg-primary-500 text-inverted': note.id === selectedNote.id,
              'text-default hover:bg-primary-500/50 hover:text-inverted': note.id !== selectedNote.id,
            }"
            @click="setNote(note)"
          >
            <h3
              class="text-sm font-bold text-inverted truncate"
              v-text="note.text.substring(0, 50)"
            />

            <div class="leading-none truncate text-inverted">
              <span
                class="text-xs text-inverted mr-4"
                v-text="formatDateTime(note.updatedAt)"
              />

              <span
                v-if="note.text.length > 50" class="text-xs text-inverted"
                v-text="`... ${note.text.substring(50, 100)}`"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full flex flex-col">
      <div class="flex justify-between w-full items-start py-4 px-2.5">
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
            @click="drawerOpen = !drawerOpen"
          />

          <UButton
            icon="i-lucide:pencil"
            label="Create Note"
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
          title="Are you sure?"
          description="This will delete your note permanently, are you extra sure you like to do this?"
          :ui="{
            footer: 'justify-end space-x-2'
          }"
        >
          <UButton
            icon="i-lucide:trash"
            title="Delete"
            color="neutral"
            variant="link"
            :ui="{
              base: 'text-muted hover:text-default cursor-pointer'
            }"
          />

          <template #footer>
            <UButton
              color="neutral"
              label="Cancel"
              @click="deleteModalOpen = false"
            />

            <UButton
              color="error"
              icon="i-lucide:trash"
              label="Yes, delete"
              @click="deleteNote"
            />
          </template>
        </UModal>
      </div>

      <div class="max-w-[437px] mx-auto w-full flex-grow flex flex-col p-4">
        <p
          class="text-muted font-playfair"
          v-text="formatDateTime(selectedNote.updatedAt)"
        />

        <textarea
          ref="textarea"
          v-model="updatedNote"
          name="note"
          id="note"
          class="text-default my-4 font-playfair w-full bg-transparent transition focus:outline-none resize-none flex-grow"
          @input="() => {
            debouncedFn()
            selectedNote.text = updatedNote
          }"
        />
      </div>

      <UModal
        v-model:open="logoutModalOpen"
        title="Are you sure?"
        description="You will be logged out."
        :ui="{
          footer: 'justify-end space-x-2'
        }"
      >
        <UButton
          icon="i-lucide:log-out"
          title="Logout"
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
            label="Cancel"
            @click="logoutModalOpen = false"
          />

          <UButton
            color="error"
            icon="i-lucide:log-out"
            label="Logout"
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

const updatedNote = ref<any>('')
const notes = ref<any>([])
const selectedNote = ref<any>({})
const textarea = ref<any>(null)
const drawerOpen = ref<boolean>(breakpoints.greater('md').value)
const drawerRef = useTemplateRef<HTMLElement>('drawerRef')
const deleteModalOpen = ref<boolean>(false)
const logoutModalOpen = ref<boolean>(false)

definePageMeta({
  middleware: ['auth']
})

onClickOutside(drawerRef, event => {
  if (breakpoints.smaller('md').value) {
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
    textarea.value.focus()
  } catch (err) {
    console.log(err)
  }
}

const debouncedFn = useDebounceFn(async () => {
  await updateNote()
}, 1000)

const updateNote = async () => {
  try {
    await $fetch(`/api/notes/${selectedNote.value.id}`, {
      method: 'PATCH',
      body: {
        updatedNote: updatedNote.value
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const formatTime = (date: string) => date
  ? new Date(date).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })
  : ''

const formatDateTime = (date: string) => date
  ? new Date(date).toLocaleDateString([], {
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

  textarea.value.focus()
})
</script>
