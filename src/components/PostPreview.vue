<script lang="ts">
import { SidebarMode } from '@/enums';
import type { Post } from '@/types/types';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  props: {
    modelValue: {
      type: String as PropType<SidebarMode>,
      reqired: true,
    },
    post: {
      type: Object as PropType<Post>,
      required: true,
    }
  },
  data(): { error: boolean } {
    return {
      error: false,
    }
  },
  emits: ['postDelete', 'update:modelValue'],
  setup() {
    return { SidebarMode };
  },
  methods: {
    setError(error: boolean = false) {
      this.error = error;
    },
    handleDeleteButtonClick() {
      this.setError();
      this.$emit('postDelete', this.post.id, this.setError);
    }
  },
});
</script>

<template>
  <div class="block">
    <div
      class="is-flex is-justify-content-space-between is-align-items-center"
    >
      <h2>#{{post.id}}: {{post.title}}</h2>

      <div class="is-flex">
        <span @click="$emit('update:modelValue', SidebarMode.Edit)" class="icon is-small is-right is-clickable">
          <i class="fas fa-pen-to-square"></i>
        </span>

        <span
          @click="handleDeleteButtonClick"
          class="icon is-small is-right has-text-danger is-clickable ml-3"
        >
          <i class="fas fa-trash"></i>
        </span>
      </div>
    </div>

    <h3
      v-if="error"
      class="mt-2 has-text-centered has-text-danger"
    >
      Something went wrong!
    </h3>

    <p data-cy="PostBody">{{post.body}}</p>
  </div>
</template>
