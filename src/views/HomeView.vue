<script lang="ts">
import AddPost from '@/components/AddPost.vue'
import DetailsSidebar from '@/components/DetailsSidebar.vue'
import PostsList from '@/components/PostsList.vue'
import { LoadingStatus } from '@/enums'
import { getPosts, postPost } from '@/httpClient'
import type { Post } from '@/types/types'
import type { SetAddPostErrors } from '@/types/functions'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    PostsList,
    DetailsSidebar,
    AddPost,
  },
  data(): { posts: Post[]; loadingStatus: LoadingStatus, sliderbarOpened: boolean } {
    return {
      posts: [],
      loadingStatus: LoadingStatus.Loading,
      sliderbarOpened: false,
    }
  },
  mounted() {
    this.handlePostsLoad();
  },
  methods: {
    async handlePostsLoad() {
      try {
        const loadedPosts = await getPosts(11);

        if (loadedPosts.length) {
          this.loadingStatus = LoadingStatus.Success;
        } else {
          this.loadingStatus = LoadingStatus.NoData;
        }

        this.posts = loadedPosts;
      } catch {
        this.loadingStatus = LoadingStatus.Error;
      }
    },
    async handlePostAdd(title: string, body: string, setErrors: SetAddPostErrors) {
      const trimmedTitle = title.trim();
      const trimmedBody = body.trim();

      if (trimmedTitle && trimmedBody) {
        try {
          const sentPost = await postPost({
            userId: 11,
            title: trimmedTitle,
            body: trimmedBody,
          });

          this.posts.push(sentPost);
          setErrors();
        } catch {
          setErrors(true);
        }
      } else {
        setErrors(false, !trimmedTitle, !trimmedBody);
      }
    },
  },
})
</script>

<template>
  <main class="section">
    <div class="container">
      <div class="tile is-ancestor">
        <PostsList :posts="posts" :loading-status="loadingStatus" v-model="sliderbarOpened"/>

        <DetailsSidebar :class="{'Sidebar--open': sliderbarOpened}">
          <template #default>
            <AddPost @post-add="handlePostAdd" v-model="sliderbarOpened"/>
          </template>
        </DetailsSidebar>
      </div>
    </div>
  </main>
</template>
