<template>
  <div class="flex bg-zinc-900 h-screen">
    <div
      ref="drawerRef"
      :class="[
        'bg-black p-4 flex flex-col overflow-scroll h-screen absolute md:relative transition-all',
        drawerOpen ? 'w-[338px]' : '',
        {
          'hidden': !drawerOpen
        }
      ]"
    >
      <div class="flex justify-between">
        <Logo />
        <button
          class="text-gray-500 hover:text-white transition md:hidden"
          @click="drawerOpen = !drawerOpen"
        >
          <DrawerClose />
        </button>
      </div>

      <div class="flex-grow">
        <p class="text-xs font-bold text-[#C2C2C5] mt-12 mb-4">
          Today
        </p>

        <div class="ml-2 space-y-2">
          <div
            v-for="note in todaysNotes"
            class="p-2 rounded-lg cursor-pointer"
            :class="{
              'bg-primary-400': note.id === selectedNote.id,
              'hover:bg-primary-400/50': note.id !== selectedNote.id,
            }"
            @click="setNote(note)"
          >
            <h3 class="text-sm font-bold text-[#F4F4F5] truncate">
              {{ note.text.substring(0, 50) }}
            </h3>

            <div class="leading-none truncate text-[#D6D6D6]">
              <span class="text-xs text-[#F4F4F5] mr-4">
                {{ formatTime(note.updatedAt) }}
              </span>

              <span v-if="note.text.length > 50" class="text-xs text-[#D6D6D6]">
                ... {{ note.text.substring(50, 100) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <p class="text-xs font-bold text-[#C2C2C5] mt-12 mb-4">
          Yesterday
        </p>

        <div class="ml-2 space-y-2">
          <div
            v-for="note in yesterdaysNotes"
            class="p-2 rounded-lg cursor-pointer"
            :class="{
              'bg-primary-400': note.id === selectedNote.id,
              'hover:bg-primary-400/50': note.id !== selectedNote.id,
            }"
            @click="setNote(note)"
          >
            <h3 class="text-sm font-bold text-[#F4F4F5] truncate">
              {{ note.text.substring(0, 50) }}
            </h3>

            <div class="leading-none truncate text-[#D6D6D6]">
              <span class="text-xs text-[#F4F4F5] mr-4">
                {{ formatDateTime(note.updatedAt) }}
              </span>

              <span v-if="note.text.length > 50" class="text-xs text-[#D6D6D6]">
                ... {{ note.text.substring(50, 100) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <p class="text-xs font-bold text-[#C2C2C5] mt-12 mb-4">
          Earlier
        </p>

        <div class="ml-2 space-y-2">
          <div
            v-for="note in earlierNotes"
            class="p-2 rounded-lg cursor-pointer"
            :class="{
              'bg-primary-400': note.id === selectedNote.id,
              'hover:bg-primary-400/50': note.id !== selectedNote.id,
            }"
            @click="setNote(note)"
          >
            <h3 class="text-sm font-bold text-[#F4F4F5] truncate">
              {{ note.text.substring(0, 50) }}
            </h3>

            <div class="leading-none truncate text-[#D6D6D6]">
              <span class="text-xs text-[#F4F4F5] mr-4">
                {{ formatDateTime(note.updatedAt) }}
              </span>

              <span v-if="note.text.length > 50" class="text-xs text-[#D6D6D6]">
                ... {{ note.text.substring(50, 100) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full flex flex-col">
      <div class="flex justify-between w-full items-start">
        <div class="p-4 space-x-2">
          <button
            class="text-gray-500 hover:text-white transition"
            @click="drawerOpen = !drawerOpen"
          >
            <DrawerClose v-if="drawerOpen" />
            <DrawerOpen v-else />
          </button>

          <button
            class="inline-flex items-center text-xs text-gray-500 hover:text-white transition font-bold space-x-2"
            @click="createNewNote"
          >
            <Pencil />

            <span>Create Note</span>
          </button>
        </div>

        <button class="text-gray-500 hover:text-white transition p-4">
          <TrashIcon
            @click="deleteNote"
          />
        </button>
      </div>

      <div class="max-w-[437px] mx-auto w-full flex-grow flex flex-col">
        <p class="text-gray-500 font-playfair">
          {{ formatDateTime(selectedNote.updatedAt) }}
        </p>

        <textarea
          ref="textarea"
          v-model="updatedNote"
          name="note"
          id="note"
          class="text-white my-4 font-playfair w-full bg-transparent transition focus:outline-none resize-none flex-grow"
          @input="() => {
            debouncedFn()
            selectedNote.text = updatedNote
          }"
        />
      </div>

      <button
        class="text-gray-500 hover:text-white transition absolute right-0 bottom-0 p-4"
        @click="logout"
      >
        <Logout />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'
import Swal from 'sweetalert2'

const breakpoints = useBreakpoints(breakpointsTailwind)

const updatedNote = ref<any>('')
const notes = ref<any>([])
const selectedNote = ref<any>({})
const textarea = ref<any>(null)
const drawerOpen = ref<boolean>(breakpoints.greater('md').value)
const drawerRef = useTemplateRef<HTMLElement>('drawerRef')

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
  const { isConfirmed } = await Swal.fire({
    title: 'Are you sure?',
    text: 'This will delete your note permanently, are you extra sure you like to do this?',
    icon: 'warning',
    confirmButtonText: 'Yes, delete',
    showCancelButton: true
  })

  if (isConfirmed) {
    // truly delete
    await $fetch(`/api/notes/${selectedNote.value.id}`, {
      method: 'DELETE',
    })

    const index = notes.value.findIndex((note: any) => {
      return note.id === selectedNote.value.id
    })
    console.log(index)
    notes.value.splice(index, 1)
  }
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
