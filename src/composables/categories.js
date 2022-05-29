import { ref } from 'vue'
import axios from 'axios'
import { createToaster } from "@meforma/vue-toaster";
import { useRouter } from 'vue-router'

export default function useCategories() {
    const category = ref([])
    const categories = ref([])
    const errors = ref('')
    const router = useRouter()
    const toaster = createToaster({
        position: "top-right"
    });

    const getCategories = async () => {
        let response = await axios.get('/category')
        categories.value = response.data
    }

    const storeCategories = async (data) => {
        try {
            await axios.post('/category', data)
            toaster.success("Categoria criada com sucesso")
            router.push({name: 'category.index'})
        } catch (error) {
            console.log("error => ", error)
        }
    }

    return {
        errors,
        category,
        categories,
        getCategories,
        storeCategories
    }
}