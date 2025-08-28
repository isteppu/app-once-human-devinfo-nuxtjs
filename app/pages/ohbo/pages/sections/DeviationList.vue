<script setup>
import { ref } from 'vue';

</script>

<template>
  <div data-aos="slide-up">
    <div class="w-full p-10 rounded-md">
      <h1 class="text-2xl font-bold">Deviation List</h1>
      <h1 class="text-md font-thin mt-2">Add, update, delete registered deviation.</h1>
      <div class="mt-5 w-full bg-gray-300 rounded-md p-5">
        <div class="flex justify-end gap-3 w-full">
          <label class="input !outline-none bg-white">
            <Icon name="ic:round-search" class="text-2xl text-gray-500/50"/>
            <input type="search" class="grow placeholder:text-gray-500/50 text-gray-500" placeholder="Search" />
          </label>
          <button class="bg-cyan-900 px-5 py-2 rounded-xs text-sm shadow-md hover:bg-neutral-900">Add Deviation</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>