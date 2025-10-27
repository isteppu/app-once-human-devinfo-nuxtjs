import { ref, computed } from "vue";

export function useFetchData() {
    const searchQuery = ref('');
    const fetchAlertVisible = ref(false);
    const fetchAlertDetails = ref({
        title: "",
        desc: "",
        buttons: [],
    });

    const { data: deviations, pending: loadingDevs, error: devsError, refresh: refreshDevs } = useFetch("/api/deviations", {
        key: 'deviations-fetch',
        server: true,
    });

    const { data: locations, pending: loadingLocations, error: locationsError, refresh: refreshLocations } = useFetch("/api/deviations/locations", {
        key: 'locations-fetch',
        server: true,
    });

    const { data: scenarios, pending: loadingScenarios, error: scenariosError, refresh: refreshScenarios } = useFetch("/api/scenarios", {
        key: 'scenarios-fetch',
        server: true,
    });

    const { data: devTypes, pending: loadingDevTypes, error: devTypesError, refresh: refreshDevTypes } = useFetch("/api/deviations/types", {
        key: 'dev-types-fetch',
        server: true,
    });

    const { data: devNeeds, pending: loadingDevNeeds, error: devNeedsError, refresh: refreshDevNeeds } = useFetch("/api/deviations/needs", {
        key: 'dev-needs-fetch',
        server: true,
    });

    

    const filteredDeviations = computed(() => {
        if (!deviations.value || !deviations.value.result) {
            return [];
        }
        const query = searchQuery.value.toString().toLowerCase();
        if (!query) {
            return deviations.value.result;
        }
        return deviations.value.result.filter(deviation =>
            deviation.name.toLowerCase().includes(query) ||
            deviation.desc.toLowerCase().includes(query)
        );
    });

    const loading = computed(() => {
        return loadingDevs.value || loadingLocations.value || loadingScenarios.value || loadingDevTypes.value || loadingDevNeeds.value;
    });


    const error = computed(() => {
        if (devsError.value || locationsError.value || scenariosError.value || devTypesError.value || devNeedsError.value) {
            fetchAlertDetails.value = {
                title: "Loading Error",
                desc: "Failed to load data. Please try to refresh the page.",
                buttons: [
                    {
                        label: "OK",
                        class: "btn btn-primary",
                        func: () => {
                            fetchAlertVisible.value = false;
                        },
                    },
                ],
            };
            fetchAlertVisible.value = true;
            return true;
        }
        return false;
    });

    return {
        // state
        deviations,
        locations,
        scenarios,
        devTypes,
        devNeeds,
        loading,
        error,
        fetchAlertDetails,
        fetchAlertVisible,
        searchQuery,
        filteredDeviations,
        // methods to refresh data
        refreshDevs,
        refreshLocations,
        refreshScenarios,
        refreshDevTypes,
        refreshDevNeeds,
    };
}
