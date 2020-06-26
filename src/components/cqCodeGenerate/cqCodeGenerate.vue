<template>
    <v-container>
            <div class="title text-center">代码生成工具</div>
            <v-row class="my-1 pa-0">
                <v-select label="选择生成的类型" :items="items" v-model="selectedItem"/>
            </v-row>
            <v-row class="my-1 pa-0">
                <component :is="selectedItem" v-model="result"/>
            </v-row>
            <v-row class="my-1 py-0">
                <v-textarea
                        label="代码"
                        v-model="result"
                        disabled
                        rows="1"
                        auto-grow
                        filled
                        outlined
                        rounded/>
            </v-row>
            <v-row class="my-1 py-0">
                <v-btn v-clipboard:copy="result" v-clipboard:success="copySuccess" class="headline" depressed color="primary" rounded large block>复制</v-btn>
            </v-row>
    </v-container>
</template>

<script>
    import cqCodeAt from './components/cqCodeAt'
    import cqCodeImage from './components/cqCodeImage'
    export default {
        name: "cqCodeGenerate",
        data(){
            return{
                items:[
                    {
                        text:'@某人',
                        value:'cqCodeAt'
                    },
                    {
                        text:'图片',
                        value:'cqCodeImage'
                    },

                ],
                selectedItem:'',
                result:''
            }
        },
        methods:{
            copySuccess(){
                this.$message({type: 'success',message: '复制成功!'})
            }
        },
        components:{
            cqCodeAt,
            cqCodeImage
        }
    }
</script>

<style scoped>

</style>
