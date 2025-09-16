<script setup>
import { ref, computed } from "vue";

const { closeEditDevDialog } = useUi();
const { loading, postData } = usePostData();
const { refreshDevs } = useFetchData();
const props = defineProps({
    scenarios: {
        type: Array,
        default: () => [
            { id: 0, name: "Scenario 1" },
            { id: 1, name: "Scenario 2" },
            { id: 2, name: "Scenario 3" },
            { id: 3, name: "Scenario 4" },
            { id: 4, name: "Scenario 5" },
        ],
        required: true,
    },
    locations: {
        type: Array,
        default: () => [
            { id: 0, name: "Location 1", key: "l1" },
            { id: 1, name: "Location 2", key: "l2" },
            { id: 2, name: "Location 3", key: "l3" },
            { id: 3, name: "Location 4", key: "l4" },
            { id: 4, name: "Location 5", key: "l5" },
        ],
        required: true,
    },
    devTypes: {
        type: Array,
        default: () => [
            { id: 0, type: "type 1" },
            { id: 1, type: "type 2" },
        ],
        required: true,
    },
    devNeeds: {
        type: Array,
        default: () => [
            { id: 0, need: "need 1" },
            { id: 1, need: "need 2" },
            { id: 2, need: "need 3" },
            { id: 3, need: "need 4" },
            { id: 4, need: "need 5" },
        ],
        required: true,
    },
    deviations: {
        type: Array,
        default: () => [
            { id: 0, dev: "dev 1" },
            { id: 1, dev: "dev 2" },
            { id: 2, dev: "dev 3" },
            { id: 3, dev: "dev 4" },
            { id: 4, dev: "dev 5" },
        ],
        required: true,
    },
    devInfo: {
        type: Array,
        default: () => 
            ({
                desc: "Sample description of a deviation",
                id: 0,
                location: [
                    {
                        id: 0,
                        loc: "none",
                    },
                    {
                        id: 1,
                        loc: "none",
                    },
                    {
                        id: 2,
                        loc: "none",
                    },
                    {
                        id: 3,
                        loc: "none",
                    },
                    {
                        id: 4,
                        loc: "none",
                    },
                ],
                name: "Sample Deviation Name",
                needs: "none",
                note: "none",
                type: 0,
                variants: "none",
            })
        ,
        required: true,
    },
});

const devName = ref(props.devInfo.name);
const devID = ref(props.devInfo.id);
const devDescription = ref(props.devInfo.desc);
const devType = ref(props.devInfo.type);
const devNotes = ref(props.devInfo.note);
const devNeedsChecked = ref(props.devInfo.needs);

const checked = ref(
    props.scenarios.map((scenario) => {
        // Find the corresponding location info from the devInfo prop for this scenario ID.
        const devLocInfo = props.devInfo.location.find(
            (locItem) => locItem.id === scenario.id
        );

        return props.locations.map((location) => {
            // Check if devLocInfo exists and if its 'loc' property is an array that includes the current location's ID.
            if (devLocInfo && Array.isArray(devLocInfo.loc)) {
                return devLocInfo.loc.includes(location.id);
            }
            // Otherwise, the checkbox should be unchecked.
            return false;
        });
    })
);

const location = computed(() =>
    checked.value.map((row, rowIndex) => {
        const loc = row
            .map((isChecked, colIndex) => (isChecked ? colIndex : null))
            .filter((v) => v !== null);

        return {
            id: rowIndex,
            loc: loc.length > 0 ? loc : "none",
        };
    })
);

const updateData = async () => {
    const body = {
        desc: devDescription.value || "none",
        location: location.value,
        name: devName.value,
        needs: devNeedsChecked.value.length > 0 ? devNeedsChecked.value : "none",
        type: devType.value,
        variants: "none",
        note: devNotes.value || "none",
        id: devID.value,
    };

    await postData(`/deviations/${devID.value}`, body);
    refreshDevs();
    closeEditDevDialog();
};

</script>

