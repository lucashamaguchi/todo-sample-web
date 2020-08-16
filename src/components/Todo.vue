<template>
    <div class="todo-list">
        <div
            v-for="todo in todos"
            :key="todo._id"
            class="todo-list-item">
            <div :class="todo.done ? `todo-list-item-text-done`: `todo-list-item-text`">
                {{ todo.task }}
            </div>
            <div class="todo-list-item-actions">
                <i
                    class="el-icon-close"
                    @click="handleDelete(todo)" />
                <i
                    v-if="!todo.done"
                    class="el-icon-check"
                    @click="handleMarkDone(todo)" />
            </div>
        </div>
    </div>
</template>

<script>
import * as types from "@/store/types";
export default {
    props: {
        todos: {
            type: Array,
            default: () => ([])
        }
    },
    data() {
        return {
            loading: false
        }
    },
    methods: {
        async handleDelete(todo) {
            this.loading = true;
            const id = todo._id
            try {
                await this.$store.dispatch(types.TODO_DELETE, { id });
                this.$notify.success({
                    title: "Success",
                    message: "Todo Deleted"
                });
            } catch (error) {
                this.$notify.error({
                    title: "Error",
                    message: error?.message
                });
            } finally {
                this.loading = false;
            }
            this.$emit("update");
        },
        async handleMarkDone(todo) {
            this.loading = true;
            const id = todo._id
            const payload = {
                task: todo.task,
                description: todo.description,
                done: true
            }
            try {
                await this.$store.dispatch(types.TODO_UPDATE, { id, payload });
                this.$notify.success({
                    title: "Success",
                    message: "Todo Done"
                });
            } catch (error) {
                this.$notify.error({
                    title: "Error",
                    message: error?.message
                });
            } finally {
                this.loading = false;
            }
            this.$emit("update");
        }
    }
}
</script>

<style lang="scss" scoped>
.todo-list {
    width: 413px;
    margin: auto;
    margin-top: 50px;
    .todo-list-item {
        border-bottom: 1px solid #969696;
        width: 110%;
        margin: 0px auto;
        margin-left: 5px;
        display: flex;
        padding-bottom: 15px;
        padding-top: 15px;
        .todo-list-item-text {
            text-align: left;
            font-size: 14px;
            font-family: 'Open Sans';
            &-done {
                text-decoration-line: line-through;
            }
        }
        .todo-list-item-actions {
            margin-left: auto;
            margin-right: 0;
            i {
                margin-left: 5px;
                font-size: 18px;
                cursor: pointer;
                &.el-icon-check {
                    border-left: 1px solid #969696;
                    padding-left: 5px;
                    color: #33FF00;
                }
                &.el-icon-close {
                    color: #FF6600;
                }
            }
        }
    }
}
</style>
