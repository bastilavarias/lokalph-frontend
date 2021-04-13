<template>
    <section>
        <product-post-view-skeleton-loaders-component
            v-if="isGetProductDetailsStart && !product"
        ></product-post-view-skeleton-loaders-component>
        <v-row dense v-if="!isGetProductDetailsStart && product">
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
                        <v-list-item
                            :two-line="doesHaveStock"
                            :three-line="!doesHaveStock"
                        >
                            <v-list-item-content>
                                <v-list-item-subtitle v-if="!doesHaveStock">
                                    <v-chip small color="error"
                                        >Out of Stock</v-chip
                                    >
                                </v-list-item-subtitle>
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
                            <v-list-item-action v-if="user && !isOwner">
                                <v-btn
                                    icon
                                    large
                                    v-if="isAlreadyLiked"
                                    @click="deleteProductLike"
                                    :loading="
                                        !shouldShowProductViewsAndLikes ||
                                        isDeleteProductLikeStart
                                    "
                                >
                                    <v-icon color="primary" large
                                        >mdi-heart</v-icon
                                    >
                                </v-btn>
                                <v-btn
                                    icon
                                    large
                                    v-if="!isAlreadyLiked"
                                    @click="createProductLike"
                                    :loading="
                                        !shouldShowProductViewsAndLikes ||
                                        isCreateProductLikeStart
                                    "
                                >
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
                                    color="primary"
                                    class="text-capitalize"
                                    depressed
                                    >Visit</v-btn
                                >
                            </v-list-item-action>
                        </v-list-item>
                    </v-col>
                    <v-col cols="12" v-if="user && isOwner">
                        <v-card-text>
                            <v-btn
                                color="primary"
                                block
                                depressed
                                class="text-capitalize"
                                large
                                :to="{ name: 'seller-dashboard-offer' }"
                            >
                                View Received Offers
                            </v-btn>
                        </v-card-text>
                    </v-col>
                    <v-col cols="12" v-if="user && !isOwner">
                        <v-card-text>
                            <v-row dense>
                                <v-col cols="12" md="6">
                                    <v-btn
                                        color="primary"
                                        outlined
                                        block
                                        large
                                        :disabled="!doesHaveStock"
                                    >
                                        <v-icon class="mr-1"
                                            >mdi-chat-outline</v-icon
                                        >
                                        <span class="text-capitalize"
                                            >Chat Shop</span
                                        >
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-btn
                                        color="primary"
                                        block
                                        depressed
                                        large
                                        @click="isOfferDialogOpen = true"
                                        :disabled="!doesHaveStock"
                                    >
                                        <v-icon class="mr-1"
                                            >mdi-currency-php</v-icon
                                        >
                                        <span class="text-capitalize"
                                            >Make
                                            <span class="text-lowercase"
                                                >an</span
                                            >
                                            Offer</span
                                        >
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-text>
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
                                        <v-skeleton-loader
                                            type="list-item"
                                            v-if="
                                                !shouldShowProductViewsAndLikes
                                            "
                                        ></v-skeleton-loader>
                                        <div
                                            class="d-flex align-content-center align-center"
                                            v-if="
                                                shouldShowProductViewsAndLikes
                                            "
                                        >
                                            <v-icon class="mr-1"
                                                >mdi-heart</v-icon
                                            >
                                            <span class="subtitle-1">
                                                <span
                                                    class="font-weight-bold secondary--text"
                                                    >{{ likesCount }}</span
                                                >
                                                likes
                                            </span>
                                        </div>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-skeleton-loader
                                            type="list-item"
                                            v-if="
                                                !shouldShowProductViewsAndLikes
                                            "
                                        ></v-skeleton-loader>
                                        <div
                                            class="d-flex align-content-center align-center"
                                            v-if="
                                                shouldShowProductViewsAndLikes
                                            "
                                        >
                                            <v-icon class="mr-1"
                                                >mdi-eye</v-icon
                                            >
                                            <span class="subtitle-1">
                                                <span
                                                    class="font-weight-bold secondary--text"
                                                    >{{ views }}</span
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
                                                    {{ preferShippingMethods }}
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
                                                >mdi-cellphone</v-icon
                                            >
                                            <span
                                                class="subtitle-1"
                                                title="Contact Number"
                                            >
                                                {{
                                                    product.shop.contact_number
                                                }}
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
                                        !isDescriptionExpanded
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
                                        isDescriptionExpanded
                                    "
                                >
                                    <div v-html="product.description"></div>
                                </template>
                                <span
                                    class="font-weight-bold secondary--text"
                                    :style="{ cursor: 'pointer' }"
                                    @click="
                                        isDescriptionExpanded = !isDescriptionExpanded
                                    "
                                    v-if="
                                        truncateHTML(product.description, 75)
                                            .length > 75
                                    "
                                    >{{
                                        isDescriptionExpanded
                                            ? "Show less"
                                            : "Read more"
                                    }}
                                    <v-icon color="secondary">{{
                                        isDescriptionExpanded
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
                <v-row dense>
                    <v-col cols="12">
                        <v-card outlined rounded>
                            <v-card-title>
                                Reviews from bought this Product
                            </v-card-title>
                            <v-card-subtitle
                                >Showing {{ reviewsCount }} out of
                                {{ reviewsPaginationOptions.totalCount }}
                                reviews</v-card-subtitle
                            >
                            <v-card-text>
                                <template
                                    v-for="(
                                        filter, index
                                    ) in reviewsRatingFilters"
                                >
                                    <v-chip
                                        small
                                        color="primary"
                                        :outlined="
                                            !isSelectedReviewFilter(
                                                filter.value
                                            )
                                        "
                                        class="ma-1"
                                        @click="
                                            selectedReviewFilter = filter.value
                                        "
                                        :key="index"
                                    >
                                        <v-icon small class="mr-1"
                                            >mdi-star</v-icon
                                        >
                                        <span>{{ filter.text }}</span>
                                    </v-chip>
                                </template>
                                <div class="pt-5" v-if="reviewsCount > 0">
                                    <template
                                        v-for="(review, index) in reviews"
                                    >
                                        <product-post-view-review-card-component
                                            :key="index"
                                            :first-name="
                                                review.account.profile
                                                    .first_name
                                            "
                                            :created-at="review.created_at"
                                            :message="review.text"
                                            :image-url="
                                                review.account.profile.image_url
                                            "
                                            :rating="review.rating"
                                            :images="review.images"
                                        ></product-post-view-review-card-component>
                                    </template>
                                </div>
                                <div
                                    class="d-flex justify-center align-center align-content-center py-5"
                                    v-if="isGetProductReviewsStart"
                                >
                                    <custom-loading-spinner-component></custom-loading-spinner-component>
                                </div>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    depressed
                                    color="primary"
                                    class="text-capitalize"
                                    @click="getProductReviews"
                                    v-if="
                                        reviewsCount <
                                        reviewsPaginationOptions.totalCount
                                    "
                                    >See More</v-btn
                                >
                            </v-card-actions>
                            <v-card-subtitle
                                >Showing {{ reviewsCount }} out of
                                {{ reviewsPaginationOptions.totalCount }}
                                reviews</v-card-subtitle
                            >
                        </v-card>
                    </v-col>
                    <v-col cols="12">
                        <v-card outlined rounded>
                            <v-card-title v-if="user && !isOwner"
                                >Questions about this Product</v-card-title
                            >
                            <v-card-text v-if="user && !isOwner">
                                <v-row dense>
                                    <v-col cols="1">
                                        <div class="d-flex justify-center">
                                            <v-avatar>
                                                <v-img
                                                    :src="
                                                        user.profile.image_url
                                                    "
                                                ></v-img>
                                            </v-avatar>
                                        </div>
                                    </v-col>
                                    <v-col cols="11">
                                        <v-textarea
                                            outlined
                                            placeholder="Write your question(s) here"
                                            :counter="100"
                                            color="primary"
                                            v-model="inquiry"
                                            :disabled="!doesHaveStock"
                                        ></v-textarea>
                                    </v-col>
                                    <v-col cols="12">
                                        <div
                                            class="d-flex justify-space-between align-center align-content-center"
                                        >
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                color="primary"
                                                depressed
                                                class="text-capitalize"
                                                :loading="
                                                    isCreateProductInquiryStart
                                                "
                                                @click="createProductInquiry"
                                                :disabled="!isInquiryFormValid"
                                                >Ask</v-btn
                                            >
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-card-title v-if="user && isOwner"
                                >Questions about your product</v-card-title
                            >
                            <v-card-title v-if="!user && !isOwner"
                                >Questions about this product</v-card-title
                            >
                            <v-card-title v-if="user && !isOwner"
                                >Other Questions</v-card-title
                            >
                            <v-card-subtitle
                                >Showing {{ inquiriesCount }} out of
                                {{ inquiriesTotalCount }}
                                inquiries</v-card-subtitle
                            >
                            <v-card-text>
                                <v-row dense>
                                    <template
                                        v-for="(inquiry, index) in inquiries"
                                    >
                                        <v-col cols="12" :key="index">
                                            <product-post-view-inquiry-card-component
                                                :product-id="inquiry.product.id"
                                                :inquiry-id="inquiry.id"
                                                :first-name="
                                                    inquiry.account.profile
                                                        .first_name
                                                "
                                                :created-at="inquiry.created_at"
                                                :message="inquiry.message"
                                                :image-url="
                                                    inquiry.account.profile
                                                        .image_url
                                                "
                                                :owner-id="
                                                    product.shop.account.id
                                                "
                                            ></product-post-view-inquiry-card-component>
                                        </v-col>
                                    </template>
                                </v-row>
                            </v-card-text>
                            <infinite-loading
                                @infinite="getProductInquiries"
                                :identifier="inquiriesScrollOptions.id"
                            >
                                <template v-slot:spinner>
                                    <custom-loading-spinner-component></custom-loading-spinner-component>
                                </template>
                                <template v-slot:no-more>
                                    <span></span>
                                </template>
                                <template v-slot:no-results>
                                    <div class="text-center py-5">
                                        <span class="font-italic">
                                            {{
                                                inquiries.length === 0
                                                    ? "No inquiries yet."
                                                    : ""
                                            }}
                                        </span>
                                    </div>
                                </template>
                            </infinite-loading>
                            <v-card-subtitle
                                >Showing {{ inquiriesCount }} out of
                                {{ inquiriesTotalCount }}
                                inquiries</v-card-subtitle
                            >
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" md="3">
                <v-card flat>
                    <v-card-subtitle>From the same Shop</v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>
        <product-post-view-offer-dialog-component
            :is-open.sync="isOfferDialogOpen"
            :preview="product.images[0]"
            :name="product.name"
            :created-at="product.created_at"
            :condition="product.condition"
            :stock="product.stock"
            :price="product.price"
            :shipping-methods="product.shipping_methods"
            :category="product.category"
            :product-id="product.id"
            :shop-id="product.shop.id"
            v-if="product"
        ></product-post-view-offer-dialog-component>
    </section>
</template>

<script>
import {
    CREATE_PRODUCT_INQUIRY,
    CREATE_PRODUCT_LIKE,
    CREATE_PRODUCT_VIEW,
    DELETE_PRODUCT_LIKE,
    GET_PRODUCT_INQUIRIES,
    GET_PRODUCT_LIKES,
    GET_PRODUCT_VIEWS,
    GET_SHOP_PRODUCT_DETAILS_BY_SLUG,
} from "@/store/types/product-store-type";
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
import CustomLoadingSpinnerComponent from "@/components/custom/loading-spinner-component";
import ProductPostViewOfferDialogComponent from "@/components/views/product-post/offer-dialog-component";
import ProductPostViewSkeletonLoadersComponent from "@/components/views/product-post/skeleton-loaders-component";
import { GET_PRODUCT_REVIEWS } from "@/store/types/review-store-type";
import ProductPostViewReviewCardComponent from "@/components/views/product-post/review-card-component";

export default {
    components: {
        ProductPostViewReviewCardComponent,
        ProductPostViewSkeletonLoadersComponent,
        ProductPostViewOfferDialogComponent,
        CustomLoadingSpinnerComponent,
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
            isDescriptionExpanded: false,
            inquiries: [],
            isCreateProductInquiryStart: false,
            inquiry: null,
            inquiriesScrollOptions: {
                page: 1,
                perPage: 3,
                id: +new Date(),
                totalCount: 0,
            },
            inquiriesTotalCount: 0,
            isOfferDialogOpen: false,
            views: null,
            likes: [],
            shouldShowProductViewsAndLikes: false,
            isCreateProductLikeStart: false,
            isDeleteProductLikeStart: false,
            reviews: [],
            selectedReviewFilter: null,
            reviewsPaginationOptions: {
                page: 1,
                perPage: 3,
                totalCount: 0,
            },
            isGetProductReviewsStart: false,
        };
    },

    computed: {
        user() {
            return this.$store.state.authentication.user;
        },

        shopId() {
            return this.$route.params.shopId;
        },

        slug() {
            return this.$route.params.slug;
        },

        preferShippingMethods() {
            if (!this.product) return null;
            const sm = this.product.shipping_methods.map((sm) => sm.label);
            return sm.length === 1 ? sm[0] : "Meet Up or Pick Up";
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

        isInquiryFormValid() {
            return (
                this.inquiry &&
                this.inquiry.length >= 4 &&
                this.inquiry.length <= 100
            );
        },

        inquiriesCount() {
            return this.inquiries.length;
        },

        isAlreadyLiked() {
            return !!this.likes.find(
                (like) => like.account.id === this.user.id
            );
        },

        likesCount() {
            return this.likes.length || 0;
        },

        doesHaveStock() {
            return this.product.stock > 0;
        },

        reviewsCount() {
            return this.reviews.length;
        },

        reviewsRatingFilters() {
            return [
                {
                    text: "All",
                    value: null,
                },

                {
                    text: "5 Stars",
                    value: 5,
                },

                {
                    text: "4 Stars",
                    value: 4,
                },

                {
                    text: "3 Stars",
                    value: 3,
                },

                {
                    text: "2 Stars",
                    value: 2,
                },

                {
                    text: "1 Star",
                    value: 1,
                },
            ];
        },
    },

    watch: {
        carouselData() {
            this.$refs.carousel.slideTo(this.carouselData);
        },

        async product(value) {
            if (value) {
                if (this.user)
                    await this.$store.dispatch(CREATE_PRODUCT_VIEW, value.id);
                await this.getProductLikes();
                await this.getProductViews();
                this.shouldShowProductViewsAndLikes = true;
            }
        },
    },

    methods: {
        async getProductDetails() {
            this.isGetProductDetailsStart = true;
            const payload = {
                shopId: this.shopId,
                slug: this.slug,
            };
            const { data } = await this.$store.dispatch(
                GET_SHOP_PRODUCT_DETAILS_BY_SLUG,
                payload
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

        async createProductInquiry() {
            this.isCreateProductInquiryStart = true;
            const payload = {
                productId: this.product.id,
                message: this.inquiry,
            };
            const { success } = await this.$store.dispatch(
                CREATE_PRODUCT_INQUIRY,
                payload
            );
            if (success) {
                this.clearInquiries();
                this.inquiry = null;
                this.isCreateProductInquiryStart = false;
                this.inquiriesTotalCount =
                    parseInt(this.inquiriesTotalCount) + 1;
            }
            this.isCreateProductInquiryStart = false;
        },

        async getProductInquiries($state) {
            const payload = {
                productId: this.product.id,
                page: this.inquiriesScrollOptions.page,
                perPage: this.inquiriesScrollOptions.perPage,
            };
            const { data } = await this.$store.dispatch(
                GET_PRODUCT_INQUIRIES,
                payload
            );
            const inquiries = data.inquiries;
            this.inquiriesTotalCount = data.total_count || 0;
            if (inquiries.length === this.inquiriesScrollOptions.perPage) {
                this.inquiries = [...this.inquiries, ...inquiries];
                this.inquiriesScrollOptions.page += 1;
                $state.loaded();
                return;
            }
            this.inquiries = [...this.inquiries, ...inquiries];
            $state.complete();
        },

        clearInquiries() {
            this.inquiries = [];
            this.inquiriesScrollOptions = Object.assign(
                this.inquiriesScrollOptions,
                {
                    page: 1,
                    id: this.inquiriesScrollOptions.id + 1,
                    totalCount: 0,
                }
            );
        },

        async getProductViews() {
            const { data } = await this.$store.dispatch(
                GET_PRODUCT_VIEWS,
                this.product.id
            );
            this.views = data;
        },

        async createProductLike() {
            this.isCreateProductLikeStart = true;
            const { data } = await this.$store.dispatch(
                CREATE_PRODUCT_LIKE,
                this.product.id
            );
            if (data) {
                this.likes = [...this.likes, data];
                this.isCreateProductLikeStart = false;
                return;
            }
            this.isCreateProductLikeStart = false;
        },

        async getProductLikes() {
            const { data } = await this.$store.dispatch(
                GET_PRODUCT_LIKES,
                this.product.id
            );
            this.likes = data || [];
        },

        async deleteProductLike() {
            this.isDeleteProductLikeStart = true;
            const { data } = await this.$store.dispatch(
                DELETE_PRODUCT_LIKE,
                this.product.id
            );
            if (data) {
                this.likes = this.likes.filter(
                    (like) => like.account.id !== this.user.id
                );
                this.isDeleteProductLikeStart = false;
                return;
            }
            this.isDeleteProductLikeStart = false;
        },

        isSelectedReviewFilter(filter) {
            return this.selectedReviewFilter === filter;
        },

        async getProductReviews() {
            this.isGetProductReviewsStart = true;
            const payload = {
                productId: this.product.id,
                page: this.reviewsPaginationOptions.page,
                perPage: this.reviewsPaginationOptions.perPage,
                search: this.selectedReviewFilter,
            };
            const { data } = await this.$store.dispatch(
                GET_PRODUCT_REVIEWS,
                payload
            );
            console.log(data);
            const reviews = data.product_review;
            if (reviews.length === this.reviewsPaginationOptions.perPage) {
                this.reviews = [...this.reviews, ...reviews];
                this.reviewsPaginationOptions.page += 1;
                this.isGetProductReviewsStart = false;
                this.reviewsPaginationOptions.totalCount =
                    data.total_count || 0;
                return;
            }
            this.reviews = [...this.reviews, ...reviews];
            this.isGetProductReviewsStart = false;
        },
    },

    async created() {
        this.shouldShowProductViewsAndLikes = false;
        await this.getProductDetails();
        await this.getProductReviews();
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
