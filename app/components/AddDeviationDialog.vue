<script setup>
const props = defineProps({
  // devinfo: {
  //   type: Object,
  //   default:
  //   {
  //     id: 0,
  //     name: "",
  //     desc: "",
  //     location: [
  //       { id: 0, loc: "none" },
  //       { id: 1, loc: "none" },
  //       { id: 2, loc: "none" },
  //       { id: 3, loc: "none" },
  //       { id: 4, loc: "none" },
  //     ],
  //     type: 0,
  //     needs: [],
  //     variants: "none",
  //     note: "",
  //   }
  //   ,
  //   required: true
  // },
  scenarios: {
    type: Array,
    default: () => ([
      { id: 0, name: "Scenario 1" },
      { id: 1, name: "Scenario 2" },
      { id: 2, name: "Scenario 3" },
      { id: 3, name: "Scenario 4" },
      { id: 4, name: "Scenario 5" },
    ]),
    required: true
  },
  locations: {
    type: Array,
    default: () => ([
      { id: 0, name: "Location 1", key: "l1" },
      { id: 1, name: "Location 2", key: "l2" },
      { id: 2, name: "Location 3", key: "l3" },
      { id: 3, name: "Location 4", key: "l4" },
      { id: 4, name: "Location 5", key: "l5" },
    ]),
    required: true
  }
})

</script>

<template>
  <div
    class="bg-gray-900/10 !w-full h-screen absolute top-0 left-0 flex justify-center items-center p-5 backdrop-blur-sm">
    <div data-aos="fade-up"
      class="bg-gray-200 bs-neon rounded-lg p-10 w-full max-w-md text-white transition-transform duration-300 ease-in-out scale-100">

      <h2 class="text-xl text-cyan-800 font-semibold uppercase">Add Deviation</h2>
      <p class="mt-2 text-cyan-800 font-thin">Please fill out all the fields</p>

      <div class="mt-5 flex flex-col w-full gap-3">

        <label for="dev-name" class="text-cyan-800 font-semibold">Deviation Name</label>
        <input type="text" id="dev-name" placeholder="Deviation Name" class="input w-full" />

      </div>
    </div>
  </div>
</template>

<style scoped></style>