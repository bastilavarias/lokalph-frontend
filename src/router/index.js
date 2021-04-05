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
                        component: () => import("@/views/profile/Shop"),
                        meta: {
                            requiresAuth: false,
                            roles: ["customer", "seller", "admin"],
                        },
                    },

                    {
                        path: "product",
                        name: "profile-product-view",
                        component: () => import("@/views/profile/Product"),
                        meta: {
                            requiresAuth: false,
                            roles: ["customer", "seller", "admin"],
                        },
                    },

                    {
                        path: "review",
                        name: "profile-review-view",
                        component: () => import("@/views/profile/Review"),
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
                component: () =>
                    import("@/views/seller-dashboard/SellerDashboard"),
                children: [
                    {
                        path: "",
                        component: () =>
                            import("@/views/seller-dashboard/Overview"),
                        name: "seller-dashboard-view",
                        meta: {
                            requiresAuth: true,
                            roles: ["seller"],
                        },
                    },

                    {
                        path: "shop",
                        component: () => import("@/layouts/router-view-layout"),
                        children: [
                            {
                                path: "",
                                component: () =>
                                    import(
                                        "@/views/seller-dashboard/shop/Table"
                                    ),
                                name: "seller-dashboard-shop",
                                meta: {
                                    requiresAuth: true,
                                    roles: ["seller"],
                                },
                            },

                            {
                                path: "form/:operation",
                                component: () =>
                                    import(
                                        "@/views/seller-dashboard/shop/Form"
                                    ),
                                name: "seller-dashboard-shop-form",
                                meta: {
                                    requiresAuth: true,
                                    roles: ["seller"],
                                },
                            },
                        ],
                    },

                    {
                        path: "product",
                        component: () => import("@/layouts/router-view-layout"),
                        children: [
                            {
                                path: "",
                                name: "seller-dashboard-product",
                                component: () =>
                                    import(
                                        "@/views/seller-dashboard/product/Table"
                                    ),
                                meta: {
                                    requiresAuth: true,
                                    roles: ["seller"],
                                },
                            },

                            {
                                path: "form/:operation",
                                name: "seller-dashboard-product-form",
                                component: () =>
                                    import(
                                        "@/views/seller-dashboard/product/Form"
                                    ),
                                meta: {
                                    requiresAuth: true,
                                    roles: ["seller"],
                                },
                            },
                        ],
                    },

                    {
                        path: "offer",
                        component: () => import("@/layouts/router-view-layout"),
                        meta: {
                            requiresAuth: true,
                            roles: ["seller"],
                        },
                        children: [
                            {
                                path: "",
                                name: "seller-dashboard-offer",
                                component: () =>
                                    import(
                                        "@/views/seller-dashboard/offer/Table"
                                    ),
                                meta: {
                                    requiresAuth: true,
                                    roles: ["seller"],
                                },
                            },
                        ],
                    },

                    {
                        path: "transaction",
                        component: () => import("@/layouts/router-view-layout"),
                        children: [
                            {
                                path: "",
                                name: "seller-dashboard-transaction",
                                component: () =>
                                    import(
                                        "@/views/seller-dashboard/transaction/Table"
                                    ),
                                meta: {
                                    requiresAuth: true,
                                    roles: ["seller"],
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    },

    {
        path: "/product/:shopId/:slug",
        component: () => import("@/layouts/customer-layout"),
        children: [
            {
                path: "",
                name: "product-post-view",
                component: () => import("@/views/ProductPost"),
                meta: {
                    requiresAuth: false,
                    roles: ["customer", "seller", "admin"],
                },
            },
        ],
    },

    {
        path: "/customer",
        component: () => import("@/layouts/customer-layout"),
        children: [
            {
                path: "",
                component: () =>
                    import("@/views/customer-dashboard/CustomerDashboard"),
                children: [
                    {
                        path: "",
                        name: "customer-dashboard-offer",
                        component: () =>
                            import("@/views/customer-dashboard/Offer"),
                        meta: {
                            requiresAuth: true,
                            roles: ["customer", "seller"],
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
