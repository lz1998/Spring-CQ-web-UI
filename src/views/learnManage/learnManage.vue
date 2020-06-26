<template>
    <v-container>
        <!--通过群号搜索-->
        <v-container class="ma-1 pa-1">
            <v-text-field label="群号" class="d-inline-block mx-4" v-model="groupId"
                          @input="handleGroupIdChange"></v-text-field>
            <v-btn class="d-inline-block mx-4" color="primary" depressed @click="handleSearch(groupId)">确认</v-btn>
            <div class="mx-4">{{groupName}}</div>
        </v-container>

        <!--内容展示表格-->
        <v-container>
            <v-row>
                <v-spacer/>
                <v-btn color="success" class="mx-1" @click="handleAdd" :disabled="!canUpdate" depressed>新增</v-btn>
            </v-row>
            <v-data-table
                    :server-items-length="dataPage.totalElements || 0"
                    :headers="headers"
                    :page.sync="pageNum"
                    @update:page="handlePageChange"
                    :items-per-page="10"
                    :items="dataPage.content || []"
                    :dense="true">
                <template v-slot:item.answer="{ item }">
                    {{item.answer.length>25?item.answer.substr(0,22).replace("\n","")+'...':item.answer.replace("\n","")}}
                </template>
                <template v-slot:item.adminId="{ item }">
                    {{item.adminId || '未知'}}
                </template>
                <template v-slot:item.gmtModified="{ item }">
                    {{timeFormat(item.gmtModified)}}
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-btn :disabled="!canUpdate" small depressed class="primary ma-2" @click="handleEdit(item)">编辑
                    </v-btn>
                    <v-btn :disabled="!canUpdate" small depressed class="ma-2" color="error"
                           @click="handleDelete(item)">删除
                    </v-btn>
                </template>
            </v-data-table>
        </v-container>

        <!--编辑内容对话框-->
        <v-dialog v-model="showLearnEditDialog" width="1000">
            <v-card class="pa-2">
                <v-card-title>
                    词库管理
                </v-card-title>
                <v-row class="pa-3">
                    <v-col cols="12" sm="6" class="mb-n4 py-0">
                        <v-textarea
                                label="问 内容"
                                :disabled="action=='edit'"
                                v-model="selectedItem.ask"
                                auto-grow
                                filled
                                outlined
                                rounded/>
                        <v-textarea
                                label="答 内容"
                                v-model="selectedItem.answer"
                                auto-grow
                                filled
                                outlined
                                rounded/>
                        <v-row>
                            <v-spacer/>
                            <v-btn color="success" @click="handleSave" class="mx-1">保存</v-btn>
                            <v-btn color="error" @click="showLearnEditDialog=false" class="mx-1">取消</v-btn>
                        </v-row>
                    </v-col>
                    <v-col cols="12" sm="6" class="mt-n2">
                        <v-container>
                            <cq-code-generate/>
                        </v-container>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import debounce from 'lodash.debounce'
    import {getGroupLearnPage, setGroupLearn, deleteGroupLearn} from '@/api/learn.js'
    import cqCodeGenerate from '@/components/cqCodeGenerate/cqCodeGenerate'

    export default {
        name: "learnManage",
        data() {
            return {
                groupId: null,
                groupName: '',
                canUpdate: false,
                headers: [
                    {
                        text: '问',
                        align: 'center',
                        value: 'ask',
                        sortable: false
                    },
                    {
                        text: '答',
                        align: 'center',
                        value: 'answer',
                        sortable: false
                    },
                    {
                        text: '修改人',
                        align: 'center',
                        value: 'adminId',
                        sortable: false
                    },
                    {
                        text: '修改时间',
                        align: 'center',
                        value: 'gmtModified',
                        sortable: false
                    },
                    {
                        text: '操作',
                        align: 'center',
                        value: 'actions',
                        sortable: false
                    }
                ],
                dataPage: {},
                pageNum: 1,
                showLearnEditDialog: false,
                selectedItem: {},
                action: ''// edit 或者 add 小写
            }
        },
        methods: {
            handleGroupIdChange() {
                this.canUpdate = false
                this.dataPage = {}
                this.groupName = ''
            },
            handleSearch(groupId, pageNum, size) {
                let data = {
                    groupId,
                    page: pageNum - 1,
                    size
                }
                getGroupLearnPage(data).then(res => {
                    this.dataPage = res.data.page
                    this.canUpdate = res.data.canUpdate
                    this.groupName = res.data.groupName
                })
            },
            handlePageChange() {
                this.handleSearch(this.groupId, this.pageNum, 10)
            },
            handleAdd() {
                this.selectedItem = {
                    groupId: this.groupId,
                    ask: '',
                    answer: ''
                }
                this.action = 'add'
                this.showLearnEditDialog = true
            },
            handleEdit(item) {
                this.selectedItem = JSON.parse(JSON.stringify(item))
                this.action = 'edit'
                this.showLearnEditDialog = true
            },
            handleDelete(item) {
                let data = {
                    groupId: item.groupId,
                    ask: item.ask
                }
                deleteGroupLearn(data).then(res => {
                    if (res.data) {
                        this.$notify({type: 'success', message: '删除成功!'})
                        this.handleSearch(this.groupId, this.pageNum, 10)
                    }
                })

            },
            handleSave() {
                let data = {
                    groupId: this.selectedItem.groupId,
                    ask: this.selectedItem.ask,
                    answer: this.selectedItem.answer
                }
                setGroupLearn(data).then(res => {
                    if (res.data) {
                        this.$notify({type: 'success', message: '保存成功!'})
                        this.showLearnEditDialog = false
                        this.handleSearch(this.groupId, this.pageNum, 10)
                    }
                })
            },
            timeFormat(timestamp) {
                let date = new Date(timestamp)
                return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            }
        },
        components: {
            cqCodeGenerate
        },
        mounted() {
            this.handleSearch = debounce(this.handleSearch, 500)
            this.handleSave = debounce(this.handleSave, 500)
        }
    }
</script>

<style scoped>

</style>
