<script setup>
import { ref } from 'vue';

const boxes = [
    { title: "Total Deviations", value: 0, icon: "game-icons:butterfly", desc: "Number of registered deviations" },
    { title: "Total Scenarios", value: 0, icon: "mdi:world", desc: "Number of registered scenarios" },
    { title: "Total Silos", value: 0, icon: "material-symbols:door-open-outline-sharp", desc: "Number of registered silos" },
]
</script>

<template>
    <div  class="w-full h-full relative">
        <div class="flex flex-wrap gap-4 w-full px-5">
            <div class="stats shadow-md w-full bg-cyan-600/20">
                <div v-for="(box, index) in boxes" :key="'dashboard-box' + index"
                    class="stat">
                    <h1 class="stat-title">{{ box.title }}</h1>
                    <h1 class="stat-value">{{ box.value }}</h1>
                    <h1 class="stat-desc">{{ box.desc }}</h1>
                    <span class="stat-figure">
                        <Icon :name="box.icon" class="text-7xl opacity-20" />
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>