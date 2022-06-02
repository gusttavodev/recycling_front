import { ref, reactive } from 'vue'
import axios from 'axios'
import { createToaster } from "@meforma/vue-toaster";
import { useRouter } from 'vue-router'
import dataFormat from "../service/dataFormat";

export default function useCategories() {
    let category = reactive({
        id: '',
        name: '',
        color: '',
        enable: true
    })
    const categories = ref([])
    const errors = ref({})
    const router = useRouter()
    const toaster = createToaster({
        position: "top-right"
    });

    const getCategories = async () => {
        let response = await axios.get('/category')
        categories.value = response.data
    }

    const findCategory = async (id) => {
        let response = await axios.get(`/category/${id}`)
        category.id = response.data.id
        category.name = response.data.name
        category.color = response.data.color
        category.enable = response.data.enable
    }

    const storeCategories = async (data) => {
        try {
            await axios.post('/category', data)
            toaster.success("Categoria criada com sucesso")
            router.push({name: 'category.index'})
        } catch (e) {
            if (e.response.status === 422) {  
                toaster.warning("Verifique os campos")
                errors.value = dataFormat.formatErrors(e.response.data.errors)
            }else if(e.response.status === 401){
                toaster.warning(e.response.data.message)
            }
        }
    }

    const updateCategory = async (data) => {
        try {
            await axios.put(`/category/${data.id}`, data)
            toaster.success("Categoria atualizada com sucesso")
            router.push({name: 'category.index'})
        } catch (e) {
            if (e.response.status === 422) {  
                toaster.warning("Verifique os campos")
                errors.value = dataFormat.formatErrors(e.response.data.errors)
            }else if(e.response.status === 401){
                toaster.warning(e.response.data.message)
            }
        }
    }

    const deleteCategory = async (id) => {
        try {
            await axios.delete(`/category/${id}`)
            toaster.success("Categoria deletada com sucesso")
            router.push({name: 'category.index'})
        } catch (e) {
            if(e.response.status === 401){
                toaster.warning(e.response.data.message)
            }
        }
    }

    return {
        errors,
        category,
        categories,
        getCategories,
        storeCategories,
        findCategory,
        updateCategory,
        deleteCategory
    }
}