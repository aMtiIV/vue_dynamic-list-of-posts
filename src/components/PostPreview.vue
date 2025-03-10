<script lang="ts">
import { LoadingStatus, SidebarMode } from '@/enums';
import { getComments } from '@/httpClient';
import type { Comment, Post } from '@/types/types';
import { defineComponent, type PropType } from 'vue';
import PostLoader from './PostLoader.vue';
import NoCommentsYet from './NoCommentsYet.vue';
import PostComment from './PostComment.vue';

export default defineComponent({
  components: {
    PostLoader,
    NoCommentsYet,
    PostComment,
  },
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
  data(): { error: boolean, loadingStatus: LoadingStatus, comments: Comment[] } {
    return {
      error: false,
      loadingStatus: LoadingStatus.Loading,
      comments: [],
    }
  },
  mounted() {
    this.handleCommentsLoad();
  },
  emits: ['postDelete', 'update:modelValue'],
  setup() {
    return { SidebarMode, LoadingStatus };
  },
  methods: {
    setError(error: boolean = false) {
      this.error = error;
    },
    handleDeleteButtonClick() {
      this.setError();
      this.$emit('postDelete', this.post.id, this.setError);
    },
    async handleCommentsLoad() {
      try {
        const loadedComments = await getComments(this.post.id);

        if (loadedComments.length) {
          this.loadingStatus = LoadingStatus.Success;
        } else {
          this.loadingStatus = LoadingStatus.NoData;
        }

        this.comments = loadedComments;
      } catch {
        this.loadingStatus = LoadingStatus.Error;
      }
    },
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

  <div class="block">
    <PostLoader v-if="loadingStatus === LoadingStatus.Loading"/>
    <NoCommentsYet v-else-if="loadingStatus === LoadingStatus.NoData"/>

    <div v-else-if="loadingStatus === LoadingStatus.Error" class="block">
      <p class="title is-4 has-text-danger">Something went wrong!</p>
    </div>

    <PostComment
      v-else
      v-for="comment of comments"
      :key="comment.id"
      :comment="comment"
    />
  </div>
</template>
