<script lang="ts">
import { defineComponent } from 'vue'
import InputField from './InputField.vue'
import TextAreaField from './TextAreaField.vue'
import { Icon } from '@/enums'

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
    startName: String,
    startEmail: String,
  },
  data(): {
    name: string,
    email: string,
    body: string,
    nameError: boolean,
    emailError: boolean,
    bodyError: boolean,
    sendError: boolean,
  } {
    return {
      name: this.startName || '',
      email: this.startEmail || '',
      body: '',
      nameError: false,
      emailError: false,
      bodyError: false,
      sendError: false,
    }
  },
  emits: ['submit', 'update:modelValue'],
  watch: {
    name() {
      this.nameError = false;
    },
    email() {
      this.emailError = false;
    },
    body() {
      this.bodyError = false;
    },
  },
  setup() {
    return { Icon };
  },
  methods: {
    setErrors(
      sendError: boolean = false,
      nameError: boolean = false,
      emailError: boolean = false,
      bodyError: boolean = false
    ) {
      this.sendError = sendError;
      this.nameError = nameError;
      this.emailError = emailError;
      this.bodyError = bodyError;
    },
    handleSubmit() {
      this.sendError = false;
      this.$emit('submit', this.name, this.email, this.body, this.setErrors);
    },
  },
})
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <InputField
      v-model="name"
      :error="nameError"
      name="name"
      label="Author Name"
      placeholder="Name Surname"
      error-message="Name is required"
      :icon="Icon.User"
    />

    <InputField
      v-model="email"
      :error="emailError"
      name="email"
      label="Author Email"
      placeholder="Your Email"
      error-message="Email is required"
      :icon="Icon.Envelope"
    />

    <TextAreaField
      v-model="body"
      :error="bodyError"
      name="body"
      label="Write Post Body"
      placeholder="Comment"
      error-message="Comment is required"
    />

    <div class="field is-grouped">
      <div class="control">
        <button type="submit" class="button is-link">Add Comment</button>
      </div>

      <div class="control">
        <button type="reset" class="button is-link is-light" @click="$emit('update:modelValue', false)">
          Cancel
        </button>
      </div>

      <h3 v-if="sendError" class="mt-2 has-text-centered has-text-danger">
        Something went wrong!
      </h3>
    </div>
  </form>
</template>
