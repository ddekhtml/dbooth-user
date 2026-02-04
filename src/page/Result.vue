<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../utils/supabase'

const route = useRoute()
const router = useRouter()

const photos = ref([])
const currentIndex = ref(0)

onMounted(async () => {
  const baseId = route.params.uuid

  if (!baseId) {
    router.push('/')
    return
  }

  const { data, error } = await supabase
    .from('photos')
    .select('url')
    .eq('base_id', baseId)

  if (error) {
    router.push('/')
  } else {
    photos.value = data
  }
})

const currentPhoto = computed(() => {
  return photos.value[currentIndex.value]
})

function nextPhoto() {
  if (currentIndex.value < photos.value.length - 1) {
    currentIndex.value++
  }
}

function prevPhoto() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}
const downloadPhoto = async (url, filename = 'photo.jpg') => {
  try {
    const response = await fetch(url)
    const blob = await response.blob()

    const blobUrl = window.URL.createObjectURL(blob)
    const a = document.createElement('a')

    a.href = blobUrl
    a.download = filename
    document.body.appendChild(a)
    a.click()

    document.body.removeChild(a)
    window.URL.revokeObjectURL(blobUrl)
  } catch (err) {
    console.error('Download failed:', err)
  }
}



</script>
<template>
  <div class="w-full min-h-screen flex flex-col items-center px-6 justify-items-start">
    <div class="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
      <img
        v-if="currentPhoto"
        :src="currentPhoto.url"
        class="w-full h-auto object-contain rounded-2xl shadow-xl"
      />
    </div>

    <!-- CONTROLS -->
    <div class="mt-6 flex items-center gap-6 bg-white/70 backdrop-blur px-6 py-3 rounded-full shadow-lg">

      <!-- PREVIOUS -->
      <button
        @click="prevPhoto"
        :disabled="currentIndex === 0"
        class="text-dark-blue disabled:opacity-30"
      >
        <v-icon name="fa-chevron-left" scale="1.3" />
      </button>

      <!-- DOWNLOAD -->
      <button
        @click.prevent.stop="downloadPhoto(currentPhoto.url, `photo-${currentIndex + 1}.jpg`)"
        class="text-dark-blue"
      >
        <v-icon name="fa-download" scale="1.4" />
      </button>

      <!-- NEXT -->
      <button
        @click="nextPhoto"
        :disabled="currentIndex === photos.length - 1"
        class="text-dark-blue disabled:opacity-30"
      >
        <v-icon name="fa-chevron-right" scale="1.3" />
      </button>

    </div>

    <!-- INFO -->
    <p class="mt-4 text-xs text-baby-blue text-center bg-dark-blue w-fit rounded-2xl p-2 px-5">
      Photo akan terhapus otomatis setelah 7 hari
    </p>
  </div>
</template>
