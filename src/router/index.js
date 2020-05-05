import Vue from "vue";
import Router from "vue-router";
import ChatDashBoard from "@/view/ChatDashBoard";
import Chat from "@/components/Chat";
import ChatList from "@/components/ChatList";

Vue.use(Router);

export default new Router({
  mode: "hash", // https://router.vuejs.org/api/#mode
  linkActiveClass: "open active",
  scrollBehavior: () => ({ y: 0 }),
  base: "/",
  routes: [
    {
      path: "/",
      component: ChatDashBoard,
      redirect: "/home",
      children: [
        {
          path: "home",
          name: "ChatList",
          component: ChatList,
        },
        {
          path: "chat/:chatname",
          name: "Chat",
          component: Chat,
        },
      ],
    },
    { path: "/*", redirect: "/home" },
  ],
});
