<template>
    <nav>
        <!--顶部 bar-->
        <v-app-bar dark app>
            <!--菜单按钮-->
            <v-btn class="mr-3" elevation="1" fab @click="showDrawer=!showDrawer" small>
                <v-icon>menu</v-icon>
            </v-btn>

            <!--标题-->
            <v-toolbar-title class="toobar-title">Spring-CQ管理系统</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-avatar size="28" width="1px">
                <my-img :src="avatarUrl"/>
            </v-avatar>
            <i class="el-icon-position"></i>
            <span @click="handleCommand('/login')" style="color: #cc3333" class="ml-2">退出</span>

        </v-app-bar>


        <!--侧边栏-->
        <v-navigation-drawer
                dark
                app
                v-model="showDrawer"
                mobile-break-point="960"
                width="260">

            <!--头像部分-->
            <v-row class="no-gutters">
                <v-avatar color="white" class="ma-4" size="30">
                    <my-img :src="avatarUrl"/>
                </v-avatar>
            </v-row>

            <v-divider/>

            <!--菜单部分-->
            <v-list rounded>
                <v-list-item
                        color="primary"
                        class="my-3"
                        v-for="router in routerList"
                        :key="router.path"
                        router
                        :to="router.path">
                    <v-list-item-icon>
                        <v-icon>{{router.icon}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{router.name}}</v-list-item-title>
                </v-list-item>
            </v-list>


        </v-navigation-drawer>
    </nav>
</template>
<script>
    import cookie from 'js-cookie'
    import menuItems from "@/router/menuItems";
    import myImg from '@/components/myImg/myImg'

    export default {
        data() {
            return {
                // 是否显示侧边栏
                showDrawer: true,
                // 侧边栏内容 + 图标   TODO 可改为从router读取
                routerList: menuItems,
                avatarUrl: '',
                userId: 0
            };
        },
        methods: {
            handleCommand(command) {
                this.$router.push(command);
            },
        },
        mounted() {
            this.userId = cookie.get('userId')
            this.avatarUrl = "http://q.qlogo.cn/headimg_dl?dst_uin=" + this.userId + "&spec=100"
        },
        components: {
            myImg
        }

    };
</script>

<style scoped>

</style>
