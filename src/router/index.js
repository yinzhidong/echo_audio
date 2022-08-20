import { createRouter,createWebHashHistory } from "vue-router";
// createWebHistory
import List from "../views/List.vue";
import Channel from "../views/Channel.vue";

const routes = [
  {
    path: "/",
    name: "List",
    component: List,
    meta: {
      title: "List",
      auth: false,
    },
  },
  {
    path: "/channels/:channelId",
    name: "Channel",
    component: Channel,
    meta: {
      title: "频道",
      auth: false,
    },
  },
 
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes,
});

// Change document titles
// router.beforeEach((to, from, next) => {
//   document.title = `${to.meta.title} | Active Tracker`;
//   next();
// });

// // Route guard for auth routes
// router.beforeEach((to, from, next) => {
//   const user = supabase.auth.user();
//   if (to.matched.some((res) => res.meta.auth)) {
//     if (user) {
//       next();
//       return;
//     }
//     next({ name: "Login" });
//     return;
//   }
//   next();
// });

export default router;
