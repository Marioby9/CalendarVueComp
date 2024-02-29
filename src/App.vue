<script setup lang="ts">
import Calendar from './components/CalendarComp.vue';
import { ref } from 'vue'

//

const date = new Date()

const currentMonth = ref(date.getMonth())
const currentYear = ref(date.getFullYear())

//

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

//

const prevMonth = () => {
    if(currentMonth.value == 0){
        currentYear.value--
        currentMonth.value = 11
    }
    else{
        currentMonth.value--
    }
}
const nextMonth = () => {
    
    if(currentMonth.value == 11){
        currentYear.value++
        currentMonth.value = 0
    }
    else{
        currentMonth.value++
    }
}


</script>
<template>
    <div class="w-fullflex flex-col px-5 ">
        <p class="text-center text-3xl py-3">Calendario Mario Martín</p>
    </div>
    <div class="flex flex-col p-5 gap-5">
        <div class="flex items-center justify-between gap-10 w-[40%] text-2xl bg-lowerGreen px-5 py-2 rounded-md text-darkBlack">
            <p>{{ months[currentMonth] + ', ' + currentYear }}</p>
            <div class="flex gap-5">
                <button class="rounded-full p-2 w-12 hover:bg-lightGreen" @click="prevMonth"><font-awesome-icon icon="fa-chevron-left"/></button>
                <button class="rounded-full p-2 w-12 hover:bg-lightGreen" @click="nextMonth"><font-awesome-icon icon="fa-chevron-right"/></button>
            </div>
        </div>
        <Calendar :month="currentMonth" :year="currentYear" />
    </div>
    
</template>

<style>

</style>