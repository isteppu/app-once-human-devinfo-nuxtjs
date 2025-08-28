<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../../../store/user';

const userStore = useUserStore();
const adminUsername = ref('');
const isMobileMenuOpen = ref(false);

const checkStore = () => {
    if (!userStore.isLoggedIn) {
        navigateTo('/ohbo')
    } else {
        adminUsername.value = userStore.user;
    }
}

const logout = () => {
    userStore.logout();
    navigateTo('/ohbo')
}

onMounted(() => {
    checkStore();
});

const toggleMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const menu = [
    { name: "Dashboard", icon: "mdi:home-outline", page: "dashboard" },
    {
        name: "Deviations", icon: "mage:robot-fill", submenu: [
            { name: "Deviation List", icon: "ic:round-library-books", page: "deviation-list" },
            { name: "Deviation Types", icon: "ic:round-category", page: "deviation-types" },
            { name: "Deviation Needs", icon: "ic:round-list-alt", page: "deviation-needs" },
        ]
    },
    {
        name: "Scenarios", icon: "mdi:world", submenu: [
            { name: "Scenario List", icon: "ic:round-list-alt", page: "scenario-list" },
            { name: "Visional Wheels", icon: "solar:moon-linear", page: "visional-wheels" },
        ]
    },
    { name: "Silos", icon: "material-symbols:door-open-outline-sharp", page: "silos" }

]

</script>

<template>
    <div data-aos="slide-right" class="fixed z-[12] w-full">
        <div class="hidden md:flex flex-col w-70 h-screen fixed top-0 left-0 text-white transition-all duration-300">
            <div class="p-6">
                <div class="w-full h-[120px] flex flex-col  items-center justify-center">
                    <h1 class="text-md my-5 font-extrabold uppercase flex w-full tracking-widest">
                        OH Portal Backoffice
                    </h1>
                    <div class="flex w-full justify-between">
                        <div class="flex flex-row">
                            <img class="rounded-sm h-10 w-10 ring-2 ring-cyan-500/50 overflow-hidden"
                                src="/assets/images/profiles/oh-logo.png" />
                            <div>
                                <h1 class="text-xs ml-2 text-cyan-200 uppercase flex items-center justify-center">{{
                                    adminUsername }}</h1>
                                <h2 class="text-[10px] text-cyan-400 ml-2 font-thin">Admin</h2>
                            </div>
                        </div>
                        <button
                            class="w-10 h-10 bg-[#05373E] rounded-sm hover:cursor-pointer hover:ring-1 hover:ring-cyan-800"
                            @click="logout"><Icon name="ic:sharp-exit-to-app"></Icon></button>
                    </div>
                </div>
            </div>
            <div class="divider m-0 px-5"></div>
            <nav class="flex-1 px-4 py-2 overflow-y-auto">

                <ul class="space-y-2">
                    <li v-for="(page, index) in menu" :key="'menu-list' + index">
                        <a 
                            href="#" class="flex items-center space-x-3 p-3 rounded-xl"
                            @click="page.page ? userStore.setPage(page.page) : null"
                            :class="page.page ? ' hover:bg-gray-700 transition-colors duration-200' : ''">
                            <Icon :name="page.icon" class="text-2xl"></Icon>
                            <span>{{ page.name }}</span>

                        </a>
                        <ul v-if="page.submenu" class="ml-5">
                            <li v-for="(sub, index) in page.submenu" :key="'submenu-list' + index">
                                <a 
                                    href="#" class="flex items-center space-x-3 p-3 rounded-xl"
                                    @click="sub.page ? userStore.setPage(sub.page) : null"
                                    :class="sub.page ? ' hover:bg-gray-700 transition-colors duration-200' : ''">
                                    <Icon class="text-gray-400" :name="sub.icon"></Icon>
                                    <span class="text-sm text-gray-400">{{ sub.name }}</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>

        <div class="md:hidden sticky top-0 bg-gray-800 text-white p-4 flex items-center justify-between shadow-lg z-[12]">
            <h1 class="text-md font-extrabold uppercase flex w-full tracking-widest">
                OH Portal Backoffice
            </h1>
            <button @click="toggleMenu" class="focus:outline-none">
                <Icon v-if="!isMobileMenuOpen" name="mdi:hamburger-menu" class="h-6 w-6"></Icon>
                <Icon v-else name="mdi:times" class="h-6 w-6"></Icon>
            </button>
        </div>

        <transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition-opacity duration-300"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="isMobileMenuOpen"
                class="md:hidden fixed inset-0 bg-gray-900 bg-opacity-95 h-screen z-[11] flex pt-20 p-5 flex-col space-y-6 text-white"
                @click="toggleMenu">
                <ul class="space-y-2">
                    <li v-for="(page, index) in menu" :key="'menu-list' + index">
                        <a 
                            href="#" class="flex items-center space-x-3 p-3 rounded-xl"
                            @click="page.page ? userStore.setPage(page.page) : null"
                            :class="page.page ? ' hover:bg-gray-700 transition-colors duration-200' : ''">
                            <Icon :name="page.icon" class="text-2xl"></Icon>
                            <span>{{ page.name }}</span>

                        </a>
                        <ul v-if="page.submenu" class="ml-5">
                            <li v-for="(sub, index) in page.submenu" :key="'submenu-list' + index">
                                <a 
                                    href="#" class="flex items-center space-x-3 p-3 rounded-xl"
                                    @click="sub.page ? userStore.setPage(sub.page) : null"
                                    :class="sub.page ? ' hover:bg-gray-700 transition-colors duration-200' : ''">
                                    <Icon class="text-gray-400" :name="sub.icon"></Icon>
                                    <span class="text-sm text-gray-400">{{ sub.name }}</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<style scoped></style>