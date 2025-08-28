<script setup>
import { ref } from 'vue';

const boxes = [
    { title: "Total Deviations", value: 0, icon: "game-icons:butterfly", color: "bg-green-800" },
    { title: "Total Scenarios", value: 0, icon: "mdi:world", color: "bg-yellow-800" },
    { title: "Total Silos", value: 0, icon: "material-symbols:door-open-outline-sharp", color: "bg-blue-800" },
]
</script>

<template>
    <div data-aos="slide-up" class="w-full h-full">
        <div class="flex flex-wrap gap-4 w-full px-5">
            <div v-for="(box, index) in boxes" :key="'dashboard-box' + index"
                class="relative items-center p-5 m-2 rounded-lg shadow-lg overflow-hidden h-[150px] w-[320px] justify-center" :class="box.color">
                <h1 class="text-lg font-thin">{{ box.title }}</h1>
                <h1 class="mt-2 text-4xl font-extrabold">{{ box.value }}</h1>
                <span class="absolute top-0 right-0 mr-2 mt-2">
                    <Icon :name="box.icon" class="text-7xl opacity-20" />
                </span>

            </div>
        </div>
    </div>
</template>

<style scoped></style>