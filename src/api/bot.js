import axios from '@/utils/request.js'
export function getStatus() {
    return axios({
        url: '/bot/getStatus',
        method: 'post'
    })
}
