import { ref } from 'vue'
import { useFetch } from '#app'

const deleteAlertVisible = ref("");
const deleteAlertDetails = ref({
    title: "",
    desc: "",
    buttons: [],
});

export function useDeleteData() {
    const loading = ref(false)
    const error = ref(null)
    const data = ref(null)

    const deleteData = async (endpoint, name, options = {}) => {
        loading.value = true
        error.value = null

        deleteAlertDetails.value = {
            title: "Delete this item?",
            desc: `${endpoint.split('/')[1].replace(/\b\w/g, l => l.toUpperCase())}: ${name}.`,
            buttons: [
                {
                    label: "Delete",
                    class: "btn btn-error",
                    func: async () => {
                        deleteAlertVisible.value = false
                        try {
                            const { data: response, error: fetchError } = await useFetch('/api' + endpoint, {
                                method: 'DELETE',
                                ...options,
                            })

                            if (fetchError.value) throw fetchError.value

                            data.value = response.value
                            deleteAlertDetails.value = {
                                title: "Data Deleted Successfully",
                                desc: `${endpoint} data has been deleted successfully.`,
                                buttons: [
                                    {
                                        label: "OK",
                                        class: "btn btn-primary",
                                        func: () => {
                                            deleteAlertVisible.value = false;
                                        },
                                    },
                                ],
                            };
                            deleteAlertVisible.value = true;
                            return response.value
                        } catch (err) {
                            error.value = err
                            deleteAlertDetails.value = {
                                title: "Deletion Error",
                                desc: `Failed to delete ${endpoint} data. Please try again later.`,
                                buttons: [
                                    {
                                        label: "OK",
                                        class: "btn btn-primary",
                                        func: () => {
                                            deleteAlertVisible.value = false;
                                        },
                                    },
                                ],
                            };
                            deleteAlertVisible.value = true;
                            return null
                        } finally {
                            loading.value = false
                        }
                    },
                },
                {
                    label: "Cancel",
                    class: "btn btn-primary",
                    func: () => {
                        deleteAlertVisible.value = false;
                    },
                },
            ],
        };
        deleteAlertVisible.value = true;
    }


    return { deleteAlertDetails, deleteAlertVisible, data, error, loading, deleteData }
}
