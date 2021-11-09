import Vue from "vue";
import Vuex from "vuex";

import { meetings } from "../services";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    dataList: [],
    data: {},
    // errors: [],
  },
  mutations: {
    updateDataList(state, payload) {
      state.dataList = payload;
    },
    updateData(state, payload) {
      state.data = payload;
    },
  },
  actions: {
    async getMeetings() {
      const data = await meetings.get();
      this.commit("updateDataList", data);
    },
    async getMeeting(state, payload) {
      const data = await meetings.get(payload);
      this.commit("updateData", data);
    },
    async saveMeeting(state, payload) {
      const action = payload.id ? meetings.patch : meetings.post;
      const data = await action(payload);
      this.dispatch("getMeetings");

      return data;
    },
    async deleteMeeting(state, payload) {
      const data = await meetings.delete(payload);
      this.dispatch("getMeetings");
      return data;
    },
  },
  modules: {},
});
