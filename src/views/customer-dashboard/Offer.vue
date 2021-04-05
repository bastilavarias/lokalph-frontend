<template>
    <v-card outlined>
        <v-card-title>Offers</v-card-title>
        <template v-for="(offer, index) in offers">
            <v-list-item :key="index" three-line>
                <v-list-item-content>
                    <v-list-item-title>
                        <custom-router-link-component
                            :to="{
                                name: 'product-post-view',
                                params: {
                                    shopId: offer.shop.id,
                                    slug: offer.product.slug,
                                },
                            }"
                        >
                            <span class="black--text font-weight-bold">{{
                                offer.product.name
                            }}</span>
                        </custom-router-link-component>
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        <span class="font-weight-bold secondary--text">{{
                            formatMoney("PHP", offer.total_price)
                        }}</span>
                        ·
                        <span> {{ offer.quantity }} pcs </span>
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                        <span class="black--text">
                            Offered by:
                            <custom-router-link-component
                                :to="{
                                    name: 'profile-view',
                                    params: {
                                        email: offer.account.email,
                                    },
                                }"
                            >
                                <span
                                    class="black--text text-decoration-underline"
                                    >You</span
                                >
                            </custom-router-link-component>
                            ·
                            <span>{{
                                formatRelativeTime(offer.created_at)
                            }}</span>
                        </span>
                    </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                    <global-offer-status-chip-component
                        :status="offer.status"
                    ></global-offer-status-chip-component>
                </v-list-item-action>
            </v-list-item>
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

export default {
    components: {
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
                accountId: this.user.id,
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
