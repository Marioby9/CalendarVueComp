<template>
  <div v-if="props.date" class="flex flex-col gap-2 min-h-20 rounded-md font-bold bg-bone text-darkBlack"
       @dragover.prevent
       @drop="emit('dropEvent', props.date)"
  >
   <div class="flex h-fit px-2 py-1 w-full justify-between">
     <p 
       class="p-2 rounded-full w-11"
       :class="currentDateFormatted === props.date ? 'bg-blue' : ''"
     >  
       {{ getDay() }} 
     </p>
     <button class="rounded-full hover:bg-lowGreen w-11" @click="emit('addEvent', props.date)">
       <font-awesome-icon icon="fa-plus"/>
     </button>
   </div>
   <EventsComp 
     @editEvent="editEvent"
     @showEvent="showEvent"
     @dragStartEvent="dragStart" 
     :events="events.filter(elm => elm.date === props.date)" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getEvents } from '@/model/axios'
import EventsComp from '@/components/EventsComp.vue'
import type Event from '@/interfaces/event'

const events = ref<Event[]>([])

const props = defineProps<{
 date?: string;
}>()

const emit = defineEmits(['addEvent', 'editEvent', 'showEvent', 'dragStartEvent', 'dropEvent'])

const getDay = () => props.date?.split('/')[0]

function getFormattedDate() {
 const currentDate = new Date()
 const month = currentDate.getMonth() + 1 // Months are zero based
 const day = currentDate.getDate()
 const year = currentDate.getFullYear()

 // d/m/YYYY
 const formattedDate = `${day}/${month}/${year}`

 return formattedDate
}

const currentDateFormatted = getFormattedDate()

const editEvent = (event: Event) => {
 emit('editEvent', event)
}

const showEvent = (event: Event) => {
 emit('showEvent', event)
}

onMounted(async () => {
   const response = await getEvents()
   events.value = response
})

// DRAG AND DROP

const dragStart = (id: string) => {
 emit('dragStartEvent', id)
}
</script>

<style>
</style>
