<template>
  <div class="main-page">
    <ui-button @click="addNewCard"> Добавить</ui-button>
    <the-table :fields="userField" :list="userList" @open="onOpenCard" />
  </div>
</template>
<script lang="ts" setup>
import TheTable from '@/components/Table/TheTable.vue'
import UiButton from '@/components/Ui/UiButton.vue'
import { useStoreUser } from '@/stores/StoreUser'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()

const storeUser = useStoreUser()
const { userField, userList } = storeToRefs(storeUser)

/**
 * Добавить карточку
 */
const addNewCard = () => {
  router.push({ name: 'newCard' })
}
/**
 * Открыть карточку
 * @param id
 */
const onOpenCard = (id: string) => {
  router.push({ name: 'userCard', params: { id } })
}
</script>
<style lang="scss"></style>
