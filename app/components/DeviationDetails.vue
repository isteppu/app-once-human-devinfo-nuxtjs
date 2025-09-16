<script setup>
import { ref } from "vue";

const { closeDeviationDetails } = useUi();
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
            desc: "Sample description of a devInfo",
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
        const devLocInfo = props.devInfo.location.find(
            (locItem) => locItem.id === scenario.id
        );

        return props.locations.map((location) => {
            if (devLocInfo && Array.isArray(devLocInfo.loc)) {
                return devLocInfo.loc.includes(location.id);
            }
            return false;
        });
    })
);




</script>

<template>
    <div class="!w-full h-screen absolute top-0 left-0 flex justify-center items-center p-5 backdrop-blur-sm z-40">
        <div data-aos="fade-up"
            class="bg-gray-900 bs-neon rounded-lg p-10 max-w-xlg text-white transition-transform duration-300 ease-in-out scale-100 border-1 border-cyan-900 h-[550px] overflow-hidden w-[1000px]">
            <button class="btn btn-sm btn-circle bg-white/0 border-none shadow-none absolute top-3 right-3"
                @click="closeDeviationDetails()">
                <Icon name="mdi:close" class="text-gray-500/50 hover:text-gray-500 text-xl" />
            </button>
            <div
                class="h-full w-1/2 bg-[linear-gradient(to_right,rgba(17,24,39,0.5),rgba(17,24,39,1)),url(/assets/images/dev-dialog-bg.png)] bg-cover bg-center absolute top-0 left-0 -z-10">
                <div class="flex flex-col justify-center items-center h-full gap-2">
                    <div
                        class="h-30 w-30 bg-neutral-600 rounded-full flex items-center justify-center mb-10">
                        <img :src="`/assets/images/deviations/${devInfo.id + 1}.jpg`" class="w-full h-full" />
                    </div>
                    <h1 class="text-white text-2xl font-bold text-center text-shadow-[0_0px_15px_rgb(17_24_39_/_0.8)] ">
                        {{ devInfo.name }}</h1>
                    <p class="text-white text-md text-center transition-all duration-500 ease-in-out mb-2 text-shadow-[0_0px_15px_rgb(17_24_39_/_0.8)]">
                        {{ devInfo.type === '0' ? 'Crafting' : devInfo.type === '1' ? 'Territory' : 'Combat' }}
                    </p>
                    <p class="text-white text-sm mt-2 text-shadow-[0_0px_15px_rgb(17_24_39_/_0.8)]">
                        {{ devInfo.desc }}
                    </p>

                </div>
            </div>

        </div>
    </div>
</template>

<style scoped></style>
