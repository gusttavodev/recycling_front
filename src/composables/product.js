import { ref, reactive } from 'vue'
import axios from 'axios'
import { createToaster } from "@meforma/vue-toaster";
import { useRouter } from 'vue-router'
import dataFormat from "../service/dataFormat";

export default function useProducts() {
    let product = reactive({
        id: '',
        name: '',
        description: '',
        enable: true,
        categories: []
    })
    const products = ref([])
    const errors = ref({})
    const router = useRouter()
    const toaster = createToaster({
        position: "top-right"
    });

    const getProducts = async () => {
        let response = await axios.get('/product')
        products.value = response.data
    }

    const findProduct = async (id) => {
        let response = await axios.get(`/product/${id}`)
        product.id = response.data.id
        product.name = response.data.name
        product.description = response.data.description
        product.enable = response.data.enable
        product.categories = response.data.categories.map(item => item.id)
    }

    const storeProduct = async (data) => {
        try {
            await axios.post('/product', data)
            toaster.success("Produto criada com sucesso")
            router.push({name: 'product.index'})
        } catch (e) {
            if (e.response.status === 422) {  
                toaster.warning("Verifique os campos")
                errors.value = dataFormat.formatErrors(e.response.data.errors)
            }else if(e.response.status === 401){
                toaster.warning(e.response.data.message)
            }
        }
    }

    const updateProduct = async (data) => {
        try {
            await axios.put(`/product/${data.id}`, data)
            toaster.success("Produto atualizada com sucesso")
            router.push({name: 'product.index'})
        } catch (e) {
            if (e.response.status === 422) {  
                toaster.warning("Verifique os campos")
                errors.value = dataFormat.formatErrors(e.response.data.errors)
            }else if(e.response.status === 401){
                toaster.warning(e.response.data.message)
            }
        }
    }

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`/product/${id}`)
            toaster.success("Produto deletada com sucesso")
            router.push({name: 'product.index'})
        } catch (e) {
            if(e.response.status === 401){
                toaster.warning(e.response.data.message)
            }
        }
    }

    return {
        errors,
        product,
        products,
        getProducts,
        findProduct,
        storeProduct,
        updateProduct,
        deleteProduct
    }
}