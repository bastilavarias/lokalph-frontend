<template>
    <v-card outlined height="600">
        <div :style="{ position: 'relative' }">
            <v-img
                :src="preview.url"
                :lazy-src="preview.url"
                height="280"
            ></v-img>
            <div class="floating-product-meta">
                <v-chip small color="secondary">{{ category.label }}</v-chip>
            </div>
            <div class="floating-heart-button">
                <v-btn fab small>
                    <v-icon color="grey">mdi-heart</v-icon>
                </v-btn>
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
                        >PHP {{ formatMoney("PHP", price) }}</span
                    >
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <!--        <v-card-text v-html="description"> </v-card-text>-->
        <v-divider></v-divider>
        <v-list-item two-line>
            <v-list-item-avatar :size="40">
                <v-img :src="shop.image_url" :lazy-src="shop.image_url"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-subtitle> {{ shop.name }} </v-list-item-subtitle>
                <v-list-item-subtitle>
                    <div class="d-flex align-center">
                        <div class="d-flex align-center">
                            <v-icon size="small" class="mr-1"
                                >mdi-clock-outline</v-icon
                            >
                            <span class="caption">{{
                                formatRelativeTime(createdAt)
                            }}</span>
                        </div>
                        <span class="mx-1">·</span>
                        <div class="d-flex align-center">
                            <v-icon size="small" class="mr-1"
                                >mdi-eye-outline</v-icon
                            >
                            <span class="caption">4</span>
                        </div>
                    </div>
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </v-card>
</template>

<script>
import commonUtility from "@/common/utility";

export default {
    name: "global-product-mini-preview-component",

    mixins: [commonUtility],

    props: {
        category: {
            type: Object,
            required: true,
        },

        preview: {
            type: Object,
            required: true,
        },

        price: {
            type: String,
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
