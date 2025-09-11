<script setup>
import { ref, computed } from 'vue';

const { closeDeviationSettings } = useUi();
const { loading, postData } = usePostData();
const { refreshLocations, refreshDevNeeds, refreshDevTypes } = useFetchData();
const props = defineProps({
	locations: {
		type: Array,
		default: () => ([
			{ id: 0, name: "Location 1", key: "l1" },
			{ id: 1, name: "Location 2", key: "l2" },
			{ id: 2, name: "Location 3", key: "l3" },
			{ id: 3, name: "Location 4", key: "l4" },
			{ id: 4, name: "Location 5", key: "l5" },
		]),
		required: true
	},
	devTypes: {
		type: Array,
		default: () => ([
			{ id: 0, type: "type 1" },
			{ id: 1, type: "type 2" },
		]),
		required: true
	},
	devNeeds: {
		type: Array,
		default: () => ([
			{ id: 0, need: "need 1" },
			{ id: 1, need: "need 2" },
			{ id: 2, need: "need 3" },
			{ id: 3, need: "need 4" },
			{ id: 4, need: "need 5" },
		]),
		required: true
	}
})

const locID = ref('');
const locKey = ref('');
const locName = ref('');
const needID = ref('');
const needName = ref('');
const needIcon = ref('');
const typeId = ref('');
const typeName = ref('');


const addLocation = async () => {
	const body = {
		id: locID.value,
		name: locName.value,
		key: locKey.value,
	};

	console.log("➕ Add Body (Location): ", body)
	await postData("/deviations/locations", body)
    refreshLocations();
};

const addNeeds = async () => {
	const body = {
		id: needID.value,
		need: needName.value,
		noto_icon: needIcon.value,
	};

	console.log("➕ Add Body (Need): ", body)
	await postData("/deviations/needs", body)
    refreshDevNeeds();
};

const addTypes = async () => {
	const body = {
		id: typeId.value,
		type: typeName.value,
	};

	console.log("➕ Add Body (Type): ", body)
	await postData("/deviations/types", body)
    refreshDevTypes();
};

const getAvailableIds = (data) => {
	const maxRange = 56;
	const usedIds = new Set(data.map(d => d.id));
	const available = [];

	for (let i = 0; i <= maxRange; i++) {
		if (!usedIds.has(i)) {
			available.push(i);
		}
	}

	if (available.length === 0) {
		available.push(maxRange + 1);
	}

	return available;
};


</script>

<template>
	<div class="!w-full h-full absolute top-0 left-0 flex justify-center items-center p-5 backdrop-blur-sm z-40">
		<div data-aos="fade-up"
			class="bg-gray-200 bs-neon rounded-lg p-10 max-w-xlg text-white transition-transform duration-300 ease-in-out scale-100 border-1 border-white">

			<h2 class="text-xl text-cyan-800 font-semibold uppercase">Settings</h2>
			<p class="mt-2 text-cyan-800 font-thin">Please fill out all the fields</p>

			<div class="mt-5 flex flex-col w-full gap-3">
				
				<div>

				</div>
				<div class="flex flex-row gap-2 mt-4">
					<button :disabled="loading" @click="closeDeviationSettings"
						class="btn bg-red-900 text-white rounded disabled:bg-red-500">
						close
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>