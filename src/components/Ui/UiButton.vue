<template>
  <button
    :type="type"
    :title="title"
    :class="['ui-button ', `ui-button__${theme}`]"
    :disabled="isDisabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface IProps {
  typeIcon?: string
  type?: 'button' | 'submit' | 'reset' | undefined
  theme?: 'default' | 'delete' | 'white'
  title?: string
  isDisabled?: boolean
}

withDefaults(defineProps<IProps>(), {
  type: undefined,
  theme: 'default',
  isBorder: false,
  isDisabled: false
})
</script>

<style scoped lang="scss">
.ui-button {
  display: flex;
  align-items: center;
  padding: 7px 16px;
  font-size: 14px;
  line-height: 20px;
  white-space: nowrap;
  & img {
    margin-left: 0.5rem;
    background-color: transparent;
  }
  &__default {
    color: var(--white);
    background-color: var(--blue);
    &:hover {
      background-color: var(--blue-2);
    }
    &:active {
      background-color: var(--blue-3);
    }
  }

  &__delete {
    color: var(--white);
    background-color: var(--red);
    &:hover {
      background-color: var(--red-2);
    }
    &:active {
      background-color: var(--red-3);
    }
  }

  &__white {
    color: var(--blue-2);
    background: var(--white);
    &:hover {
      color: var(--white);
      background-color: var(--blue-2);
    }
    &:active {
      color: var(--white);
      background-color: var(--blue-3);
      &.is-border {
        border: 1px solid var(--blue-3);
      }
    }
    &:disabled {
      color: var(--gray-4);
      background-color: transparent;
      &.is-border {
        border: 1px solid var(--gray-light-6);
      }
    }
  }
}
</style>
