import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      component: () => import("@/views/LandingPage.vue"),
      children: [
        {
          path: "login",
          name: "login",
          component: () => import("@/views/SigninModal.vue"),
        },
        {
          path: "signup",
          name: "signup",
          component: () => import("@/views/SignupModal.vue"),
        },
        {
          path: "thank-you",
          name: "thank-you",
          component: () => import("@/views/ThankYouPage.vue"),
          beforeEnter: (to, from, next) => {
            const isRedirected = from.name === "login";
            if (isRedirected) {
              next();
            } else {
              next({ name: "login" });
            }
          },
        },
      ],
    },
  ],
});

export default router;
