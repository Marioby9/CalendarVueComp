<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { saveEvent, modifyEvent } from '@/model/axios'
import type Event from '@/interfaces/event'

interface Props {
  state: string,
  date?: string,
  currentEvent?: Event | null
}

const props = defineProps<Props>()
const emit = defineEmits(['close'])

const modal = ref<HTMLElement|null>(null)

const colors: string[] = ['#fbf550', '#61bc84', '#4e88ca', '#ff6a00', '#ff78d2' ]

const title = ref<string>('')
const description = ref<string>('')
const startTime = ref<string>('')
const selectedColor = ref<string>(colors[0])

const isError = ref<boolean>(false)

const addEvent = async () => {
  if (title.value && description.value && startTime.value) {
    const event = {
      title: title.value,
      description: description.value,
      date: props.date,
      startTime: startTime.value,
      color: selectedColor.value
    }

    const added = await saveEvent(event)
    added ? emit('close') : isError.value = false
    location.reload()
  } else {
    isError.value = true
  }
}

const editEvent = async () => {
  if (title.value !== '' && description.value !== '' && startTime.value) {
    const event = {
      id: props.currentEvent?.id,
      title: title.value,
      description: description.value,
      date: props.date,
      startTime: startTime.value,
      color: selectedColor.value
    }

    const edited = await modifyEvent(event)
    edited ? emit('close') : isError.value = false
    location.reload()
  } else {
    isError.value = true
  }
}

const fillFields = () => {
  if (props.currentEvent) {
    title.value = props.currentEvent.title
    description.value = props.currentEvent.description
    startTime.value = props.currentEvent.startTime
    selectedColor.value = props.currentEvent.color
  }
}

onClickOutside(modal, () => emit('close'))

onMounted(() => {
  fillFields()
})

</script>

<template>
    <div class="modal-bg">
      <div class="modal" ref="modal">
        <h3 class="text-2xl" v-if="props.state === 'add'">Añade un evento</h3>
        <h3 class="text-2xl" v-else-if="props.state === 'edit'">Edita un evento</h3>
        <h3 class="text-2xl" v-else>Visualizar evento</h3>
        <div class="flex w-full">
            <div class="flex flex-col gap-6 w-1/2">
                <p>Título del evento</p>
                <p>Descripción</p>
                <p>Hora del Evento</p>
                <p>Color</p>
            </div>
            <div class="flex flex-col gap-6 w-1/2 text-white" v-if="props.state=='show'">
                <p>{{ props.currentEvent?.title }}</p>
                <p>{{ props.currentEvent?.description }}</p>
                <p>{{ props.currentEvent?.startTime }}</p>
                <div class="w-full flex items-center h-fit justify-between">
                  <div v-for="(col, indx) in colors" :key="indx" 
                    class="p-3 rounded-full cursor-pointer border-4 " 
                    :class="[selectedColor === col ? ' border-white' : 'border-black']"
                    :style="{ backgroundColor: col }"
                    >
                  </div>
                </div>
            </div>
            <div class="flex flex-col gap-6 w-1/2 text-darkBlack" v-else >
                <input type="text" class="w-full rounded-lg px-2" v-model="title">
                <input type="text" class="w-full rounded-lg px-2" v-model="description">
                <input type="time" class="w-full rounded-lg px-2" v-model="startTime">
                <div class="w-full flex items-center h-fit justify-between">
                  <div v-for="(col, indx) in colors" :key="indx" 
                    class="p-3 rounded-full cursor-pointer border-4 " 
                    :class="[selectedColor === col ? ' border-white' : 'border-black']"
                    :style="{ backgroundColor: col }"
                    @click="selectedColor = col"
                    >
                  </div>
                </div>
            </div>
            
        </div>
        <p>Se agregará al día {{ props.date }}</p>
        <p v-if="isError" class="underline">Error. Hay campos incompletos</p>
        <div class="flex justify-center gap-16">
            <button @click="emit('close')">cancelar</button>
            <button @click="addEvent" v-if="props.state === 'add'">añadir</button>
            <button @click="editEvent" v-if="props.state === 'edit'">guardar</button>
        </div>

      </div>
    </div>
  </template>
  

<style>
</style>
