<template>
  <div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
      <h1 class="text-xl font-semibold text-gray-900">Categorias</h1>
      <p class="mt-2 text-sm text-gray-700">Listagem de todas as categorias do seu sistema.</p>
    </div>    
    <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">     
      <router-link 
        class="
          inline-flex items-center justify-center rounded-md border 
          border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium 
          text-white shadow-sm hover:bg-indigo-700 focus:outline-none 
          focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto
        "
        :to="{name: 'category.create'}"
      >
        Adicionar Categoria
      </router-link>
    </div>
  </div>
  
  <div class="mt-8 flex flex-col">
    <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">ID</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Nome</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Cor</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 flex justify-center">Habilitada</th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="category in categories" :key="category.id">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ category.id }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ category.name }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <div class="w-8 h-8 rounded-lg selected-color" :style="`background-color:${category.color}`"></div>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 flex justify-center">
                  <CheckCircleIcon v-if="category.enable" class="h-6 w-6 text-green-500"  />
                  <XCircleIcon v-else class="text-red-500 h-6 w-6"  />                    
                </td>
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">   
                  <div class="flex">
                    <router-link 
                    :to="{ name: 'category.edit', params: { id: category.id } }"
                    >
                    <PencilIcon class="h-6 w-6 text-indigo-500"/>
                    </router-link>
                    <TrashIcon 
                      class="h-6 w-6 text-red-500 cursor-pointer" 
                      @click="openDeleteModal(category.id)"
                    />
                  </div>                       
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>   
  <Delete
    ref="deleteModal"
    @onDelete="getCategories"
  />
</template>

<script setup>
import useCategories from '../../../composables/categories'
import { onMounted, ref } from 'vue'
import {
  CheckCircleIcon,
  XCircleIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/vue/outline'
import Delete from './Delete.vue'

const deleteModal = ref(null)

const { categories, getCategories, deleteCategory } = useCategories()

onMounted(getCategories)

// Precisa ser chamado em uma função se não vem como null
const openDeleteModal = (id) => {
  deleteModal.value.openModal(id)
}

</script>