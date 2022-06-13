<template>
<div>
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700">
        {{ label }}
    </label>
    <div class="mt-1 relative rounded-md shadow-sm">
        <Multiselect
          v-model="selectedValue"
          :options="options"
          mode="tags"
          track-by="id"
          label="name"
          :classes="selectClass"
          :required="required"          
          :close-on-select="false"
          @change="(value) => $emit('update:modelValue', value)"
        >
          <template v-slot:tag="{ option, handleTagRemove, disabled }">
            <div
              class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
              :class="{
                'is-disabled': disabled
              }"
            >
              {{ option.id }} - {{ option.name }}
              <span
                v-if="!disabled"
                class="multiselect-tag-remove"
                @click="handleTagRemove(option, $event)"
              >
              <span class="multiselect-tag-remove-icon"></span>
              </span>
            </div>
          </template>
        </Multiselect>      
    <div v-if="error" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <!-- <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" /> -->
    </div>
    </div>
    <p v-if="error" class="mt-2 text-sm text-red-600" :id="`${id}-error`">{{ error }}</p>
</div>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref } from 'vue'
import Multiselect from '@vueform/multiselect'

const props = defineProps({
   disabled: {
      type: Boolean,
      default() {
        return false
      },
    },
    id: {
      type: String,
      default() {
        return `text-input-id`
      },
    },
    name: {
      type: String,
      default() {
        return `text-input-name`
      },
    },
    type: {
      type: String,
      default() {
        return `text`
      },
    },
    autocomplete: {
      type: String,
      default() {
        return `off`
      },
    },
    options: {
      type: Array,
      default() {
        return []
      },
    },

    value: Array,
    label: String,
    error: String,

    required: {
      type: Boolean,
      default() {
        return false
      }
    },
})
let selectedValue = ref()
const selectClass = computed(() => {
  switch (null) {
    default:
      return {
        containerActive: 'ring ring-indigo-500 ring-opacity-30',
        tag: 'bg-indigo-500 text-white text-sm font-semibold py-0.5 pl-2 rounded mr-1 mb-1 flex items-center whitespace-nowrap rtl:pl-0 rtl:pr-2 rtl:mr-0 rtl:ml-1',
        groupLabelSelected: 'bg-indigo-600 text-white',
        groupLabelSelectedPointed: 'bg-indigo-600 text-white opacity-90',
        groupLabelSelectedDisabled: 'text-indigo-100 bg-indigo-600 bg-opacity-50 cursor-not-allowed',
        optionSelected: 'text-white bg-indigo-500',
        optionSelectedPointed: 'text-white bg-indigo-500 opacity-90',
        optionSelectedDisabled: 'text-indigo-100 bg-indigo-500 bg-opacity-50 cursor-not-allowed',
      }
  }
})

</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style>
  .multiselect-tag.is-user {
    padding: 5px 8px;
    border-radius: 22px;
    background: #35495e;
    margin: 3px 3px 8px;
  }

  .multiselect-tag.is-user img {
    width: 18px;
    border-radius: 50%;
    height: 18px;
    margin-right: 8px;
    border: 2px solid #ffffffbf;
  }

  .multiselect-tag.is-user i:before {
    color: #ffffff;
    border-radius: 50%;;
  }

  .user-image {
    margin: 0 6px 0 0;
    border-radius: 50%;
    height: 22px;
  }
</style>