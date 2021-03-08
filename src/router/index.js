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

    {
        path: "/profile/:email",
        component: () => import("@/layouts/customer-layout"),
        children: [
            {
                path: "",
                component: () => import("@/views/profile/Profile"),
                children: [
                    {
                        path: "",
                        name: "profile-view",
                        component: () => import("@/views/profile/ProfileShop"),
                        meta: {
                            requiresAuth: false,
                            roles: ["customer", "seller", "admin"],
                        },
                    },

                    {
                        path: "product",
                        name: "profile-product-view",
                        component: () =>
                            import("@/views/profile/ProfileProduct"),
                        meta: {
                            requiresAuth: false,
                            roles: ["customer", "seller", "admin"],
                        },
                    },

                    {
                        path: "review",
                        name: "profile-review-view",
                        component: () =>
                            import("@/views/profile/ProfileReview"),
                        meta: {
                            requiresAuth: false,
                            roles: ["customer", "seller", "admin"],
                        },
                    },
                ],
            },
        ],
    },

    {
        path: "/seller",
        component: () => import("@/layouts/seller-layout"),
        children: [
            {
                path: "",
                component: () => import("@/views/seller/Dashboard"),
                children: [
                    {
                        path: "",
                        component: () =>
                            import("@/views/seller/DashboardOverview"),
                        name: "seller-dashboard-view",
                        meta: {
                            requiresAuth: true,
                            roles: ["seller"],
                        },
                    },
                ],
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
    const user = store.state.authentication.user;
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const roles = to.meta.roles;
    if (requiresAuth && !isAuthenticated)
        return next({ name: from.name || "home-view" });
    if (user && !roles.includes(user.account_type.type))
        return next({ name: from.name || "home-view" });
    next();
});

export default router;
