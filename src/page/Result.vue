<template>
    <div>
        {{ uuid }}
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

    const route = useRoute()
    const uuid = route.params.uuid
</script>