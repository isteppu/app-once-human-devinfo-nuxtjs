<script setup>
import { useUIStore } from '~/store/user';

const uiStore = useUIStore();
const {
    fetchAlertDetails,
    fetchAlertVisible,
    loading,
    searchQuery,
    filteredDeviations,
    devNeeds
} = useFetchData();

</script>

<template>
    <div class="h-full relative overflow-hidden">
        <div class="w-full px-2 pt-5 md:p-10 h-full" :inert="uiStore.sideBarPointerEvents === 'none'">
            <h1 class="text-2xl font-bold text-center uppercase tracking-widest">Deviations</h1>
            <div class="mt-5 w-full rounded-md p-5 h-full">
                <div class="flex flex-col md:flex-row justify-center gap-3 w-full">
                    <label class="input !outline-none bg-white">
                        <Icon name="ic:round-search" class="text-2xl text-gray-500/50" />
                        <input type="search" class="grow placeholder:text-gray-500/50 text-gray-500"
                            placeholder="Search by name or description..." v-model="searchQuery" />
                    </label>
                </div>
                <div v-if="!loading" class="w-full mt-5 overflow-y-scroll p-5 flex flex-wrap gap-5 justify-center h-full pb-20">
                    <div
                        v-for="(deviation, index) in filteredDeviations" :key="'deviation-card-' + index"
                        class=" w-[15rem] h-[22rem] rounded-md relative overflow-hidden flex flex-col items-center justify-start pt-10 group transition-all duration-500 hover:scale-105 hover:pt-2"
                        :class="deviation.type === '0' ? 'bg-[#88BEBA]' : deviation.type === '1' ? 'bg-[#4E6894]' : 'bg-[#B57B8C]'"
                        >

                        <div class="absolute bg-blue-900/30 w-[15rem] h-[15rem] rounded-full top-[-8rem] left-1/2 -translate-x-1/2 group-hover:scale-[3] transition-all duration-500"></div>

                        <div class="relative z-10 p-2">
                            <div 
                            class="h-30 w-30 bg-neutral-600 rounded-full flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:p-1"
                            :class="deviation.type === '0' ? 'group-hover:bg-[#88BEBA] group-hover:shadow-2xl shadow-[#88BEBA]' 
                                : deviation.type === '1' ? 'group-hover:bg-[#4E6894] group-hover:shadow-2xl shadow-[#4E6894]' 
                                : 'group-hover:bg-[#B57B8C] group-hover:shadow-2xl shadow-[#B57B8C]'"
                            >
                                <img :src="`/assets/images/deviations/${deviation.id + 1}.jpg`" class="w-full h-full"/>
                            </div>
                        </div>

                        <div class="relative z-10 mt-1 p-4 w-full transition-all duration-500 group-hover:pt-0">
                            <h1
                            class="text-white text-lg font-bold text-center transition-all duration-500">
                                {{ deviation.name }}</h1>
                            <p
                                class="text-white text-sm opacity-80 mt-2 group-hover:text-black group-hover:opacity-0 group-hover:text-[0px] transition-all text-center transform duration-300">
                                {{ deviation.desc }}
                            </p>
                            <p
                                class="text-white text-xs opacity-0 text-center -mt-2 group-hover:opacity-100 transition-all duration-500 ease-in-out mb-2">
                                {{ deviation.type === '0' ? 'Crafting' : deviation.type === '1' ? 'Territory' : 'Combat' }}
                            </p>
                            <ul 
                                v-if="devNeeds" 
                                class="opacity-0 group-hover:opacity-100 text-white transition-all duration-500 ease-in-out rounded-md px-4 py-2"
                                :class="deviation.type === '0' ? 'group-hover:bg-[#88BEBA]/60' : deviation.type === '1' ? 'group-hover:bg-[#4E6894]/60' : 'group-hover:bg-[#B57B8C]/60'"
                            >
                                <li class="font-semibold">Needs: </li>
                                <li v-for="(need, nIndex) in deviation.needs" :key="'dev-need-' + nIndex" class="text-xs flex flex-row items-center gap-2 mt-1">
                                    <Icon :name="devNeeds.result.find(needs => needs.id === need)?.noto_icon" class="text-xl text-center"></Icon>
                                    {{ devNeeds.result.find(needs => needs.id === need)?.need }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div v-else class="w-full pt-10 flex items-center justify-center">
                    <span className="loading loading-ring loading-xl text-cyan-500"></span>
                </div>
            </div>
        </div>
        <AlertDialog v-if="fetchAlertVisible" :title="fetchAlertDetails.title" :desc="fetchAlertDetails.desc" :buttons="fetchAlertDetails.buttons" />
    </div>
</template>

<style scoped>
</style>
