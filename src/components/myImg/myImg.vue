<template>
    <div class="v-responsive v-image">
        <div class="v-responsive__sizer" style="padding-bottom: 100%;">
        </div>
        <div class="v-image__image v-image__image--cover" style="background-position: center center;" :style="avatarStyle">
        </div>
        <div class="v-responsive__content" style="width: 100px;">
        </div>
    </div>
</template>

<script>
    export default {
        name: "myImg",
        props:['src'],
        computed:{
            avatarStyle(){
                return {
                    "background-image": `url(${this.src})`
                }
            }
        }
    }
</script>

<style scoped>

</style>
