import Cookie from '../service/cookie';
import axios from 'axios';
import {useUserStore} from '../store/useUserStore'

export default {
    async redirectIfNotAuthenticated(to, from, next) {
        const store = useUserStore();
        const token = Cookie.getToken();
        let n;

        if (!token) {
            n = {name: 'login'};
        }

        // Verificar se o token está valido
        await axios.post('/me').then((response) => {
            store.storeUser(response.data)
        }).catch(() => {
            Cookie.deleteToken();
            n = {name: 'login'};
        });

        next(n);
    },
    redirectIfAuthenticated(to, from, next) {
        const token = Cookie.getToken();
        let n;

        if (token) {
           n = {name: 'index'};
        }

        next(n);
    },
};