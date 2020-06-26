import axios from '@/utils/request.js'
import qs from 'qs'
export function getWelcome(data) {
    return axios({
        url: '/welcome/getWelcome',
        method: 'post',
        data: qs.stringify(data)
    })
}
export function setWelcome(data) {
    return axios({
        url: '/welcome/setWelcome',
        method: 'post',
        data: qs.stringify(data)
    })
}
