import { ref, reactive } from 'vue'
import axios from 'axios'
import { createToaster } from "@meforma/vue-toaster";
import { useRouter } from 'vue-router'
import dataFormat from "../service/dataFormat";

export default function useProducts() {
    let product = reactive({
        id: '',
        name: '',
        color: '',
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

    return {
        errors,
        product,
        products,
        getProducts
    }
}