<template>
    <div v-if="props.events[0]"
         class="flex justify-between items-center bg-lowGreen rounded-b-md w-full px-2 py-1 font-medium"
         :style="{ backgroundColor: props.events[currentEvent] ? props.events[currentEvent].color : '' }"
         :draggable="true"
         @dragstart="emit('dragStartEvent', props.events[currentEvent].id)"
    >
      <p class="cursor-pointer">{{ showTitle() }}</p>
      <div class="flex gap-4">
        <button class="rounded-full" @click="emit('editEvent', props.events[currentEvent])">
          <font-awesome-icon icon="fa-pen-to-square"/>
        </button>
        <button class="rounded-full" @click="clickDelete(props.events[currentEvent].id)">
          <font-awesome-icon icon="fa-trash"/>
        </button>
        <button v-if="props.events.length > 1" class="rounded-full" @click="nextEvent">
          <font-awesome-icon icon="fa-chevron-right"/>
        </button>
      </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, withDefaults} from 'vue'
import { deleteEvent } from '@/model/axios'
import type Event from '@/interfaces/event'

interface Props {
  events: Array<Event>; // Cambiar a interfaz evento
}

const props = withDefaults(defineProps<Props>(), {
  events: () => []
})

const emit = defineEmits(['editEvent', 'dragStartEvent'])

const currentEvent = ref(0)

const nextEvent = () => {
  if (currentEvent.value == props.events.length - 1) {
    currentEvent.value = 0
  } else {
    currentEvent.value++
  }
}

const showTitle = () => {
  const event = props.events[currentEvent.value]
  return event.title.length > 7 ? event.title.slice(0, 7) + '...' : event.title
}

const clickDelete = async (id: string) => {
  await deleteEvent(id)
  location.reload()
}
</script>

<style>
</style>
