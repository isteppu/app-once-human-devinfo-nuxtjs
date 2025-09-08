<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMainStore } from '~/store/user'
import DeviationList from './DeviationList.vue'
import DeviationNeeds from './DeviationNeeds.vue'
import DeviationLocations from './DeviationLocations.vue'

const mainStore = useMainStore()
const isReady = ref(false)

const pages = {
	'deviation-list': DeviationList,
	'deviation-needs': DeviationNeeds,
	'deviation-locations': DeviationLocations,
}

const currentComponent = computed(() => {
	return pages[mainStore.page] || pages['dashboard']
})

onMounted(() => {
	isReady.value = true
})
</script>

<template>
	<div class="bg-[#0B1820] h-screen w-full">
		<MainSidebar />
		<div class="pl-5 pr-5 py-10 md:pl-25 h-screen">
			<component v-if="isReady" data-aos="fade-left" :is="currentComponent" />
		</div>
	</div>
</template>

<style scoped></style>