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
          // match all routes after this
          path: "/email/verify/(.*)*",
          name: "account-activated",
          component: () => import("@/views/AccountActivatedPage.vue"),
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
          // beforeEnter: (to, from, next) => {
          //   const isRedirected = from.name === "forgot-password";
          //   if (isRedirected) {
          //     next();
          //   } else {
          //     next({ name: "feed" });
          //   }
          // },
        },
        {
          path: "/reset-password/:token",
          name: "reset-password",
          component: () => import("@/views/ResetPasswordPage.vue"),
        },
        {
          path: "reset-password-success",
          name: "reset-password-success",
          component: () => import("@/views/PasswordResetSuccess.vue"),
        },
        {
          path: "/auth/google/callback",
          name: "google-callback",
          component: () => import("@/views/GoogleCallbackPage.vue"),
        },
      ],
    },
    {
      path: "/feed",
      name: "feed",
      component: () => import("@/views/NewsFeedPage.vue"),
    },
  ],
});

export default router;
