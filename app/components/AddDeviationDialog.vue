<script setup>
import { ref, computed } from 'vue';
import { useUi } from '#imports';

const { closeAddDevDialog } = useUi();
const props = defineProps({
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
  },
  devTypes: {
    type: Array,
    default: () => ([
      { id: 0, type: "type 1" },
      { id: 1, type: "type 2" },
    ]),
    required: true
  }
})

const checked = ref(
  props.scenarios.map(() => props.locations.map(() => false))
);

const location = computed(() =>
  checked.value.map((row, rowIndex) => {
    const loc = row
      .map((isChecked, colIndex) => (isChecked ? colIndex : null))
      .filter((v) => v !== null);

    return {
      id: rowIndex,
      loc: loc.length > 0 ? loc : "none",
    };
  })
);

const logData = () => {
  console.log("📦 Output:", location.value);
};

</script>

<template>
  <div class="!w-full h-screen absolute -top-10 left-0 flex justify-center items-center p-5 backdrop-blur-sm">
    <div data-aos="fade-up"
      class="bg-gray-200 bs-neon rounded-lg p-10 max-w-xlg text-white transition-transform duration-300 ease-in-out scale-100">

      <h2 class="text-xl text-cyan-800 font-semibold uppercase">Add Deviation</h2>
      <p class="mt-2 text-cyan-800 font-thin">Please fill out all the fields</p>

      <div class="mt-5 flex flex-col w-full gap-3">
        <div class="flex flex-row">
          <div class="flex flex-col gap-2">
            <label for="dev-name" class="text-cyan-800 text-sm font-bold">Name</label>
            <input type="text" id="dev-name" placeholder="Deviation Name"
              class="input bg-white !outline-none placeholder:text-gray-500/50 text-gray-500 w-full md:w-[300px]" />
            <label for="dev-description" class="text-cyan-800 text-sm font-bold">Description</label>
            <textarea type="text" id="dev-description" placeholder="Type description here.. "
              class="textarea bg-white !outline-none placeholder:text-gray-500/50  text-gray-500 w-full md:w-[300px] multiline"></textarea>
            <label for="dev-type" class="text-cyan-800 text-sm font-bold">Type</label>
            <select id="dev-type" class="select  w-full md:w-[300px] bg-white !outline-none text-gray-500/50 ">
              <option disabled selected>Deviation Type</option>
              <option v-for="(type, index) in devTypes" :key="'dev-type-option-' + index">
                {{ type.type }}
              </option>
            </select>
          </div>
          <div class="pl-20">
            <label for="dev-location" class="ml-2 text-cyan-800 text-sm font-bold">Locations</label>
            <table id="dev-location" class="table-xs border-collapse w-full md:w-[400px] text-center">
              <thead>
                <tr>
                  <th class="text-cyan-800/60 uppercase text-left">Scenarios</th>
                  <th v-for="(head, hIndex) in props.locations" class="uppercase text-cyan-800/60"
                    :key="'Location Header Name ' + hIndex">
                    <div class="dropdown dropdown-hover hover:cursor-help">
                      <div role="button" :tabindex="hIndex" class="flex gap-1">
                        <h1>{{ head.key }}</h1>
                        <Icon name="mdi:help-circle-outline" class="text-neutral-400 text-xs" />
                      </div>
                      <div :tabIndex="hIndex" class="card card-sm dropdown-content bg-white rounded-box z-1 shadow-sm">
                        <div class="card-body">
                          <p class="capitalize text-left">{{ head.name }}</p>
                        </div>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(scenario, rowIndex) in props.scenarios" :key="'Scenario Row Name ' + rowIndex">
                  <td class="text-cyan-800 text-left">{{ scenario.name }}</td>
                  <td v-for="(head, colIndex) in locations" :key="colIndex">
                    <input type="checkbox" class="bg-white checkbox checkbox-accent" v-model="checked[rowIndex][colIndex]" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>

        </div>
        <div class="flex flex-row gap-2 mt-4">
          <button @click="logData" class="btn bg-cyan-800 text-white rounded ">
            Log Data
          </button>
          <button @click="closeAddDevDialog" class="btn bg-red-900 text-white rounded ">
            Cancel
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped></style>