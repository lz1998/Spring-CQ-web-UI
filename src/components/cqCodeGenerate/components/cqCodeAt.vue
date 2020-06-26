<template>
    <v-text-field label="@的QQ" v-model="userId" @input="$emit('input',atResult())"/>
</template>

<script>
    export default {
        name: "cqCodeAt",
        data(){
            return{
                userId:''
            }
        },
        methods:{
            atResult(){
                return `[CQ:at,qq="${this.userId}"]`
            }
        }
    }
</script>

<style scoped>

</style>
