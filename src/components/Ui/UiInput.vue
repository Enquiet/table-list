<template>
  <div ref="customInput" class="input-control">
    <label v-if="label" class="input-control__title">{{ label }}</label>
    <div class="input-control__wrapper">
      <div :class="['input-control__inner']">
        <input
          ref="inputEl"
          :value="modelValue"
          :placeholder="placeholder"
          :type="type"
          @input="onInput"
        />
      </div>
      <close-icon height="10" width="10" @click="clearData" />
    </div>
    <div v-for="(error, index) in errorList" :key="index" class="input-control__errors">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import CloseIcon from '@/components/Icons/CloseIcon.vue'
import { computed, ref } from 'vue'
import type { ErrorObject } from '@vuelidate/core'
interface IEmit {
  (event: 'update:modelValue', modelValue: string | number | null): void
  (event: 'input', value: string | number): void
  (event: 'change', value: string | number | null): void
  (event: 'clear'): void
}

const emit = defineEmits<IEmit>()
const props = withDefaults(
  defineProps<{
    modelValue: string | number | null
    placeholder?: string
    label?: string | number
    type?: string
    isClear?: boolean
    errors?: ErrorObject[]
  }>(),
  {
    modelValue: '',
    type: 'text',
    label: '',
    placeholder: '',
    isClear: false
  }
)

const customInput = ref<HTMLDivElement>()
const inputEl = ref<HTMLInputElement>()

const clearData = () => {
  emit('input', '')
  emit('update:modelValue', '')
}

const onInput = (e: Event) => {
  let value = (e.target as HTMLInputElement).value
  emit('input', value)
  emit('update:modelValue', value)
}

const errorList = computed(() => {
  return props.errors?.length ? props.errors.map((item: ErrorObject) => item.$message) : []
})
</script>
<style lang="scss">
.input-control {
  display: grid;
  position: relative;
  &__title {
    margin-bottom: 10px;
    color: var(--dark-gray-2);
  }
  & span {
    font-weight: normal;
    margin-bottom: 8px;
    color: var(--dark-gray-2);
  }

  &__line {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border: none;
    border-bottom: 1px solid var(--gray-light-3);
  }

  &__wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    background-color: var(-gray-light-4);
    padding: 0 15px 0 10px;
    height: 100%;
    border-bottom: 1px solid var(--gray-light-5);
    &:focus-within {
      outline: 2px solid var(--blue-2);
    }
    &:focus-within > hr {
      display: none !important;
    }
    & input {
      outline: none;
      border: none;
      height: 32px;
      padding: 5px 0;
      background-color: transparent;
      width: 100%;
      font-family: inherit;
      font-size: inherit;
      text-decoration: none;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
      &::placeholder {
        color: rgba(111, 111, 111, 1);
        font-size: 14px;
        line-height: 20px;
      }
    }
    & i {
      color: black;
    }
  }
  &__inner {
    display: flex;
    width: 100%;
    align-items: center;
    &.is-transform {
      flex-wrap: wrap;
    }
  }

  &__clear-icon {
    cursor: pointer;
    flex: 0 0 10px;
  }

  &__errors {
    color: var(--red-2);
  }
}
</style>
