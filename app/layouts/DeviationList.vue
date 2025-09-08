<script setup>
import { useUIStore } from '~/store/user';

const uiStore = useUIStore();
const {
    fetchAlertDetails,
    fetchAlertVisible,
    loading,
    searchQuery,
    filteredDeviations,
} = useFetchData();



</script>

<template>
    <div class="h-full relative">
        <div class="w-full px-2 pt-5 md:p-10 h-full" :inert="uiStore.sideBarPointerEvents === 'none'">
            <h1 class="text-2xl font-bold">Deviation List</h1>

            <div class="mt-5 w-full  rounded-md p-5 max-h-[650px] h-full">
                <div class="flex flex-col md:flex-row justify-center gap-3 w-full">
                    <label class="input !outline-none bg-white">
                        <Icon name="ic:round-search" class="text-2xl text-gray-500/50" />
                        <input type="search" class="grow placeholder:text-gray-500/50 text-gray-500"
                            placeholder="Search by name or description..." v-model="searchQuery" />
                    </label>
                </div>
                <div class="w-full mt-5 overflow-y-scroll p-5">
                    <div
                        class="bg-cyan-800/70 w-[15rem] h-[20rem] rounded-3xl relative overflow-hidden flex flex-col items-center justify-center group transition-all duration-500 hover:scale-105 shadow-sm shadow-cyan-200">

                        <!-- The background shape that scales -->
                        <div class="absolute bg-white w-[15rem] h-[15rem] rounded-full top-[-8rem] left-1/2 -translate-x-1/2 group-hover:scale-[3] transition-all duration-500">
                        </div>

                        <!-- The main icon or image container -->
                        <div class="relative z-10 p-4">
                            <div class="h-24 w-24 bg-cyan-500 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                                <span
                                    class="text-white text-5xl group-hover:text-black transition-colors duration-500">✨</span>
                            </div>
                        </div>

                        <!-- Placeholder for text content -->
                        <div class="relative z-10 mt-4 p-4 text-center">
                            <h1
                                class="text-white text-3xl font-bold group-hover:text-black transition-colors duration-500">
                                Example Card</h1>
                            <p
                                class="text-white text-sm opacity-80 mt-2 group-hover:text-black transition-colors duration-500">
                                This div is a test of a hover effect with scaling and clipping.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <AlertDialog v-if="fetchAlertVisible" :title="fetchAlertDetails.title" :desc="fetchAlertDetails.desc"
            :buttons="fetchAlertDetails.buttons" />/>
    </div>
</template>

<style scoped>
/*
This defines the enter and leave transitions for the items in the list.
The 'fade' name corresponds to the name prop on <TransitionGroup>.
*/
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
