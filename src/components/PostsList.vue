<script lang="ts">
import { LoadingStatus } from '@/enums'
import type { Post } from '@/types/types'
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import PostLoader from './PostLoader.vue'

export default defineComponent({
  components: {
    PostLoader,
  },
  props: {
    modelValue: {
      type: Boolean,
      reqired: true,
    },
    posts: {
      type: Array as PropType<Post[]>,
      required: true,
    },
    loadingStatus: {
      type: Number as PropType<LoadingStatus>,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup() {
    return { LoadingStatus };
  },
})
</script>

<template>
  <div class="tile is-parent">
    <div class="tile is-child box is-success">
      <div class="block">
        <div class="block is-flex is-justify-content-space-between">
          <p class="title">Posts</p>

          <button
            type="button"
            class="button is-link"
            :class="{'is-light': modelValue}"
            @click="$emit('update:modelValue', true)"
          >
            Add New Post
          </button>
        </div>

        <PostLoader v-if="loadingStatus === LoadingStatus.Loading" />

        <h3 v-else-if="loadingStatus === LoadingStatus.NoData" class="mt-2 has-text-centered">
          No posts yet.
        </h3>

        <h3
          v-else-if="loadingStatus === LoadingStatus.Error"
          class="mt-2 has-text-centered has-text-danger"
        >
          Something went wrong
        </h3>

        <table v-else class="table is-fullwidth is-striped is-hoverable is-narrow">
          <thead>
            <tr class="has-background-link-light">
              <th>ID</th>
              <th>Title</th>
              <th class="has-text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="post of posts" :key="post.id">
              <td>{{ post.id }}</td>
              <td>{{ post.title }}</td>
              <td class="has-text-right is-vcentered">
                <button type="button" class="button is-link is-light">Open</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
