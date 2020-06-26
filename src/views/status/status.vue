<template>
    <v-container>
        <v-row>
            <!--每个机器人是一个card，根据屏幕大小自动判断一行显示几个-->
            <v-col cols="6" sm="3" md="2" v-for="(bot,i) in statusList" :key="i">
                <v-card class="pa-1 ">
                    <v-card-subtitle class="text-center">
                        <v-responsive class="my-2">
                            <v-avatar size="50" class="headline">
                                <my-img :src="avatarUrl(bot.selfId)"/>
                            </v-avatar>
                        </v-responsive>
                    </v-card-subtitle>
                    <v-card-text class="text-center my-1 pa-0 subtitle-2">
                        {{bot.selfId}}
                    </v-card-text>
                    <v-card-text class="text-center body-1 my-2 pa-0">
                        <v-chip :color="bot.status.good?'success':'error'" label small>
                            正常<v-icon right small v-text="bot.status.good?'mood':'mood_bad'">mood</v-icon>
                        </v-chip>
                    </v-card-text>
                    <v-card-text class="text-center body-1 my-2 pa-0 caption">
                        检测时间:{{Date.parse(new Date())/1000-bot.time}}秒前
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {getStatus} from '@/api/bot'
    import myImg from '@/components/myImg/myImg'
    export default {
        name: "status",
        data(){
            return{
                statusList:[]
            }
        },
        methods:{
            avatarUrl(qq){
                return "http://q.qlogo.cn/headimg_dl?dst_uin="+qq+"&spec=100"
            }
        },
        mounted() {
            getStatus().then(res=>{
                this.statusList=res.data
            })
        },
        computed:{

        },
        components:{
            myImg
        }
    }
</script>

<style scoped>

</style>
