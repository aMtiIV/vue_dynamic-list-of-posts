<script lang="ts">
import type { Comment } from '@/types/types';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  props: {
    comment: {
      type: Object as PropType<Comment>,
      required: true,
    }
  }
});
</script>

<template>
  <article className="message is-small">
    <div className="message-header">
      <a :href="`mailto:${comment.email}`">{{ comment.name }}</a>

      <button type="button" className="delete is-small" aria-label="delete">
        delete button
      </button>
    </div>

    <div className="message-body">{{comment.body}}</div>
  </article>
</template>
