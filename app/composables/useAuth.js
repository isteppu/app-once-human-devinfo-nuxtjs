import { ref } from "vue";
import { useUserStore } from "~/store/user";
import { useDataStore } from "~/store/user";

export function useAuth() {
    const userStore = useUserStore();
    const dataStore = useDataStore();
    const adminUsername = ref('');
    const showPassword = ref(false);
    const loading = ref(false);
    const username = ref("");
    const password = ref("");
    const usernameError = ref("");
    const passwordError = ref("");
    const loginError = ref("");
    const alertVisible = ref(false);
    const alertDetails = ref({
        title: "",
        desc: "",
        buttons: [],
    });

    const checkStore = () => {
        console.log("Login? ", userStore.isLoggedIn)
        adminUsername.value = userStore.user;
    }

    const logout = () => {
        userStore.logout();
        dataStore.resetData();
        navigateTo('/backoffice')
    }

    const validateForm = async () => {
        usernameError.value = "";
        passwordError.value = "";

        if (!username.value) {
            usernameError.value = "Username is required";
        }
        if (!password.value) {
            passwordError.value = "Password is required";
        }

        return !usernameError.value && !passwordError.value
            ? await onSubmit()
            : null;
    };

    const onSubmit = async () => {
        loading.value = true;
        try {
            const { data, error } = await useFetch("/api/auth", {
                method: "POST",
                body: {
                    username: username.value,
                    password: password.value,
                },
            });

            if (error.value) {
                loginError.value =
                    error.value.data?.data?.message ||
                    "An error occurred during login.";
                return;
            }

            if (data.value) {
                alertDetails.value = {
                    title: "Success",
                    desc: "Login successful.",
                    buttons: [
                        {
                            icon: "pi pi-verified text-2xl",
                            label: "OK",
                            class: "btn btn-primary",
                            func: () => {
                                alertVisible.value = false;
                                userStore.setLoggedIn(true);
                                userStore.setUser(username.value);
                                navigateTo("/backoffice/admin");
                            },
                        },
                    ],
                };

                alertVisible.value = true;
            }
        } finally {
            loading.value = false;
        }
    };

    return {
        // state
        username,
        password,
        adminUsername,
        showPassword,
        loading,
        usernameError,
        passwordError,
        loginError,
        alertVisible,
        alertDetails,

        // methods
        checkStore,
        logout,
        validateForm,
        onSubmit,
    };
}
