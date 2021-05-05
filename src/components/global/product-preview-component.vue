<template>
    <router-link
        :to="{ name: 'product-post-view', params: { shopId, slug } }"
        :style="{ textDecoration: 'none' }"
    >
        <v-hover v-slot="{ hover }">
            <v-card outlined height="450" :elevation="hover ? 10 : 0">
                <div :style="{ position: 'relative' }">
                    <v-img
                        :src="preview.url"
                        :lazy-src="preview.url"
                        height="280"
                    ></v-img>
                    <div class="floating-product-meta">
                        <v-chip
                            small
                            color="secondary"
                            :to="{
                                name: 'product-category-view',
                                params: { name: category.name },
                            }"
                            >{{ category.label }}</v-chip
                        >
                    </div>
                </div>
                <v-list-item two-line>
                    <v-list-item-content>
                        <v-list-item-title>
                            <span :title="name">{{ name }}</span>
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            <span
                                :title="formatMoney('PHP', price)"
                                class="primary--text font-weight-bold"
                                >{{ formatMoney("PHP", price) }}</span
                            >
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>
                <v-list-item three-line>
                    <v-list-item-avatar :size="40">
                        <v-img
                            :src="shop.image_url"
                            :lazy-src="shop.image_url"
                        ></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-subtitle>
                            <custom-router-link-component
                                :to="{
                                    name: 'shop-view',
                                    params: { slug: shop.slug },
                                }"
                            >
                                <span class="font-weight-bold black--text">
                                    {{ shop.name }}
                                </span>
                            </custom-router-link-component>
                        </v-list-item-subtitle>
                        <v-list-item-subtitle>
                            <div class="d-flex align-center">
                                <span class="d-flex align-center" title="Stock">
                                    <v-icon size="small" class="mr-1"
                                        >mdi-archive-outline</v-icon
                                    >
                                    <span class="caption">{{ stock }}</span>
                                </span>
                                <span class="mx-1">·</span>
                                <span class="d-flex align-center" title="Likes">
                                    <v-icon size="small" class="mr-1"
                                        >mdi-heart-outline</v-icon
                                    >
                                    <span class="caption">{{
                                        totalLikes
                                    }}</span>
                                </span>
                            </div>
                        </v-list-item-subtitle>
                        <v-list-item-subtitle>
                            <div class="d-flex align-center">
                                <span
                                    class="d-flex align-center"
                                    :title="`Created ${formatRelativeTime(
                                        createdAt
                                    )}`"
                                >
                                    <v-icon size="small" class="mr-1"
                                        >mdi-clock-outline</v-icon
                                    >
                                    <span class="caption">{{
                                        formatRelativeTime(createdAt)
                                    }}</span>
                                </span>
                                <span class="mx-1">·</span>
                                <div class="d-flex align-center" title="Views">
                                    <v-icon size="small" class="mr-1"
                                        >mdi-eye-outline</v-icon
                                    >
                                    <span class="caption">{{
                                        totalViews
                                    }}</span>
                                </div>
                            </div>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-card>
        </v-hover>
    </router-link>
</template>

<script>
import commonUtility from "@/common/utility";
import CustomRouterLinkComponent from "@/components/custom/router-link-component";

export default {
    name: "global-product-preview-component",
    components: { CustomRouterLinkComponent },
    mixins: [commonUtility],

    props: {
        shopId: {
            type: Number,
            required: true,
        },

        category: {
            type: Object,
            required: true,
        },

        preview: {
            type: Object,
            required: true,
        },

        price: {
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        createdAt: {
            type: String,
            required: true,
        },

        shop: {
            type: Object,
            required: true,
        },

        stock: {
            type: Number,
            required: true,
        },

        slug: {
            type: String,
            required: true,
        },

        totalLikes: {
            type: Number,
            required: true,
        },

        totalViews: {
            type: Number,
            required: true,
        },
    },
};
</script>

<style scoped>
.floating-product-meta {
    position: absolute;
    top: 2%;
    left: 3%;
    transform: translate(2%, 3%);
}

.floating-heart-button {
    position: absolute;
    bottom: -5%;
    right: 3%;
    transform: translate(-5%, 3%);
}
</style>
