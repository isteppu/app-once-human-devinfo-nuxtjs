<script setup>
import { ref, onMounted, computed } from 'vue';
import { useUserStore } from '../../../store/user';
import Sidebar from '../components/Sidebar.vue';
import Dashboard from './sections/Dashboard.vue';
import DeviationList from './sections/DeviationList.vue';
import DeviationNeeds from './sections/DeviationNeeds.vue';
import DeviationTypes from './sections/DeviationTypes.vue';
import ScenarioList from './sections/ScenarioList.vue';
import VisionalWheels from './sections/VisionalWheels.vue';
import Silos from './sections/Silos.vue';

const userStore = useUserStore();
const currentComponent = computed(() => {
    return pages[userStore.page] || pages["dashboard"]
})
const pages = {
    "dashboard": Dashboard,
    "deviation-list": DeviationList,
    "deviation-needs": DeviationNeeds,
    "deviation-types": DeviationTypes,
    "scenario-list": ScenarioList,
    "visional-wheels": VisionalWheels,
    "silos": Silos,
};

useHead({
    title: 'OH Portal Backoffice',
})

</script>

<template>
    <Sidebar />
    <div class="pl-5 pr-5 py-10 md:pl-72 h-screen">
        <div data-aos="fade-up" class="bg-none md:bg-[#05373E] h-full w-full rounded-3xl p-5">
            <component :is="currentComponent" />
        </div>
    </div>
</template>