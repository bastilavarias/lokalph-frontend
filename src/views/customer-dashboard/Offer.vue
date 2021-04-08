<template>
    <v-card outlined>
        <v-card-title>Offers</v-card-title>
        <template v-for="(offer, index) in offers">
            <customer-dashboard-view-offer-list-item-component
                :offer-id="offer.id"
                :shop-id="offer.shop.id"
                :shop-name="offer.shop.name"
                :shop-slug="offer.shop.slug"
                :shop-image-url="offer.shop.image_url"
                :shop-created-at="offer.shop.created_at"
                :product-slug="offer.product.slug"
                :product-name="offer.product.name"
                :account-email="offer.account.email"
                :offer-status="offer.status"
                :offer-quantity="offer.quantity"
                :offer-total-price="offer.total_price"
                :offer-created-at="offer.created_at"
                :product-preview="offer.product.images[0]"
                :offers.sync="offers"
                :offer-cancelled-by="offer.cancelled_by"
            ></customer-dashboard-view-offer-list-item-component>
            <v-divider v-if="offers.length - 1 !== index"></v-divider>
        </template>
        <infinite-loading @infinite="getOffers" :identifier="scrollOptions.id">
            <template v-slot:spinner>
                <custom-loading-spinner-component></custom-loading-spinner-component>
            </template>
            <template v-slot:no-more>
                <span></span>
            </template>
            <template v-slot:no-results>
                <div class="text-center py-5">
                    <span class="font-italic">
                        {{ offers.length === 0 ? "No offers available." : "" }}
                    </span>
                </div>
            </template>
        </infinite-loading>
    </v-card>
</template>

<script>
import { GET_ACCOUNT_OFFERS } from "@/store/types/offer-store-type";
import CustomLoadingSpinnerComponent from "@/components/custom/loading-spinner-component";
import CustomRouterLinkComponent from "@/components/custom/router-link-component";
import commonUtility from "@/common/utility";
import GlobalOfferStatusChipComponent from "@/components/global/offer-status-chip-component";
import CustomerDashboardViewOfferListItemComponent from "@/components/views/customer-dashboard/offer-list-item-component";

export default {
    components: {
        CustomerDashboardViewOfferListItemComponent,
        GlobalOfferStatusChipComponent,
        CustomRouterLinkComponent,
        CustomLoadingSpinnerComponent,
    },

    mixins: [commonUtility],

    data() {
        return {
            offers: [],
            scrollOptions: {
                page: 1,
                perPage: 5,
                id: +new Date(),
            },
            isCancelOfferStart: false,
        };
    },

    computed: {
        user() {
            return this.$store.state.authentication.user;
        },
    },

    methods: {
        async getOffers($state) {
            const payload = {
                page: this.scrollOptions.page,
                perPage: this.scrollOptions.perPage,
            };
            const { data } = await this.$store.dispatch(
                GET_ACCOUNT_OFFERS,
                payload
            );
            const offers = data.account_offers;
            if (offers.length === this.scrollOptions.perPage) {
                this.offers = [...this.offers, ...offers];
                $state.loaded();
                this.scrollOptions.page += 1;
                return;
            }
            this.offers = [...this.offers, ...offers];
            $state.complete();
        },
    },
};
</script>
