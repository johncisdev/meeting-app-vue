import Vue from "vue";
import VueRouter from "vue-router";
import MeetingList from "../views/MeetingList";
import MeetingDetails from "../views/MeetingDetails";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Meetings",
    component: MeetingList,
  },
  {
    path: "/meeting/:meetingId",
    name: "Meeting Details",
    component: MeetingDetails,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
