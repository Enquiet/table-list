<template>
  <teleport to="#main-page">
    <div class="modal">
      <div v-if="closeOutside" class="modal__mask" @click="onClickClose"></div>
      <div v-else class="modal__mask"></div>
      <div class="modal__body">
        <button v-if="!closeOutside && isClose" class="modal__close" @click="onClickClose">
          <close-icon width="16" height="16" />
        </button>
        <slot />
      </div>
    </div>
  </teleport>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import CloseIcon from '@/components/Icons/CloseIcon.vue'

interface IEmit {
  (event: 'close'): void
}
interface IProps {
  closeOutside?: boolean
  isClose?: boolean
}
withDefaults(defineProps<IProps>(), {
  closeOutside: true,
  isClose: true
})
const emit = defineEmits<IEmit>()

const onClickClose = () => {
  emit('close')
}

onMounted(() => {
  document.body.style.overflow = 'hidden'
})
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>
<style lang="scss">
.modal {
  &__mask {
    background: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
  }
  &__body {
    position: fixed;
    z-index: 99999;
    background: #eee;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &__close {
    position: absolute;
    right: 20px;
    top: 23px;
    z-index: 999999;
  }
  &-title {
    font-weight: 550;
    font-size: 24px;
    line-height: 24px;
  }
  &-text {
    color: var(--dark-gray-2);
  }
}
</style>
