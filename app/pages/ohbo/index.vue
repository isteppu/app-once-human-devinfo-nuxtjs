<script setup>

import { ref, onMounted } from 'vue';
import AlertDialog from '~/components/AlertDialog.vue';
import { useUserStore } from '../../store/user';

const userStore = useUserStore();
const showPassword = ref(false);
const loading = ref(false);
const username = ref('');
const password = ref('');
const usernameError = ref('');
const passwordError = ref('');
const loginError = ref('');
const alertVisible = ref('');
const alertDetails = ref({
    title: '',
    desc: '',
    buttons: []
});


const validateForm = () => {
    if (!username.value) {
        usernameError.value = 'Username is required';
    }
    if (!password.value) {
        passwordError.value = 'Password is required';
    }

    return !usernameError.value && !passwordError.value ? onSubmit() : null;
}



const onSubmit = async () => {
    loading.value = true;
    try {
        const { data, error } = await useFetch('/api/auth', {
            method: 'POST',
            body: {
                username: username.value,
                password: password.value,
            },
        })

        if (error.value) {
            loginError.value = error.value.data?.data?.message || 'An error occurred during login.';
            return;
        }

        if (data.value) {
            alertDetails.value = {
                title: 'Success',
                desc: 'Login successful.',
                buttons: [
                    {
                        icon: "pi pi-verified text-2xl",
                        label: 'OK',
                        class: 'btn btn-primary',
                        func: () => {
                            alertVisible.value = false;
                            userStore.setUser(username.value);
                            userStore.setLoggedIn(true);
                            navigateTo("/ohbo/pages/main");
                        }
                    }
                ]
            }

            alertVisible.value = true;
        }
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    if (userStore.isLoggedIn) {
        navigateTo('/bo/deviations')
    }
});

</script>

<template>
    <div class="flex flex-col items-center justify-center h-screen w-full bg-cyan-500/30">
        <div
            class="max-w-[500px] w-full shadow-sm shadow-white/50 border-white/20 bg-gray-900 border-1 rounded-md h-full md:h-[400px]">
            <div class="flex flex-col justify-center items-center p-5 h-full gap-4">
                <img class="rounded-full h-15 w-15 overflow-hidden ring-2 ring-cyan-500/50"
                    src="/assets/images/profiles/oh-logo.png" alt="OH Logo" />
                <h1 class="text-md text-white font-semibold uppercase text-center">OH Portal Backoffice</h1>
                <input name="username" type="text" class="input w-full focus-within:outline-none"
                    :class="usernameError ? 'border-red-500' : ''" v-model="username" placeholder="Enter username"
                    required />
                <p v-if="usernameError" class="-mt-3 text-xs text-left text-red-600 w-full">{{ usernameError }}</p>
                <label class="input w-full focus-within:outline-none" :class="passwordError ? 'border-red-500' : ''"
                    required>
                    <input name="password" :type="showPassword ? 'text' : 'password'" class="grow" v-model="password"
                        placeholder="Enter password" />
                    <button class="hover:cursor-pointer" @click="showPassword = !showPassword"
                        :type="showPassword ? 'text' : 'password'">
                        <Icon :name="showPassword ? 'mdi-light:eye-off' : 'mdi-light:eye'" class="grow"></Icon>
                    </button>
                </label>
                <p v-if="passwordError" class="-mt-3 text-xs text-left text-red-600 w-full">{{ passwordError }}</p>
                <div v-if="loginError"
                    class="-mt-1 rounded-xs bg-red-100 py-2 text-sm text-center text-red-800 w-full font-bold">{{
                        loginError }}</div>
                <button @click="validateForm" class="btn btn-accent w-full font-bold uppercase" :disabled="loading">
                    <span v-if="loading" class="loading loading-ring"></span>
                    <span v-else>Login</span>
                </button>
            </div>
        </div>
    </div>

    <AlertDialog v-if="alertVisible" :title="alertDetails.title" :desc="alertDetails.desc"
        :buttons="alertDetails.buttons" />
</template>
