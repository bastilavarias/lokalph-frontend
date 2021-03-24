<template>
    <section>
        <v-row dense v-if="product">
            <v-col cols="12">
                <custom-breadcrumbs-component
                    :items="breadcrumbs"
                ></custom-breadcrumbs-component>
            </v-col>
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
                <v-row dense>
                    <v-col cols="12">
                        <v-list-item two-line>
                            <v-list-item-content>
                                <v-list-item-title>
                                    <span
                                        :title="product.name"
                                        class="headline font-weight-bold"
                                        >{{ product.name }}</span
                                    >
                                </v-list-item-title>
                                <v-list-item-title>
                                    <span
                                        class="title font-weight-bold primary--text"
                                        :title="
                                            formatMoney('PHP', product.price)
                                        "
                                    >
                                        {{ formatMoney("PHP", product.price) }}
                                    </span>
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
                    </v-col>
                    <v-col cols="12">
                        <v-list-item two-line>
                            <v-list-item-avatar :size="75">
                                <v-img :src="product.shop.image_url"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>
                                    <span :title="product.shop.name">
                                        {{ product.shop.name }}
                                    </span>
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    <span
                                        :title="`Posted this ${formatRelativeTime(
                                            product.created_at
                                        )}`"
                                    >
                                        Posted this
                                        {{
                                            formatRelativeTime(
                                                product.created_at
                                            )
                                        }}
                                    </span>
                                </v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn
                                    color="secondary"
                                    class="text-capitalize"
                                    depressed
                                    >Visit</v-btn
                                >
                            </v-list-item-action>
                        </v-list-item>
                    </v-col>
                    <v-col cols="12">
                        <v-card flat>
                            <v-card-subtitle>Product Details:</v-card-subtitle>
                            <v-card-text class="accent--text">
                                <v-row dense>
                                    <v-col cols="12">
                                        <div
                                            class="d-flex align-content-center align-center"
                                        >
                                            <v-icon class="mr-1"
                                                >mdi-shape</v-icon
                                            >
                                            <span
                                                class="subtitle-1"
                                                :title="`Product Category: ${product.category.label}`"
                                                >Category:
                                                <span class="font-weight-bold">
                                                    {{ product.category.label }}
                                                </span>
                                            </span>
                                        </div>
                                    </v-col>
                                    <v-col cols="12">
                                        <div
                                            class="d-flex align-content-center align-center"
                                        >
                                            <v-icon class="mr-1"
                                                >mdi-checkbox-blank</v-icon
                                            >
                                            <span
                                                class="subtitle-1"
                                                :title="`This item is tagged as ${product.condition.label}`"
                                                >{{
                                                    product.condition.label
                                                }}</span
                                            >
                                        </div>
                                    </v-col>
                                    <v-col cols="12">
                                        <div
                                            class="d-flex align-content-center align-center"
                                        >
                                            <v-icon class="mr-1"
                                                >mdi-file-table-box-multiple</v-icon
                                            >
                                            <span
                                                class="subtitle-1"
                                                title="Total Stock"
                                            >
                                                <span
                                                    class="secondary--text font-weight-bold"
                                                >
                                                    {{ product.stock }}
                                                </span>
                                                stock available
                                            </span>
                                        </div>
                                    </v-col>
                                    <v-col cols="12">
                                        <div
                                            class="d-flex align-content-center align-center"
                                        >
                                            <v-icon class="mr-1"
                                                >mdi-heart</v-icon
                                            >
                                            <span class="subtitle-1">
                                                <span
                                                    class="font-weight-bold secondary--text"
                                                    >4</span
                                                >
                                                hearts
                                            </span>
                                        </div>
                                    </v-col>
                                    <v-col cols="12">
                                        <div
                                            class="d-flex align-content-center align-center"
                                        >
                                            <v-icon class="mr-1"
                                                >mdi-eye</v-icon
                                            >
                                            <span class="subtitle-1">
                                                <span
                                                    class="font-weight-bold secondary--text"
                                                    >4</span
                                                >
                                                views
                                            </span>
                                        </div>
                                    </v-col>
                                    <v-col cols="12">
                                        <div
                                            class="d-flex align-content-center align-center"
                                        >
                                            <v-icon class="mr-1"
                                                >mdi-truck</v-icon
                                            >
                                            <span
                                                class="subtitle-1"
                                                title="Preferred shipping method"
                                            >
                                                Preferred for
                                                <span class="font-weight-bold">
                                                    {{ preferredFor }}
                                                </span>
                                            </span>
                                        </div>
                                    </v-col>
                                    <v-col cols="12">
                                        <div
                                            class="d-flex align-content-center align-center"
                                        >
                                            <v-icon class="mr-1"
                                                >mdi-map-marker</v-icon
                                            >
                                            <span
                                                class="subtitle-1"
                                                title="Shop Location"
                                            >
                                                {{ product.shop.address.value }}
                                            </span>
                                        </div>
                                    </v-col>
                                    <v-col cols="12">
                                        <div
                                            class="d-flex align-content-center align-center"
                                        >
                                            <v-icon class="mr-1"
                                                >mdi-clock</v-icon
                                            >
                                            <span class="subtitle-1">
                                                Posted
                                                {{
                                                    formatRelativeTime(
                                                        product.created_at
                                                    )
                                                }}
                                            </span>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12">
                        <v-card flat>
                            <v-card-text class="subtitle-1 accent--text">
                                <div
                                    class="d-flex align-content-center align-center"
                                >
                                    <v-icon class="mr-1"
                                        >mdi-information</v-icon
                                    >
                                    <span class="subtitle-1">
                                        Description
                                    </span>
                                </div>
                                <template
                                    v-if="
                                        truncateHTML(product.description, 75)
                                            .length < 75
                                    "
                                >
                                    <div v-html="product.description"></div>
                                </template>
                                <template
                                    v-if="
                                        truncateHTML(product.description, 75)
                                            .length > 75 &&
                                        !shouldShowFullDescription
                                    "
                                >
                                    <div
                                        v-html="
                                            truncateHTML(
                                                product.description,
                                                75
                                            )
                                        "
                                    ></div>
                                </template>
                                <template
                                    v-if="
                                        truncateHTML(product.description, 75)
                                            .length > 75 &&
                                        shouldShowFullDescription
                                    "
                                >
                                    <div v-html="product.description"></div>
                                </template>
                                <span
                                    class="font-weight-bold secondary--text"
                                    :style="{ cursor: 'pointer' }"
                                    @click="
                                        shouldShowFullDescription = !shouldShowFullDescription
                                    "
                                    v-if="
                                        truncateHTML(product.description, 75)
                                            .length > 75
                                    "
                                    >{{
                                        shouldShowFullDescription
                                            ? "Show less"
                                            : "Read more"
                                    }}
                                    <v-icon color="secondary">{{
                                        shouldShowFullDescription
                                            ? "mdi-chevron-up"
                                            : "mdi-chevron-down"
                                    }}</v-icon></span
                                >
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" md="9">
                <v-card outlined rounded>
                    <v-card-title v-if="!isOwner"
                        >Questions about this product</v-card-title
                    >
                    <v-card-text v-if="!isOwner">
                        <v-row dense>
                            <v-col cols="1">
                                <div class="d-flex justify-center">
                                    <v-avatar>
                                        <v-img
                                            :src="user.profile.image_url"
                                        ></v-img>
                                    </v-avatar>
                                </div>
                            </v-col>
                            <v-col cols="11">
                                <v-textarea
                                    outlined
                                    placeholder="Write your question(s) here"
                                    :counter="100"
                                    color="secondary"
                                ></v-textarea>
                            </v-col>
                            <v-col cols="12">
                                <div
                                    class="d-flex justify-space-between align-center align-content-center"
                                >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="secondary"
                                        depressed
                                        class="text-capitalize"
                                        >Ask</v-btn
                                    >
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-title>
                        {{
                            isOwner
                                ? "Questions about your product"
                                : "Questions about this product"
                        }}
                    </v-card-title>
                    <v-card-subtitle
                        >Showing 5 out of 10 inquiries</v-card-subtitle
                    >
                    <v-card-text>
                        <v-row dense>
                            <template v-for="n in 3">
                                <v-col cols="12" :key="n">
                                    <product-post-view-inquiry-card-component></product-post-view-inquiry-card-component>
                                </v-col>
                            </template>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="3">
                <v-card flat>
                    <v-card-subtitle>From the same Shop</v-card-subtitle>
                </v-card>
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
import CustomBreadcrumbsComponent from "@/components/custom/breadcrumbs-component";
import ProductPostViewInquiryCardComponent from "@/components/views/product-post/inquiry-card-component";

export default {
    components: {
        ProductPostViewInquiryCardComponent,
        CustomBreadcrumbsComponent,
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
            shouldShowFullDescription: false,
        };
    },

    computed: {
        user() {
            return this.$store.state.authentication.user;
        },

        slug() {
            return this.$route.params.slug;
        },

        preferredFor() {
            if (!this.product) return null;
            const sm = this.product.shipping_methods.map((sm) => sm.label);
            return sm.length === 1 ? sm[0] : "Meet Up & Pick Up";
        },

        breadcrumbs() {
            return [
                {
                    text: "Home",
                    disabled: false,
                    href: "/",
                },
                {
                    text: this.product.category.label,
                    disabled: false,
                    href: "/",
                },
                {
                    text: this.product.name,
                    disabled: false,
                    href: null,
                },
            ];
        },

        isOwner() {
            if (!this.user) return false;
            return this.product.shop.account.id === this.user.id;
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
            console.log(this.product);
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
