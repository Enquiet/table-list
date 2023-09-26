<template>
  <div class="card-page">
    <router-link to="/">Назад</router-link>
    <the-card :item="user" @save="onSaveEdit" @delete="onDelete" @add-card="onAddCard" />
  </div>
</template>
<script lang="ts" setup>
import TheCard from '@/components/Card/TheCard.vue'
import { useStoreUser } from '@/stores/StoreUser'
import { storeToRefs } from 'pinia'
import { useRoute, RouterLink, useRouter } from 'vue-router'
import type { IUser } from '@/type/IUser'

const route = useRoute()
const router = useRouter()
const storeUser = useStoreUser()
const { user } = storeToRefs(storeUser)
const { onFindUser, onSaveUser, onDeleteUser } = storeUser
onFindUser(route.params.id as string)
/**
 * Сохранить зименения
 * @param user
 */
const onSaveEdit = (user: IUser) => {
  onSaveUser({
    ...user
  })
}
/**
 * Удалить карточку
 * @param id
 */
const onDelete = (id: string) => {
  onDeleteUser(id)
  router.push({ name: 'main' })
}
/**
 * Добавить новую карточку
 */
const onAddCard = () => {
  router.push({ name: 'newCard' })
}
</script>
<style lang="scss">
.card-page {
  max-width: 500px;
  margin: 10px auto;
}
</style>
