import { ref, reactive } from 'vue'
import axios from 'axios'
import { createToaster } from "@meforma/vue-toaster";
import { useRouter } from 'vue-router'
import dataFormat from "../service/dataFormat";

export default function useDiscard() {
    const informations = ref([])
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
    const getInformations = async () => {
        let response = await axios.get('/information/product-discard-month')
        const result = response.data.map(data => data)
        informations.value = response.data
    }

    return {
        informations,
        getInformations
    }
}