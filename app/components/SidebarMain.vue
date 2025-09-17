<script setup>
import { useMainStore } from "~/store/user";
import { useUIStore } from '~/store/user';

const mainStore = useMainStore();
const uiStore = useUIStore();
const { pages } = useUi();

</script>

<template>
    <div data-aos="slide-right" class="fixed z-[12] w-full" :style="{ 'pointer-events': uiStore.sideBarPointerEvents }"
        :inert="uiStore.sideBarPointerEvents === 'none'">
        <div class="bg-black/50 flex flex-col justify-between items-stretch h-screen fixed top-0 left-0 text-white transition-all duration-300">
            <div class="p-4">
                <div class="w-full h-[80px] flex items-center justify-center">
                        <img class="rounded-sm h-10 w-10 ring-2 ring-cyan-500/50 overflow-hidden text-center"
                            src="/assets/images/profiles/oh-logo.png" />
                </div>
            </div>
            <nav class="px-4">
                <ul class="space-y-5">
                    <li v-for="(page, index) in pages" :key="'menu-list' + index">
                        <a href="#" class="flex flex-col items-center rounded-md space-y-1 p-2  transition-colors duration-200"
                            @click="page.page ? mainStore.setPage(page.page) : null"
                            :class="page.page === mainStore.page ? 'bg-cyan-700 hover:bg-cyan-800' : 'hover:bg-cyan-800/50'">
                            <Icon :name="page.icon" class="text-4xl text-center"></Icon>
                            <span class="text-[8px] uppercase">{{ page.name }}</span>

                        </a>
                    </li>
                </ul>
            </nav>

            <div class="h-50">
            </div>
        </div>
    </div>
</template>

<style scoped></style>