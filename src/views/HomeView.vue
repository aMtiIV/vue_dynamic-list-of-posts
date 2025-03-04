<script lang="ts">
import PostsList from '@/components/PostsList.vue'
import { LoadingStatus } from '@/enums';
import { getPosts } from '@/httpClient';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    PostsList,
  },
  data() {
    return {
      posts: [],
      loadingStatus: LoadingStatus.Loading,
    }
  },
  mounted() {
    getPosts(11).then(data => {
      if (data.length) {
        this.loadingStatus = LoadingStatus.Success;
      } else {
        this.loadingStatus = LoadingStatus.NoData;
      }

      this.posts = data;
    }).catch(() => this.loadingStatus = LoadingStatus.Error);
  },
});
</script>

<template>
  <main class="section">
    <div class="container">
      <div class="tile is-ancestor">
        <PostsList :posts="posts" :loading-status="loadingStatus"/>
      </div>
    </div>
  </main>
</template>
