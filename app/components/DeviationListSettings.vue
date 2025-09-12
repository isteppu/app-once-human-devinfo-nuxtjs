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

const getAvailableIds = (data, max) => {
    const maxRange = max;
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
            class="bg-gray-200 bs-neon rounded-lg !p-10 max-w-xlg text-white transition-transform duration-300 ease-in-out scale-100 border-1 border-white h-[550px] overflow-hidden">
            <h2 class="text-xl text-cyan-800 font-semibold uppercase mb-5">Settings</h2>
            <div class="flex flex-col w-full gap-3 overflow-y-scroll h-[370px] pb-5">
                <div class="flex flex-row gap-5">
                    <div class="flex flex-col gap-5">
                        <ul v-if="devTypes.length > 0" class="flex flex-col gap-2 text-cyan-800 mb-5">
                            <h1 class="text-cyan-800 font-semibold mb-2">Deviation Types</h1>
                            <li v-for="(type, index) in devTypes" :key="'type' + index" class="flex flex-row gap-2">
                                <input type="text" :value="'00' + type.id" class="input input-sm bg-cyan-900/10 w-20">
                                <input type="text" :value="type.type" class="input input-sm bg-cyan-900/10">
                                <button class="btn btn-sm bg-purple-900 text-white">
                                    <Icon name="mdi:edit" class="text-sm text-white" />
                                </button>
                            </li>
                            <li class="flex flex-row gap-2">
                                <select class="select w-20 bg-white !outline-none text-cyan-800" v-model="typeId">
                                    <option disabled selected value="">ID</option>
                                    <option v-for="(id, index) in getAvailableIds(devTypes, 3)"
                                        :key="'type-id-option-' + index" :value="id">
                                        {{ id }}
                                    </option>
                                </select>
                                <input type="text" v-model="typeName" class="input bg-white" placeholder="Type Name">
                                <button class="btn bg-cyan-800 text-white">
                                    Add
                                </button>
                            </li>
                        </ul>
                        <ul v-if="devTypes.length > 0" class="flex flex-col gap-2 text-cyan-800 mb-5">
                            <h1 class="text-cyan-800 font-semibold mb-2">Deviation Locations</h1>
                            <li v-for="(loc, index) in locations" :key="'loc' + index" class="flex flex-row gap-2">
                                <input type="text" :value="'00' + loc.id" class="input input-sm bg-cyan-900/10 w-20">
                                <input type="text" :value="loc.key"
                                    class="input input-sm bg-cyan-900/10 w-12 uppercase">
                                <input type="text" :value="loc.name" class="input input-sm bg-cyan-900/10">
                                <button class="btn btn-sm bg-purple-900 text-white">
                                    <Icon name="mdi:edit" class="text-sm text-white" />
                                </button>
                            </li>
                            <li class="flex flex-row gap-2">
                                <select class="select w-20 bg-white !outline-none text-cyan-800" v-model="locID">
                                    <option disabled selected value="">ID</option>
                                    <option v-for="(id, index) in getAvailableIds(locations, 5)"
                                        :key="'loc-id-option-' + index" :value="id">
                                        {{ id }}
                                    </option>
                                </select>
                                <input type="text" v-model="locKey" class="input bg-white w-13" placeholder="Key">
                                <input type="text" v-model="locName" class="input bg-white" placeholder="Type Name">
                                <button class="btn bg-cyan-800 text-white">
                                    Add
                                </button>
                            </li>
                        </ul>
                    </div>
                    <ul v-if="devTypes.length > 0" class="flex flex-col gap-2 text-cyan-800">
                        <h1 class="text-cyan-800 font-semibold mb-2">Deviation Needs</h1>
                        <li v-for="(need, index) in devNeeds" :key="'dev' + index" class="flex flex-row gap-2">
                            <input type="text" :value="'00' + need.id" class="input input-sm bg-cyan-900/10 w-20">
                            <input type="text" :value="need.need" class="input input-sm bg-cyan-900/10">
                            <input type="text" :value="need.noto_icon" class="input input-sm bg-cyan-900/10">
                            <button class="btn btn-sm bg-purple-900 text-white">
                                <Icon name="mdi:edit" class="text-sm text-white" />
                            </button>
                        </li>
                        <li class="flex flex-row gap-2">
                            <select class="select w-20 bg-white !outline-none text-cyan-800" v-model="needID">
                                <option disabled selected value="">ID</option>
                                <option v-for="(id, index) in getAvailableIds(devNeeds, 9)"
                                    :key="'need-id-option-' + index" :value="id">
                                    {{ id }}
                                </option>
                            </select>
                            <input type="text" v-model="needName" class="input bg-white" placeholder="Type Name">
                            <input type="text" v-model="needIcon" class="input bg-white"
                                placeholder="Type Noto Icon (iconify)">
                            <button class="btn bg-cyan-800 text-white">
                                Add
                            </button>
                        </li>
                    </ul>
                </div>

            </div>
            <div class="flex flex-row gap-2 mt-4">
                <button :disabled="loading" @click="closeDeviationSettings"
                    class="btn bg-red-900 text-white rounded disabled:bg-red-500">
                    close
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>