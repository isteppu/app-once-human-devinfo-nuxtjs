<script setup>
import { onMounted } from "vue";

const {
  deviations,
  locations,
  scenarios,
  devTypes,
  devNeeds,
  fetchAlertDetails,
  fetchAlertVisible,
  refreshDevs
} = useFetchData();

const {
  alertDetails,
  alertVisible
} = usePostData();

const { addDevDialogVisible, openAddDevDialog } = useUi();

const { deleteAlertDetails, deleteAlertVisible, deleteData } = useDeleteData();

</script>

<template>
  <div class="h-full relative">
    <div class="w-full px-2 pt-5 md:p-10 h-full">
      <h1 class="text-2xl font-bold">Deviation List</h1>
      <h1 class="text-md font-thin mt-2">
        Add, update, delete registered deviation.
      </h1>
      <div class="mt-5 w-full bg-gray-300 rounded-md p-5 max-h-[650px] h-full">
        <div class="flex flex-col md:flex-row justify-end gap-3 w-full">
          <label class="input !outline-none bg-white">
            <Icon name="ic:round-search" class="text-2xl text-gray-500/50" />
            <input type="search" class="grow placeholder:text-gray-500/50 text-gray-500" placeholder="Search" />
          </label>
          <button class="bg-cyan-900 px-5 py-2 rounded-xs text-sm shadow-md hover:bg-neutral-900 hover:cursor-pointer"
            @click="openAddDevDialog">
            Add Deviation
          </button>
        </div>
        <div class="w-full mt-5 overflow-y-scroll border-1 border-cyan-900/80 rounded-md">
          <table class="table">
            <thead class="text-white border-b-1 border-cyan-900/30 bg-cyan-800/90">
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Settings</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody v-if="deviations">
              <tr v-for="(deviation, index) in deviations.result" :key="'deviation-list' + index"
                class="bg-white border-b-1 border-cyan-900/30">
                <td class="text-xs text-cyan-800">{{ deviation.id + 1 }}</td>
                <td class="text-md text-cyan-800 font-extrabold">
                  00{{ deviation.id }}
                </td>
                <td>
                  <div class="flex items-center gap-3">
                    <div class="avatar">
                      <div class="mask mask-squircle h-12 w-12">
                        <img :src="`/assets/images/deviations/${deviation.id + 1
                          }.jpg`" :alt="deviation.name + ' image'" />
                      </div>
                    </div>
                    <div>
                      <div class="font-bold text-cyan-800">
                        {{ deviation.name }}
                      </div>
                      <div class="text-sm opacity-50 text-cyan-800">
                        {{
                          deviation.type === 0
                            ? "Territorry"
                            : deviation.type === 1
                              ? "Crafting"
                              : "Combat"
                        }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="text-cyan-800">{{ deviation.desc }}</td>
                <td>
                  <button class="btn btn-sm bg-cyan-900 text-white uppercase font-extrabold">
                    Edit info
                  </button>
                </td>
                <td>
                  <button class="btn btn-sm bg-red-900 text-white" @click="async() => { await deleteData(`/deviations/${deviation.id}`, deviation.name); refreshDevs()}">
                    <Icon name="mdi:delete" class="text-lg"></Icon>
                  </button>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr class="bg-white">
                <td colspan="6" class="text-center">
                  <span class="loading loading-ring loading-lg text-cyan-900"></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <AddDeviationDialog v-if="locations && scenarios && addDevDialogVisible" :locations="locations.result"
      :scenarios="scenarios.result" :devTypes="devTypes.result" :devNeeds="devNeeds.result" :deviations="deviations.result" />
    <AlertDialog v-if="alertVisible" :title="alertDetails.title" :desc="alertDetails.desc"
      :buttons="alertDetails.buttons" />
    <AlertDialog v-if="fetchAlertVisible" :title="fetchAlertDetails.title" :desc="fetchAlertDetails.desc"
      :buttons="fetchAlertDetails.buttons" />
    <AlertDialog v-if="deleteAlertVisible" :title="deleteAlertDetails.title" :desc="deleteAlertDetails.desc"
      :buttons="deleteAlertDetails.buttons" />
  </div>
</template>

<style scoped></style>
