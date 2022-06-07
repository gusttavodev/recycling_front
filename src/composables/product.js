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
        enable: true
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

    return {
        errors,
        product,
        products,
        getProducts,
        storeProduct
    }
}