import { ref } from 'vue'
import { useFetch } from '#app'

const alertVisible = ref("");
const alertDetails = ref({
	title: "",
	desc: "",
	buttons: [],
});

export function usePostData() {
	const loading = ref(false)
	const error = ref(null)
	const data = ref(null)

	const postData = async (endpoint, body, options = {}) => {
		loading.value = true
		error.value = null

		try {
			const { data: response, error: fetchError } = await useFetch('/api' + endpoint, {
				method: 'POST',
				body,
				...options,
			})

			if (fetchError.value) throw fetchError.value


			data.value = response.value
			alertDetails.value = {
				title: "Data Registered Successfully",
				desc: `${endpoint} data has been registered successfully.`,
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
			return response.value
		} catch (err) {
			error.value = err
			alertDetails.value = {
				title: "Loading Error",
				desc: `Failed to load ${endpoint} data. Please try to refresh the page.`,
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
			return null
		} finally {
			loading.value = false
		}
	}


	return { alertDetails, alertVisible, data, error, loading, postData }
}
