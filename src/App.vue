<script setup>
import Heading from './components/Heading.vue';


</script>

<template>
  <div class="h-dvh w-full overflow-y-scroll overflow-x-hidden font-fredoka bg-baby-blue">
    <Heading />
    <router-view></router-view>
  </div>
</template>