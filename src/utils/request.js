import axios from 'axios'
import Vue from "vue";
import cookies from 'js-cookie'
import router from '@/router'
const service = axios.create({
    baseURL: process.env.VUE_APP_API_URL
})
service.interceptors.request.use(function (config) {
    //在发送请求之前做某事
    // TODO 判断是否已登录，已登录带上token
    let token = cookies.get('token')
    if (token == null || token == undefined || token == 'null') {
        config.headers.Authorization = null
    } else {
        config.headers.Authorization = 'Bearer ' + token
    }
    return config;
}, function (error) {
    //请求错误时做些事
    console.log(error)
    return Promise.reject(error);
});
service.interceptors.response.use(function (response) {
    let data = response.data

    if(data.code>0){
        // 正确码大于0，绿色提示
        // vue.not({
        //     message: data.msg,
        //     type: "success",
        //     center: true,
        //     showClose: true
        // })
    }else if(data.code<0){
        // 错误码小于0，红色提示
        // Notification({
        //     message: data.msg,
        //     type: "error",
        //     center: true,
        //     showClose: true
        // })

        // 未登陆跳转
        if(data.msg=="请先登陆"){
            router.push("/login")
        }
    }
    return data

}, function (error) {
    if (error.status == 403)
    return Promise.reject(error)
})

export default service
