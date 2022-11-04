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
          path: "activation-email-sent",
          name: "activation-email-sent",
          component: () => import("@/views/VerificationEmailSentPage.vue"),
          beforeEnter: (to, from, next) => {
            const isRedirected = from.name === "signup";
            if (isRedirected) {
              next();
            } else {
              next({ name: "login" });
            }
          },
        },
        {
          // match all routes
          path: ":email(.*)*",
          name: "account-activated",
          component: () => import("@/views/AccountActivated.vue"),
        },
        {
          path: "forgot-password",
          name: "forgot-password",
          component: () => import("@/views/ForgotPasswordPage.vue"),
        },
        {
          path: "reset-email-sent",
          name: "reset-email-sent",
          component: () => import("@/views/ResetPasswordEmailSentPage.vue"),
        },
      ],
    },
  ],
});

export default router;
