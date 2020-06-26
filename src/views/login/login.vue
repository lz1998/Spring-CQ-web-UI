<template>
    <div class="login">
        <v-container class="fill-height text-center">
            <v-row class="no-gutters" justify="center" align="center">
                <v-col cols="12" sm="6" md="4">
                    <v-card class="pa-2">
                        <v-row justify="center">
                            <h4 class="headline font-weight-bold my-4">
                                登陆/注册
                            </h4>
                        </v-row>
                        <v-card-text>
                            <v-form ref="loginForm">
                                <v-text-field
                                        prepend-inner-icon="account_circle"
                                        type="primary"
                                        v-model="loginForm.userId"
                                        :rules="[formRules.required, formRules.userId]"
                                        label="账号"
                                        outlined>
                                </v-text-field>
                                <v-text-field
                                        prepend-inner-icon="lock"
                                        v-model="loginForm.password"
                                        :rules="[formRules.required, formRules.password]"
                                        label="密码"
                                        type="password"
                                        outlined>
                                </v-text-field>
                            </v-form>
                        </v-card-text>

                        <v-card-actions>
                            <v-btn class="headline" depressed color="primary" rounded large block
                                   @click="handleLogin">确认
                            </v-btn>
                        </v-card-actions>
                        <v-card-text>
                            提示：如果未注册过或密码错误，是重置密码
                        </v-card-text>
                    </v-card>
                </v-col>

            </v-row>
            <v-dialog v-model="showVerificationDialog" width="500">
                <v-card>
                    <v-card-title class="headline text-center mb-3">
                        设置密码
                    </v-card-title>
                    <v-card-subtitle class="headline text-center ma-3 font-weight-bold">
                        请私聊发送验证码注册
                    </v-card-subtitle>
                    <v-card-subtitle class="display-1 text-center ma-3">
                        {{verificationClipboardText}}
                    </v-card-subtitle>
                    <v-card-text class="subtitle-2 text-center">
                        验证码有效期5分钟，发送给任意机器人
                    </v-card-text>
                    <v-card-subtitle class="text-center">
                        <v-btn color="primary" depressed v-clipboard:copy="verificationClipboardText"
                               v-clipboard:success="copySuccess">点我复制
                        </v-btn>
                    </v-card-subtitle>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn color="error" depressed @click="showVerificationDialog=false">取消</v-btn>
                        <v-btn color="success" @click="handleLogin" depressed>已发送</v-btn>
                    </v-card-actions>

                </v-card>
            </v-dialog>

        </v-container>
        <a style="color:black;background: rgba(255,255,255,0.5);position: absolute;bottom: 0;width:100%;text-align: center"
           href="https://github.com/lz1998/spring-cq">Spring-CQ Demo</a>
    </div>
</template>
<script>

    import cookies from 'js-cookie'
    import {login} from '@/api/security'

    export default {
        name: 'login',
        data() {
            return {
                loginForm: {
                    userId: '',
                    password: '',
                    rememberMe: false
                },
                formRules: {
                    required: value => !!value || '必填',
                    userId: value => (value > 10000 && value <= 10000000000) || '请输入账号',
                    password: value => (value.length > 5) || '密码至少6位'
                },
                verificationCode: '',
                showVerificationDialog: false
            }
        },
        methods: {
            copySuccess() {
                this.$notify({type: 'success', message: '复制成功!'})
            },
            handleLogin() {
                // 检测是否为空，是否数字
                if (!this.$refs.loginForm.validate()) {
                    return
                }
                login(this.loginForm).then(res => {
                    let data = res.data
                    if (data.type == "token") {
                        // 登陆成功
                        cookies.set("token", data.result, {expires: 5}) // 5天过期
                        cookies.set("userId", this.loginForm.userId, {expires: 5})// 5天过期
                        // this.$cookies.set("token",data.result,'3D')
                        this.$router.push("/layout")
                    } else if (data.type == "verification") {
                        // 密码错误或者新用户
                        this.verificationCode = data.result
                        this.showVerificationDialog = true
                    }
                })
            }
        },
        mounted() {
            // 进入登陆页面，不管之前有没有token，都先删除，退出
            cookies.remove('token')
            cookies.remove('userId')
        },
        computed: {
            verificationClipboardText() {
                return '.验证码' + this.verificationCode
            }
        }
    }
</script>
<style scoped>
    .login {
        width: 100%;
        height: 100%;
        background: linear-gradient(rgba(190, 230, 255, 0.33), rgba(140, 180, 255, 0.7));
    }
</style>
