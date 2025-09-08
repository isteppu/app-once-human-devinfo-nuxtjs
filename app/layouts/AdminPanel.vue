<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '~/store/user'
import Dashboard from './Dashboard.vue'
import BackOfficeDeviationList from './BackOfficeDeviationList.vue'
import BackOfficeDeviationNeeds from './BackOfficeDeviationNeeds.vue'
import BackOfficeDeviationLocations from './BackOfficeDeviationLocations.vue'
import BackOfficeScenarioList from './BackOfficeScenarioList.vue'
import BackOfficeVisionalWheels from './BackOfficeVisionalWheels.vue'
import BackOfficeSilos from './BackOfficeSilos.vue'

const userStore = useUserStore()
const isReady = ref(false)

const pages = {
	'dashboard': Dashboard,
	'deviation-list': BackOfficeDeviationList,
	'deviation-needs': BackOfficeDeviationNeeds,
	'deviation-locations': BackOfficeDeviationLocations,
	'scenario-list': BackOfficeScenarioList,
	'visional-wheels': BackOfficeVisionalWheels,
	'silos': BackOfficeSilos,
}

const currentComponent = computed(() => {
	return pages[userStore.menu] || pages['dashboard']
})

onMounted(() => {
	isReady.value = true
})
</script>

<template>
	<BackofficeSidebar />
	<div class="pl-5 pr-5 py-10 md:pl-72 h-screen">
		<div class="bg-none md:bg-[#05373E] h-full w-full rounded-3xl p-5">
			<component v-if="isReady" data-aos="fade-left" :is="currentComponent" />
		</div>
	</div>
</template>
