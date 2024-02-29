<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

//

//PASAR COMO PROPS UNA LISTA CON LOS EVENTOS DE ESE DÍA

const events = ['Fiesta', 'Examen', 'Prueba']
const currentEvent = ref(0)

const prevEvent = () => {
    if(currentEvent.value == 0){
        currentEvent.value = events.length-1
    }
    else{
        currentEvent.value--
    }
}
const nextEvent = () => {
    if(currentEvent.value == events.length-1){
        currentEvent.value = 0
    }
    else{
        currentEvent.value++
    }
}

</script>

<template>
    <div class="flex justify-between items-center w-full">
        <button class="rounded-full" @click="prevEvent"><font-awesome-icon icon="fa-chevron-left"/></button>
        <p>{{ events[currentEvent] }}</p>
        <button class="rounded-full" @click="nextEvent"><font-awesome-icon icon="fa-chevron-right"/></button>
    </div>
</template>
  

<style>

</style>
  