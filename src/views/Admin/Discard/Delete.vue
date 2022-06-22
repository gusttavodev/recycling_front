<template>   
  <v-modal
    :open="deleteModal"
    @onClose="closeModal"
    @onSubmit="submitModal"
    title="Deseja realmente deletar esse produto ?"
    modalType="warning"
  />
</template>

<script setup>
import userProduct from '../../../composables/product'
import { defineEmits, ref, defineExpose } from 'vue'

const emit = defineEmits(['onDelete']);

let deleteModal = ref(false)
let selectedItem = ref(null)

const { deleteProduct } = userProduct()

const closeModal = () => {
  deleteModal.value = false
  selectedItem.value = null
}
const openModal = (id) => {
  deleteModal.value = true
  selectedItem.value = id
}
const submitModal = async () => {
  await deleteProduct(selectedItem.value)
  closeModal()
  emit('onDelete')
}

defineExpose({
  openModal
})


</script>