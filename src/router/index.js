import { createRouter, createWebHistory } from "vue-router";
import ProfilePage from "@/views/ProfilePage.vue";
import movies from "@/views/MoviesPage.vue";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";
import { isAuthenticated, redirectIfAuthenticated } from "@/router/guards";

axios.defaults.withCredentials = true;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      component: () => import("@/views/LandingPage.vue"),
      beforeEnter: redirectIfAuthenticated,
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
          path: "/email/verify/:id(.*)",
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
          beforeEnter: (to, from, next) => {
            const isRedirected = from.name === "forgot-password";
            if (isRedirected) {
              next();
            } else {
              next({ name: "feed" });
            }
          },
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
          beforeEnter: (to, from, next) => {
            const isRedirected = from.name === "reset-password";
            if (isRedirected) {
              next();
            } else {
              next({ name: "feed" });
            }
          },
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
      beforeEnter: isAuthenticated,
      children: [
        {
          path: "add-quote",
          name: "add-quote",
          component: () => import("@/views/FeedCreateQuoteModal.vue"),
        },
        {
          path: "quote/:id",
          name: "feed-view-quote",
          component: () => import("@/components/news-feed/FeedViewQuote.vue"),
        },
      ],
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfilePage,
      beforeEnter: isAuthenticated,
      children: [
        {
          path: "add-email",
          name: "add-email",
          component: () => import("@/components/profile/AddEmail.vue"),
        },
      ],
    },
    {
      path: "/movies",
      name: "movies",
      component: movies,
      beforeEnter: isAuthenticated,
      children: [
        {
          path: "add",
          name: "add-movie",
          component: () => import("@/components/movie/AddMovie.vue"),
        },
      ],
    },
    {
      path: "/movie/:id",
      name: "movie",
      component: () => import("@/views/MoviePage.vue"),
      beforeEnter: isAuthenticated,
      children: [
        {
          path: "create-quote",
          name: "create-quote",
          component: () => import("@/views/CreateQuoteModal.vue"),
        },
        {
          path: "edit",
          name: "edit-movie",
          component: () => import("@/views/EditMoviePage.vue"),
        },
        {
          path: "quote/:quoteId",
          name: "view-quote",
          component: () => import("@/views/ViewQuotePage.vue"),
        },
        {
          path: "quote/:quoteId/edit",
          name: "edit-quote",
          component: () => import("@/views/EditQuoteModal.vue"),
        },
      ],
    },
    {
      path: "/forbidden",
      name: "forbidden",
      component: () => import("@/views/ForbiddenErrorPage.vue"),
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: () => import("@/views/NotFoundErrorPage.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (authStore.authenticated === null) {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACK_BASE_URL}/user`);
      authStore.setAuthenticated(true);
      authStore.setName(res.data.name);
      authStore.setId(res.data.id);
    } catch (err) {
      authStore.authenticated = false;
    }
  }
  return next();
});

export default router;
