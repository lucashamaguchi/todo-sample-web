<template>
    <div class="todo-home">
        <h1>
            Todo Web
        </h1>
        <div class="todo-home-create">
            <el-input
                v-model="currentTodo"
                size="small" />
            <el-button
                size="small"
                round
                @click="handleCreate">
                New
            </el-button>
        </div>
        <todos-component
            :todos="todos"
            @update="handleUpdate" />
    </div>
</template>

<script>
import TodosComponent from "@/components/Todo";
import * as types from "@/store/types";
import { mapGetters } from "vuex";
export default {
    components: {
        TodosComponent
    },
    data() {
        return {
            loading: false,
            currentTodo: "",
        };
    },
    computed: {
        ...mapGetters({
            todos: types.TODO_LIST
        })
    },
    mounted () {
        // carregar os todos
        this.handleUpdate();
    },
    methods: {
        async handleCreate() {
            this.loading = true;
            const payload = {
                task: this.currentTodo,
                description: this.currentTodo,
                done: false
            };
            try {
                await this.$store.dispatch(types.TODO_CREATE, payload);
                this.$notify.success({
                    title: "Success",
                    message: "Todo Created"
                });
                this.currentTodo = "";
                this.handleUpdate();
            } catch (error) {
                this.$notify.error({
                    title: "Error",
                    message: error?.message
                });
            } finally {
                this.loading = false;
            }
        },
        async handleUpdate() {
            this.loading = true;
            await this.$store.dispatch(types.TODO_LIST)
            this.loading = false;
        },
    }
}
</script>

<style lang="scss">
.todo-home {
    h1 {
        font-family: Rajdhani;
        font-style: normal;
        font-weight: normal;
        font-size: 50px;
        line-height: 64px;
        text-align: center;

        color: #0085FF;
    }
    div.todo-home-create {
        display: flex;
        width: 413px;
        height: 31px;
        margin: auto;
        .el-button {
            margin-left: 5px;
            color: #FFFFFF;
            background: #0085FF;
        }
    }
}
</style>
