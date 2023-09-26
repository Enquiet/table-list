<template>
  <table class="table">
    <thead class="table__head">
      <tr class="table__row">
        <td v-for="field in fields" :key="`tdHead-${field.id}`" class="table__col">
          {{ field.title }}
        </td>
      </tr>
    </thead>
    <tbody class="table__body">
      <tr
        v-for="trItem in list"
        :key="`trBody-${trItem.id}`"
        @click="onClickOpen(trItem.id as unknown as string)"
        class="table__row"
      >
        <td v-for="(item, tdBody) in trItem" :key="`tdBody-${tdBody}`" class="table__col">
          {{ item }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
import type { ITableBody, ITableHeader } from '@/type/ITable'

interface IEmit {
  (event: 'open', value: string): void
}
interface IProps {
  fields: ITableHeader[]
  list: ITableBody[]
}
const emit = defineEmits<IEmit>()
defineProps<IProps>()
/**
 * Открыаем елемент таблицы
 * @param id
 */
const onClickOpen = (id: string) => {
  emit('open', id)
}
</script>
<style lang="scss">
.table {
  border-collapse: collapse;
  &__head {
    background: #f8f8f8;
  }
  &__row {
    border-bottom: 1px solid #e2e2e2;
    border-collapse: collapse;
  }
  &__col {
    padding: 2px 10px;
    &--center {
      text-align: center;
    }
    .table__row {
      cursor: pointer;
    }
    svg {
      color: var(--dark-gray);
    }
  }
  &__body {
    .table__col {
      cursor: pointer;
    }
  }
}
</style>
