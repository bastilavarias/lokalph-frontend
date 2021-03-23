<template>
    <section>
        <v-row dense v-if="product">
            <v-col cols="12" md="7">
                <v-row dense>
                    <v-col cols="12">
                        <hooper group="group1" :items-to-show="1">
                            <template v-for="(image, index) in product.images">
                                <slide :key="index">
                                    <div
                                        :style="{ height: '450px' }"
                                        class="secondary d-flex justify-center align-center align-content-center"
                                    >
                                        <v-img
                                            :src="image.url"
                                            width="100%"
                                            height="450"
                                            position="center"
                                        ></v-img>
                                    </div>
                                </slide>
                            </template>
                        </hooper>
                    </v-col>
                    <v-col cols="12">
                        <div class="image-preview">
                            <hooper
                                group="group1"
                                :items-to-show="3"
                                ref="carousel"
                            >
                                <template
                                    v-for="(image, index) in product.images"
                                >
                                    <slide :key="index">
                                        <v-img
                                            :src="image.url"
                                            class="image-preview"
                                            position="center"
                                            width="100%"
                                            height="150"
                                        ></v-img>
                                    </slide>
                                </template>
                                <hooper-pagination
                                    slot="hooper-addons"
                                ></hooper-pagination>
                            </hooper>
                            <v-btn
                                small
                                fab
                                color="secondary"
                                @click.prevent="slidePrev"
                                class="image-preview-button image-preview-button-previous"
                            >
                                <v-icon>mdi-chevron-left</v-icon>
                            </v-btn>
                            <v-btn
                                small
                                fab
                                color="secondary"
                                @click.prevent="slideNext"
                                class="image-preview-button image-preview-button-next"
                            >
                                <v-icon>mdi-chevron-right</v-icon>
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" md="5">
                <v-list-item two-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline font-weight-bold">{{
                            product.name
                        }}</v-list-item-title>
                        <v-list-item-title
                            class="title font-weight-bold primary--text"
                        >
                            {{ formatMoney("PHP", product.price) }}
                        </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                        <v-btn icon large>
                            <v-icon color="primary" large
                                >mdi-heart-outline</v-icon
                            >
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
                <v-list-item two-line>
                    <v-list-item-avatar :size="75">
                        <v-img :src="product.shop.image_url"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ product.shop.name }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            <span
                                :title="`Posted this ${formatRelativeTime(
                                    product.created_at
                                )}`"
                            >
                                Posted this
                                {{ formatRelativeTime(product.created_at) }}
                            </span>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-col>
        </v-row>
    </section>
</template>

<script>
import { GET_PRODUCT_DETAILS_BY_SLUG } from "@/store/types/product-store-type";
import {
    Hooper,
    Slide,
    Navigation as HooperNavigation,
    Pagination as HooperPagination,
} from "hooper";
import "hooper/dist/hooper.css";
import commonUtility from "@/common/utility";

export default {
    components: {
        Hooper,
        Slide,
        HooperPagination,
        HooperNavigation,
    },

    mixins: [commonUtility],

    data() {
        return {
            product: null,
            isGetProductDetailsStart: false,
            carouselData: 0,
        };
    },

    computed: {
        slug() {
            return this.$route.params.slug;
        },
    },

    watch: {
        carouselData() {
            this.$refs.carousel.slideTo(this.carouselData);
        },
    },

    methods: {
        async getProductDetails() {
            this.isGetProductDetailsStart = true;
            const { data } = await this.$store.dispatch(
                GET_PRODUCT_DETAILS_BY_SLUG,
                this.slug
            );
            this.product = data;
            this.isGetProductDetailsStart = false;
        },

        slidePrev() {
            this.$refs.carousel.slidePrev();
        },

        slideNext() {
            this.$refs.carousel.slideNext();
        },
    },

    async created() {
        await this.getProductDetails();
    },
};
</script>

<style scoped>
.hooper {
    height: auto !important;
}

.image-preview {
    position: relative;
}

.image-preview-button {
    position: absolute;
}

.image-preview-button-previous {
    top: 40%;
    left: 5%;
    transform: translate(-40%, 5%);
}

.image-preview-button-next {
    top: 40%;
    right: 5%;
    transform: translate(40%, 5%);
}
</style>
