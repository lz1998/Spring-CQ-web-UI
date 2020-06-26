<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="6">
                <!--通过群号搜索-->
                <v-container class="ma-1 pa-1">
                    <v-text-field label="群号" class="d-inline-block mx-4" v-model="groupId" @input="handleGroupIdChange"></v-text-field>
                    <v-btn class="d-inline-block mx-4" color="primary" depressed @click="handleSearch">确认</v-btn>
                    <div class="mx-4">{{groupName}}</div>
                </v-container>


                <!--左侧编辑框-->
                <v-container>
                    <v-textarea
                            label="入群欢迎内容"
                            v-model="welcomeMsg"
                            :disabled="!canUpdate"
                            auto-grow
                            filled
                            outlined
                            rounded/>
                    <v-btn @click="handleSave" class="headline" depressed color="success" rounded large block>保存</v-btn>
                </v-container>
            </v-col>


            <!--右侧代码生成工具-->
            <v-col cols="12" sm="6">
                <v-card class="pa-4">
                    <cq-code-generate/>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import debounce from 'lodash.debounce'
    import {getWelcome,setWelcome} from '@/api/welcome'
    import cqCodeGenerate from '@/components/cqCodeGenerate/cqCodeGenerate'
    export default {
        name: "welcomeManage",
        data(){
            return{
                groupId:null,
                welcomeMsg:'',
                canUpdate:false,
                groupName:''
            }
        },
        methods:{
            handleGroupIdChange(){
                this.welcomeMsg=''
                this.canUpdate=false
            },
            handleSearch(){
                let data={
                    groupId:this.groupId
                }
                getWelcome(data).then(res=>{
                    this.welcomeMsg=res.data.welcomeMsg
                    this.canUpdate=res.data.canUpdate
                    this.groupName=res.data.groupName
                })
            },
            handleSave(){
                let data={
                    groupId:this.groupId,
                    welcomeMsg:this.welcomeMsg
                }
                setWelcome(data).then(res=>{
                    if(res.data==true){
                        this.$notify({type: 'success',message: '设置成功!'})
                    }
                })
            }
        },
        components:{
            cqCodeGenerate
        },
        mounted() {
            this.handleSearch= debounce(this.handleSearch,500)
            this.handleSave= debounce(this.handleSave,500)
        }
    }
</script>

<style scoped>

</style>
