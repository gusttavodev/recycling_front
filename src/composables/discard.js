import { ref, reactive } from 'vue'
import axios from 'axios'
import { createToaster } from "@meforma/vue-toaster";
import { useRouter } from 'vue-router'
import dataFormat from "../service/dataFormat";

export default function useInformations() {
    let discard = reactive({
        id: '',
        quantity: '',
        date: '',
        product_id: '',
        product: {}
    })
    const discards = ref([])
    const errors = ref({})
    const router = useRouter()
    const toaster = createToaster({
        position: "top-right"
    });

    const getDiscards = async () => {
        let response = await axios.get('/discard')
        discards.value = response.data
    }

    return {
        errors,
        discard,
        discards,
        getDiscards
    }
}