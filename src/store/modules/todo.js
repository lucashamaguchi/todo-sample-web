import * as types from "@/store/types";
import axios from "axios";
import shortly from "vuex-shortly";

const todosApi = axios.create({
    baseURL: process.env.VUE_APP_TODOS_API_REST
});

const httpResource = "todos";

const state = {
    todos: [],
};

const getters = {
    [types.TODO_LIST]: "todos",
};

const mutations = {
    [types.TODO_LIST]: "todos"
};

const actions = {
    [types.TODO_LIST]: async ({
        commit
    }) => {
        const response = await todosApi.get(`/${httpResource}`);
        const results = response.data.results;
        commit(types.TODO_LIST, results);
        return response;
    },
    [types.TODO_CREATE]: async (ctx, payload) => {
        const response = await todosApi.post(`/${httpResource}`, payload);
        return response;
    },
    [types.TODO_UPDATE]: async (ctx, { id, payload }) => {
        const response = await todosApi.patch(`/${httpResource}/${id}`, payload);
        return response;
    },
    [types.TODO_DELETE]: async (ctx, { id }) => {
        const response = await todosApi.delete(`/${httpResource}/${id}`);
        return response;
    },
};

export default shortly({
    state,
    getters,
    mutations,
    actions
});
