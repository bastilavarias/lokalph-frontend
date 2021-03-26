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
                            <v-list-item-action v-if="user && !isOwner">
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
                            >
                                View Received Offers
                            </v-btn>
                        </v-card-text>
                    </v-col>
                    <v-col cols="12" v-if="user && !isOwner">
                        <v-card-text>
                            <v-row dense>
                                <v-col cols="12" md="6">
                                    <v-btn color="primary" outlined block large>
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
                                        <v-skeleton-loader
                                            type="list-item"
                                            v-if="isGetProductViewsStart"
                                        ></v-skeleton-loader>
                                        <div
                                            class="d-flex align-content-center align-center"
                                            v-if="
                                                views && !isGetProductViewsStart
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
                                    color="primary"
                                    v-model="inquiry"
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
                                        :loading="isCreateProductInquiryStart"
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
                        {{ inquiriesTotalCount }} inquiries</v-card-subtitle
                    >
                    <v-card-text>
                        <v-row dense>
                            <template v-for="(inquiry, index) in inquiries">
                                <v-col cols="12" :key="index">
                                    <product-post-view-inquiry-card-component
                                        :product-id="inquiry.product.id"
                                        :inquiry-id="inquiry.id"
                                        :first-name="
                                            inquiry.account.profile.first_name
                                        "
                                        :created-at="inquiry.created_at"
                                        :message="inquiry.message"
                                        :image-url="
                                            inquiry.account.profile.image_url
                                        "
                                        :owner-id="product.shop.account.id"
                                    ></product-post-view-inquiry-card-component>
                                </v-col>
                            </template>
                        </v-row>
                    </v-card-text>
                    <infinite-loading
                        @infinite="getInquiries"
                        :identifier="scrollOptions.id"
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
                        {{ inquiriesTotalCount }} inquiries</v-card-subtitle
                    >
                </v-card>
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
            v-if="product"
        ></product-post-view-offer-dialog-component>
    </section>
</template>

<script>
import {
    CREATE_PRODUCT_INQUIRY,
    CREATE_PRODUCT_VIEW,
    GET_PRODUCT_INQUIRIES,
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

export default {
    components: {
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
            scrollOptions: {
                page: 1,
                perPage: 3,
                id: +new Date(),
                totalCount: 0,
            },
            inquiriesTotalCount: 0,
            isOfferDialogOpen: false,
            isGetProductViewsStart: false,
            views: null,
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
    },

    watch: {
        carouselData() {
            this.$refs.carousel.slideTo(this.carouselData);
        },

        async product(value) {
            if (value) {
                if (this.user)
                    await this.$store.dispatch(CREATE_PRODUCT_VIEW, value.id);
                await this.getProductViews();
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
            const { success, data } = await this.$store.dispatch(
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

        async getInquiries($state) {
            const payload = {
                productId: this.product.id,
                page: this.scrollOptions.page,
                perPage: this.scrollOptions.perPage,
            };
            const { data } = await this.$store.dispatch(
                GET_PRODUCT_INQUIRIES,
                payload
            );
            const inquiries = data.inquiries;
            this.inquiriesTotalCount = data.total_count || 0;
            if (inquiries.length === this.scrollOptions.perPage) {
                this.inquiries = [...this.inquiries, ...inquiries];
                this.scrollOptions.page += 1;
                $state.loaded();
                return;
            }
            this.inquiries = [...this.inquiries, ...inquiries];
            $state.complete();
        },

        clearInquiries() {
            this.inquiries = [];
            this.scrollOptions = Object.assign(this.scrollOptions, {
                page: 1,
                id: this.scrollOptions.id + 1,
                totalCount: 0,
            });
        },

        async getProductViews() {
            this.isGetProductViewsStart = true;
            const { data } = await this.$store.dispatch(
                GET_PRODUCT_VIEWS,
                this.product.id
            );
            this.views = data;
            this.isGetProductViewsStart = false;
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
