import axios from '@/utils/request.js'
import qs from 'qs'
export function getGroupLearnPage(data) {
    return axios({
        url: '/learn/getGroupLearnPage',
        method: 'post',
        data: qs.stringify(data)
    })
}
export function setGroupLearn(data) {
    return axios({
        url: '/learn/setGroupLearn',
        method: 'post',
        data: qs.stringify(data)
    })
}
export function deleteGroupLearn(data) {
    return axios({
        url: '/learn/deleteGroupLearn',
        method: 'post',
        data: qs.stringify(data)
    })
}
