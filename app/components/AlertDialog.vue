<script setup>
const props = defineProps({
    icon: {
        type: String,
        default: '',
        required: false
    },
    title: {
        type: String,
        default: "Alert Title",
        required: true
    },
    desc: {
        type: String,
        default: "Alert Description",
        required: true
    },
    buttons: {
        type: Array,
        default: () => ([
            { label: "OK", class: "btn btn-primary", func: () => console.log(1) }
        ]),
        required: true
    }
})
</script>

<template>
    <div
        class="bg-gray-900/10 !w-full h-screen absolute top-0 left-0 flex justify-center items-center p-5 backdrop-blur-sm">
        <div
            data-aos="fade-up"
            class="bg-[#0F1732] bs-neon rounded-lg p-10 w-full max-w-md text-white transition-transform duration-300 ease-in-out scale-100">
            <div v-if="props.icon" class="flex items-center justify-center mb-4">
                <i :class="props.icon"></i>
            </div>

            <h2 class="text-xl font-semibold text-center">{{ props.title }}</h2>
            <p class="mt-2 text-gray-200 font-thin text-center">{{ props.desc }}</p>

            <div class="mt-10 flex justify-center w-full gap-3">
                
                <button
                    v-for="(button, index) in props.buttons"
                    :key="'button' + index"
                    @click="button.func"
                    :class="button.class"
                >
                    {{ button.label }}
                </button>
            </div>
        </div>
    </div>
</template>