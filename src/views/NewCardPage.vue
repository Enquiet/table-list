<template>
  <div class="card-page">
    <router-link to="/">Назад</router-link>
    <the-card @save="onSaveCard" :is-delete="false" />
  </div>
</template>
<script lang="ts" setup>
import TheCard from '@/components/Card/TheCard.vue'
import { useRouter, RouterLink } from 'vue-router'
import { useStoreUser } from '@/stores/StoreUser'
import type { IUser } from '@/type/IUser'

const router = useRouter()

const { onSaveUser } = useStoreUser()

/**
 * Сохранить карточку
 * @param user
 */
const onSaveCard = (user: IUser) => {
  onSaveUser({
    ...user,
    id: String(Math.floor(Math.random() * (1000 - 1) + 1000))
  })
  router.push({ name: 'main' })
}
</script>
<style lang="scss">
.card-page {
  max-width: 500px;
  margin: 10px auto;
}
</style>
