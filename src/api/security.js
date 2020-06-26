import axios from '@/utils/request.js'
import qs from 'qs'
export function login(data) {
    return axios({
        url: '/security/login',
        method: 'post',
        data: qs.stringify(data)
    })
}
