<template>
    <div class="w-96 h-96" >
        <v-bar-chart/>
    </div>
    <div class="border-4 border-dashed border-gray-200 rounded-lg h-96" >
        Home
    </div>
</template>
<script setup>
import { Bar } from 'vue-chartjs'
import {onMounted} from 'vue'
import useInformations from '../../composables/informations'
const { informations, getInformations } = useInformations()

onMounted(getInformations)

</script>