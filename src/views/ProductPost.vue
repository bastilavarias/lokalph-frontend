<template>
    <section>
        <v-row dense v-if="product">
            <v-col cols="12" md="6">
                <v-row dense>
                    <v-col cols="12">
                        <hooper group="group1">
                            <template v-for="(image, index) in product.images">
                                <slide :key="index">
                                    <v-img
                                        :src="image.url"
                                        height="350"
                                    ></v-img>
                                </slide>
                            </template>
                        </hooper>
                    </v-col>
                    <v-col cols="12">
                        <div class="image-preview">
                            <hooper
                                group="group1"
                                :itemsToShow="3"
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

export default {
    components: {
        Hooper,
        Slide,
        HooperPagination,
        HooperNavigation,
    },

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
    left: 0;
    transform: translate(-40%, 0);
}

.image-preview-button-next {
    top: 40%;
    right: 0;
    transform: translate(40%, 0);
}
</style>
