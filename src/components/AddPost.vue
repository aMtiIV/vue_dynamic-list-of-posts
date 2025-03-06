<script lang="ts">
import { defineComponent } from 'vue'
import InputField from './InputField.vue'
import TextAreaField from './TextAreaField.vue'

export default defineComponent({
  components: {
    InputField,
    TextAreaField,
  },
  props: {
    modelValue: {
      type: Boolean,
      reqired: true,
    },
  },
  data() {
    return {
      title: '',
      body: '',
      titleError: false,
      bodyError: false,
      sendError: false,
    }
  },
  emits: ['postAdd','update:modelValue'],
  watch: {
    title() {
      this.titleError = false;
    },
    body() {
      this.bodyError = false
    },
  },
  methods: {
    setErrors(sendError?: boolean, titleError?: boolean, bodyError?: boolean) {
      this.sendError = !!sendError;
      this.titleError = !!titleError;
      this.bodyError = !!bodyError;

      if (!sendError && !titleError && !bodyError) {
        this.title = '';
        this.body = '';
      }
    },
    handleSubmit() {
      this.$emit('postAdd', this.title, this.body, this.setErrors);
    },
  },
})
</script>

<template>
  <div class="content">
    <h2>Create new post</h2>

    <form @submit.prevent="handleSubmit">
      <InputField
        v-model="title"
        :error="titleError"
        name="title"
        label="Title"
        placeholder="Post title"
        error-message="Title is required"
      />

      <TextAreaField
        v-model="body"
        :error="bodyError"
        name="body"
        label="Write Post Body"
        placeholder="Post body"
        error-message="Body is required"
      />

      <div class="field is-grouped">
        <div class="control">
          <button type="submit" class="button is-link">Create</button>
        </div>

        <div class="control">
          <button type="reset" class="button is-link is-light" @click="$emit('update:modelValue', false)">Cancel</button>
        </div>

        <h3 v-if="sendError" class="mt-2 has-text-centered has-text-danger">
          Something went wrong!
        </h3>
      </div>
    </form>
  </div>
</template>
