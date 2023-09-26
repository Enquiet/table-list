<template>
  <div id="main-page">
    <RouterView />
  </div>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useStoreUser } from '@/stores/StoreUser'

const { getUserField, getUserList } = useStoreUser()
getUserField()
getUserList()
</script>

<style scoped></style>
