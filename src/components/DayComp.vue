<script setup lang="ts">

interface Props {
  date?:string
}

const props =  defineProps<Props>()
const emit = defineEmits(['addEvent'])

const getDay = () => props.date?.split('/')[0]

</script>

<template>
   <div v-if="props.date" class="flex flex-col gap-5 px-5 min-h-20 rounded-md py-2 font-bold  bg-bone text-darkBlack ">
    <div class="flex h-fit w-full justify-between">
      <p>  {{ getDay() }} </p>
      <button class="rounded-full hover:bg-lowGreen w-7" @click="emit('addEvent', props.date)"><font-awesome-icon icon="fa-plus"/></button>
    </div>
    
   </div>
</template>

<style>

</style>