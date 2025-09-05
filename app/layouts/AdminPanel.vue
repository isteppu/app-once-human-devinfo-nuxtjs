<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '~/store/user'
import Dashboard from './Dashboard.vue'
import DeviationList from './DeviationList.vue'
import DeviationNeeds from './DeviationNeeds.vue'
import DeviationLocations from './DeviationLocations.vue'
import ScenarioList from './ScenarioList.vue'
import VisionalWheels from './VisionalWheels.vue'
import Silos from './Silos.vue'

const userStore = useUserStore()
const isReady = ref(false)

const pages = {
	'dashboard': Dashboard,
	'deviation-list': DeviationList,
	'deviation-needs': DeviationNeeds,
	'deviation-locations': DeviationLocations,
	'scenario-list': ScenarioList,
	'visional-wheels': VisionalWheels,
	'silos': Silos,
}

const currentComponent = computed(() => {
	return pages[userStore.page] || pages['dashboard']
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