<template>
    <div class="!w-full h-full absolute top-0 left-0 flex justify-center items-center p-5 backdrop-blur-sm z-40">
        <div data-aos="fade-up"
            class="bg-gray-200 bs-neon rounded-lg p-10 max-w-xlg text-white transition-transform duration-300 ease-in-out scale-100 border-1 border-white">
            <h2 class="text-xl text-cyan-800 font-semibold uppercase">
                Add Deviation
            </h2>
            <p class="mt-2 text-cyan-800 font-thin">Please fill out all the fields</p>

            <div class="mt-5 flex flex-col w-full gap-3">
                <div class="flex flex-row">
                    <div class="flex flex-col gap-2">
                        <div class="flex flex-row gap-2">
                            <div class="flex flex-col gap-2">
                                <label for="dev-name" class="text-cyan-800 text-sm font-bold">Name</label>
                                <input type="text" id="dev-name" placeholder="Deviation Name" v-model="devName"
                                    class="input bg-white !outline-none placeholder:text-gray-500/50 text-gray-500 w-full md:w-[180px]" />
                            </div>
                            <div class="flex flex-col gap-2">
                                <label for="dev-id" class="text-cyan-800 text-sm font-bold">ID</label>
                                <input type="tel" id="dev-id" placeholder="Deviation ID" readonly disabled v-model="devID"
                                    class="input !bg-white/50 !border-none !outline-none !text-gray-300 w-full md:w-[110px]" />
                            </div>
                        </div>
                        <label for="dev-description" class="text-cyan-800 text-sm font-bold">Description</label>
                        <textarea type="text" id="dev-description" placeholder="Type description here.. "
                            v-model="devDescription"
                            class="textarea bg-white !outline-none placeholder:text-gray-500/50 text-gray-500 w-full md:w-[300px] multiline"></textarea>
                        <label for="dev-type" class="text-cyan-800 text-sm font-bold">Type</label>
                        <select id="dev-type" class="select w-full md:w-[300px] bg-white !outline-none text-gray-500/50"
                            v-model="devType">
                            <option disabled selected value="">Deviation Type</option>
                            <option v-for="(type, index) in devTypes" :key="'dev-type-option-' + index"
                                :value="type.id">
                                {{ type.type }}
                            </option>
                        </select>
                        <label for="dev-notes" class="text-cyan-800 text-sm font-bold">Notes</label>
                        <textarea type="text" id="dev-notes" placeholder="Type notes here.. " v-model="devNotes"
                            class="textarea bg-white !outline-none placeholder:text-gray-500/50 text-gray-500 w-full md:w-[300px] multiline"></textarea>
                    </div>
                    <div class="pl-20">
                        <label for="dev-location" class="ml-2 text-cyan-800 text-sm font-bold">Locations</label>
                        <table id="dev-location" class="mb-2 table-xs border-collapse w-full md:w-[400px] text-center">
                            <thead>
                                <tr>
                                    <th class="text-cyan-800/60 uppercase text-left">
                                        Scenarios
                                    </th>
                                    <th v-for="(head, hIndex) in props.locations" class="uppercase text-cyan-800/60"
                                        :key="'location-header-name-' + hIndex">
                                        <div class="dropdown dropdown-hover hover:cursor-help">
                                            <div role="button" :tabindex="hIndex" class="flex gap-1">
                                                <h1>{{ head.key }}</h1>
                                                <Icon name="mdi:help-circle-outline" class="text-neutral-400 text-xs" />
                                            </div>
                                            <div :tabIndex="hIndex"
                                                class="card card-sm dropdown-content bg-white rounded-box z-1 shadow-sm">
                                                <div class="card-body">
                                                    <p class="capitalize text-left">{{ head.name }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(scenario, rowIndex) in props.scenarios"
                                    :key="'scenario-row-name-' + rowIndex">
                                    <td class="text-cyan-800 text-left">{{ scenario.name }}</td>
                                    <td v-for="(head, colIndex) in locations" :key="colIndex">
                                        <input type="checkbox" class="bg-white checkbox checkbox-accent"
                                            v-model="checked[rowIndex][colIndex]" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <label for="dev-needs" class="ml-2 text-cyan-800 text-sm font-bold">Deviation Needs</label>
                        <div id="dev-needs" class="mt-2 ml-2 grid grid-cols-3 gap-2">
                            <div v-for="(need, index) in props.devNeeds" :key="'dev-needs-option-' + index"
                                class="flex">
                                <input type="checkbox" class="checkbox checkbox-accent bg-white" :value="need.id"
                                    v-model="devNeedsChecked" />
                                <h1 class="text-cyan-800 text-xs ml-2">
                                    {{ need.need }}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div></div>
                <div class="flex flex-row gap-2 mt-4">
                    <button :disabled="loading" @click="updateData"
                        class="btn bg-cyan-800 text-white rounded disabled:bg-cyan-500">
                        Update Data
                    </button>
                    <button :disabled="loading" @click="closeEditDevDialog"
                        class="btn bg-red-900 text-white rounded disabled:bg-red-500">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
