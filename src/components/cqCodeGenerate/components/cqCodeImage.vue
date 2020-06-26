<template>
    <v-container>
        <v-row>
            <v-text-field label="图片URL" v-model="file" @input="$emit('input',imageResult())"/>
        </v-row>
        <v-row class="body-2">提示：在 http://sm.ms 获取URL</v-row>
    </v-container>
</template>

<script>
    export default {
        name: "cqCodeImage",
        data(){
            return{
                file:''
            }
        },
        methods:{
            imageResult(){
                return `[CQ:image,file="${this.file}"]`
            }
        }
    }
</script>

<style scoped>

</style>
