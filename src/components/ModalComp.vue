<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

//

interface Props {
  date?:string
}

const props =  defineProps<Props>()

const modal = ref(null)
const emit = defineEmits(['close'])

//

onClickOutside(modal, () => emit('close'))

</script>

<template>
    <div class="modal-bg">
      <div class="modal" ref="modal">
        <h3 class="text-xl">Añade un evento</h3>
        <div class="flex w-full">
            <div class="flex flex-col gap-3 w-1/2">
                <p>Título del evento</p>
                <p>Descripción</p>
            </div>
            <div class="flex flex-col gap-3 w-1/2 text-darkBlack">
                <input type="text" class="w-full rounded-lg px-2">
                <input type="text" class="w-full rounded-lg px-2">
            </div>
        </div>
        <p>Se agregará al día {{ props.date }}</p>
        <div class="flex justify-center gap-16">
            <button @click="emit('close')" >cancelar</button>
            <button>añadir</button>
        </div>

      </div>
    </div>
  </template>
  

<style>

</style>
  