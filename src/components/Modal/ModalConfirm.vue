<template>
  <div class="modal-confirm">
    <h2 class="modal-title modal-confirm__title">
      {{ title }}
    </h2>
    <p class="modal-text modal-confirm__text">
      {{ text }}
    </p>
    <div class="modal-delete__actions">
      <ui-button @click="onClickConfirm"> Подтвердить </ui-button>
      <ui-button theme="white" @click="onClickClose"> Отменить </ui-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import UiButton from '@/components/Ui/UiButton.vue'

interface IEmit {
  (event: 'confirm'): void
  (event: 'close'): void
}
interface IProps {
  title: string
  text: string
}
const emit = defineEmits<IEmit>()
defineProps<IProps>()

/**
 * Подтвердить
 */
const onClickConfirm = () => {
  emit('confirm')
}
/**
 * Отменить
 */
const onClickClose = () => {
  emit('close')
}
</script>
<style lang="scss">
.modal-confirm {
  padding: 16px;
  width: 480px;
  &__title {
    margin-bottom: 32px;
  }
  &__text {
    margin-bottom: 48px;
  }
  &__actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    .icon-delete {
      margin-left: 35px;
    }
    .icon-close {
      margin-left: 8px;
    }
  }
}
</style>
