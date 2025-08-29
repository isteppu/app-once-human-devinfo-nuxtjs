import { ref } from "vue";
import { useDataStore } from "~/store/user";

export function useFetchData() {
    const dataStore = useDataStore();
    const deviations = ref(null);
    const loading = ref(false);
    const locations = ref(null);
    const scenarios = ref(null);
    const addDesc = ref('');
    const addLocation = ref('');
    const addName = ref('');
    const addNeeds = ref('');
    const addType = ref('');
    const addVariants = ref('');
    const addNote = ref('');
    const alertVisible = ref("");
    const alertDetails = ref({
        title: "",
        desc: "",
        buttons: [],
    });


    const fetchDeviationData = async () => {
        loading.value = true;
        try {
            const { data, error } = await useFetch("/api/deviations");
            if (error.value) {
                alertDetails.value = {
                    title: "Loading Error",
                    desc: "Failed to load deviations data. Please try to refresh the page.",
                    buttons: [
                        {
                            label: "OK",
                            class: "btn btn-primary",
                            func: () => {
                                alertVisible.value = false;
                            },
                        },
                    ],
                };
                alertVisible.value = true;
                return;
            }

            if (data.value) {
                deviations.value = data.value.result;
                dataStore.setDevs(data.value.result)
            }

        } finally {
            loading.value = false;
        }
    };

    const fetchLocations = async () => {
        loading.value = true;
        try {
            const { data, error } = await useFetch("/api/deviations/locations");
            if (error.value) {
                alertDetails.value = {
                    title: "Loading Error",
                    desc: "Failed to load deviations/locations data. Please try to refresh the page.",
                    buttons: [
                        {
                            label: "OK",
                            class: "btn btn-primary",
                            func: () => {
                                alertVisible.value = false;
                            },
                        },
                    ],
                };
                alertVisible.value = true;
                return;
            }

            if (data.value) {
                locations.value = data.value.result;
                console.log("Locations", data.value.result)
                dataStore.setLocations(data.value.result)
            }

        } finally {
            loading.value = false;
        }
    }

    const fetchScenarios = async () => {
        loading.value = true;
        try {
            const { data, error } = await useFetch("/api/scenarios");
            if (error.value) {
                alertDetails.value = {
                    title: "Loading Error",
                    desc: "Failed to load scenarios data. Please try to refresh the page.",
                    buttons: [
                        {
                            label: "OK",
                            class: "btn btn-primary",
                            func: () => {
                                alertVisible.value = false;
                            },
                        },
                    ],
                };
                alertVisible.value = true;
                return;
            }

            if (data.value) {
                scenarios.value = data.value.result;
                console.log("Scenarios", data.value.result)
                dataStore.setScenarios(data.value.result)
            }

        } finally {
            loading.value = false;
        }
    }

    return {
        // state
        deviations,
        loading,
        alertVisible,
        alertDetails,
        locations,
        scenarios,

        // methods
        fetchDeviationData,
        fetchLocations,
        fetchScenarios
    };
}
