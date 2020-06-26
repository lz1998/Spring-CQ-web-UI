<template>
    <div class="layout" style="width: 100%;">
        <appbar/>
        <v-content>
            <keep-alive>
                <router-view/>
            </keep-alive>
        </v-content>
    </div>
</template>

<script>
    import appbar from "./components/appbar";
    export default {
        components:{
            appbar
        }
    }
</script>
