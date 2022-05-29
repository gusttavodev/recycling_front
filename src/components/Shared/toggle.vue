<!-- This example requires Tailwind CSS v2.0+ -->
<template>
   <label v-if="props.label" :for="props.id" class="block text-sm font-medium text-gray-700">
        {{ props.label }}
    </label>
    <div class="mt-1 relative rounded-md shadow-sm">
        <Switch v-model="enable" :class="[enable ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500']">
    <span class="sr-only">Use setting</span>
    <span aria-hidden="true" :class="[enable ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']" />
  </Switch>
    <div v-if="error" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
    </div>
    </div>
    <p v-if="error" class="mt-2 text-sm text-red-600" :id="`${props.id}-error`">{{ props.error }}</p>
</template>

<script setup>
import { ref, defineProps, computed, defineEmits } from 'vue'
import { Switch } from '@headlessui/vue'

const props = defineProps({
  label: {
    type: [String, Boolean],
    default: false
  },
  error: {
    type: [String, Boolean],
    default: false
  },
  id: {
    type: [String, Number],
    default: 'switch'
  },
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue']);

const enable = computed({
  get () {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val);
  }
})

</script>