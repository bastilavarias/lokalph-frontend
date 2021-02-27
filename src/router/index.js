import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index";
import { AUTHENTICATION_VALIDATE_USER } from "@/store/types/authentication-store-type";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: () => import("@/layouts/customer-layout"),
        children: [
            {
                path: "",
                name: "home-view",
                component: () => import("@/views/Home"),
                meta: {
                    requiresAuth: false,
                    roles: ["customer", "seller", "admin"],
                },
            },
        ],
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach(async (to, from, next) => {
    await store.dispatch(AUTHENTICATION_VALIDATE_USER);
    const isAuthenticated = store.state.authentication.isAuthenticated;
    const { account_type } = store.state.authentication.user;
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const roles = to.meta.roles;
    if (requiresAuth && !isAuthenticated)
        return next({ name: from.name || "Home View" });
    if (!roles.includes(account_type.type))
        return next({ name: from.name || "Home View" });
    next();
});

export default router;
