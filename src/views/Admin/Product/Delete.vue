<template>   
  <v-modal
    :open="deleteModal"
    @onClose="closeModal"
    @onSubmit="submitModal"
    title="Deseja realmente deletar essa categoria ?"
    modalType="warning"
  />
</template>

<script setup>
import useCategories from '../../../composables/categories'
import { defineEmits, ref, defineExpose } from 'vue'

const emit = defineEmits(['onDelete']);

let deleteModal = ref(false)
let selectedItem = ref(null)

const { deleteCategory } = useCategories()

const closeModal = () => {
  deleteModal.value = false
  selectedItem.value = null
}
const openModal = (id) => {
  deleteModal.value = true
  selectedItem.value = id
}
const submitModal = async () => {
  await deleteCategory(selectedItem.value)
  closeModal()
  emit('onDelete')
}

defineExpose({
  openModal
})


</script>