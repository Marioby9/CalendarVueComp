<template>
  <div class="flex flex-col gap-2 rounded-md text-lg">
    <div class="grid grid-cols-7 gap-3 text-center">
      <div class="bg-green p-3 rounded-md" v-for="c in cols" :key="c">{{ c }}</div>
    </div>
    <div v-for="i in props.ROWS" :key="i" class="grid grid-cols-7 gap-3 text-center">
      <div v-for="(c, j) in cols" :key="c">
        <Day
          @addEvent="addEvent"
          @editEvent="editEvent"
          @showEvent="showEvent"
          @dragStartEvent="dragStart"
          @dropEvent="dropEvent"
          :date="monthTable[i - 1][j]"
        />
      </div>
    </div>
  </div>

  <ModalComp
    :state="modalState"
    :currentEvent="modalEventEditing"
    :date="modalDate"
    v-if="isModalOpen"
    @close="isModalOpen = false"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Day from '@/components/DayComp.vue'
import ModalComp from '@/components/ModalComp.vue'
import type Event from '@/interfaces/event'
import { modifyDate } from '@/model/axios'

interface Props {
  month?: number
  year?: number
  cols?: string[]
  COLS?: number
  ROWS?: number
}

const props = withDefaults(defineProps<Props>(), {
  cols: () => ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
  COLS: 7,
  ROWS: 6,
  month: 1,
  year: 2000,
})

// Convertimos el número de orden del día en filas y columnas
const addSecuencialValue = (num: number, value: string, celdas: string[][]) => {
  const row = Math.floor(num / props.COLS)
  const column = num % props.COLS
  celdas[row][column] = value
}

const monthTable = computed(() => {
  const celdas = Array.from(Array(props.COLS).keys()).map(() =>
    Array.from(Array(props.ROWS).keys()).map(() => '')
  )

  const firstDay = new Date(props.year, props.month, 1) // Ajuste para meses de 0 a 11
  const firstDayPosition = [6, 0, 1, 2, 3, 4, 5][firstDay.getDay()]
  const monthDays = new Date(props.year, props.month + 1, 0).getDate() // Ajuste para meses de 0 a 11
  const numberRange = [...Array(monthDays).keys()].map((i) => i + firstDayPosition)
  // Recorremos el rango de números para añadir la fecha
  numberRange.map((el, ind) =>
    addSecuencialValue(el, `${ind + 1}/${props.month + 1}/${props.year}`, celdas)
  ) // Ajuste para meses de 0 a 11
  return celdas
})

// MODALS
const isModalOpen = ref<boolean>(false)
const modalDate = ref<string>('')
const modalState = ref<string>('add')
const modalEventEditing = ref<Event | null>(null)

const openModal = (date: string) => {
  isModalOpen.value = true
  modalDate.value = date
}

const addEvent = (date: string) => {
  modalState.value = 'add'
  modalEventEditing.value = null
  openModal(date)
}

const editEvent = (event: Event) => {
  modalState.value = 'edit'
  modalEventEditing.value = event
  openModal(event.date)
}

const showEvent = (event: Event) => {
  modalState.value = 'show'
  modalEventEditing.value = event
  openModal(event.date)
}

// DRAG AND DROP

const draggedEvent = ref<string>('')
const droppedDay = ref<string>('')

const dragStart = (id: string) => {
  draggedEvent.value = id
  console.log(draggedEvent.value)
}

const dropEvent = (date: string) => {
  droppedDay.value = date
  modifyDate(draggedEvent.value, droppedDay.value)
  location.reload()
}

</script>

<style>
  /* Tus estilos aquí */
</style>
