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
                <div class="w-full mt-5 overflow-y-scroll">
                    <div class="bg-cyan-800/70 w-50 h-70 rounded-lg relative overflow-hidden flex flex-col items-center justify-center group">
                        <div class="absolute bg-white -top-20 -left-5 w-60 h-60 rotate-45 rounded-full">
                        </div>
                        <div class="mask mask-circle h-20 w-20 bg-cyan-500">
                            <!-- <img :src="`/assets/images/deviations/${deviation.id + 1}.jpg`"
                                :alt="deviation.name + ' image'" /> -->
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
