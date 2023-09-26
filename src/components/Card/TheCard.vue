<template>
  <div class="card">
    <ui-button v-if="item?.id" @click="onClickAddCard" class="card__add"> Добавить</ui-button>
    <form class="card__form" @submit.prevent="onSave">
      <ui-input v-model="form.name" label="Имя" :errors="v$.name.$errors" />
      <ui-input v-model.number="form.age" label="Возраст" :errors="v$.age.$errors" />
      <div class="card__actions">
        <ui-button> Сохранить</ui-button>
        <ui-button
          @click="onToggleConfirmModal('close')"
          type="button"
          :is-disabled="isCloseDisabled"
          theme="white"
        >
          Отменить
        </ui-button>
        <ui-button
          v-if="isDelete"
          @click="onToggleConfirmModal('delete')"
          type="button"
          theme="delete"
        >
          Удалить
        </ui-button>
      </div>
    </form>
    <the-modal v-if="isOpenConfirmModal">
      <modal-confirm
        title="Подтвердить действие"
        :text="computedActions.title"
        @delete="computedActions.cb"
        @close="onToggleConfirmModal"
      />
    </the-modal>
  </div>
</template>
<script lang="ts" setup>
import UiInput from '@/components/Ui/UiInput.vue'
import UiButton from '@/components/Ui/UiButton.vue'
import TheModal from '@/components/Modal/TheModal.vue'
import ModalConfirm from '@/components/Modal/ModalConfirm.vue'
import { computed, ref, watch } from 'vue'
import { helpers, required, numeric } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import type { IUser } from '@/type/IUser'

type Action = 'close' | 'delete'
interface IEmit {
  (event: 'save', value: IUser): void
  (event: 'add-card'): void
  (event: 'delete', value: string): void
}
interface IProps {
  item?: IUser
  isDelete?: boolean
}
const emit = defineEmits<IEmit>()
const props = withDefaults(defineProps<IProps>(), {
  item: undefined,
  isDelete: true
})
const DEFAULT_FORM = {
  id: '',
  name: '',
  age: null
}
const validationRules = {
  name: {
    required: helpers.withMessage('Введите имя', required)
  },
  age: {
    required: helpers.withMessage('Введите возраст', required),
    numeric: helpers.withMessage('Введите возраст верно', numeric)
  }
}
const form = ref(props.item ? { ...props.item } : { ...DEFAULT_FORM })
const v$ = useVuelidate(validationRules, form)

const isOpenConfirmModal = ref(false)
const action = ref<Action>('delete')
const onToggleConfirmModal = (value?: Action) => {
  if (value) action.value = value
  isOpenConfirmModal.value = !isOpenConfirmModal.value
}

const computedActions = computed(() => {
  const actions = {
    close: {
      title: 'Отменить',
      cb: () => onClose()
    },
    delete: {
      title: 'Удалить',
      cb: () => onDelete()
    }
  }
  return actions[action.value]
})
/**
 * Сохранить изменения
 */
const onSave = async () => {
  const valid = await v$.value.$validate()
  if (valid) emit('save', form.value)
}
/**
 * Отменить изменения
 */
const onClose = () => {
  form.value = { ...props.item } as IUser
  onToggleConfirmModal()
}
/**
 * Удалить
 */
const onDelete = () => {
  emit('delete', props.item?.id as string)
  onToggleConfirmModal()
}
/**
 * Добавить новое
 */
const onClickAddCard = () => {
  emit('add-card')
}

const isCloseDisabled = ref(true)
/**
 * Наблюдаем за изменениями чтобы раздизейблить кнопку "Отменить"
 */
watch(
  () => form.value,
  () => {
    isCloseDisabled.value = false
  },
  {
    deep: true
  }
)
</script>
<style lang="scss">
.card {
  &__actions {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
  .ui-button {
    &:not(:first-child) {
      margin-left: 10px;
    }
  }
  &__add {
    margin-left: auto;
  }
}
</style>
