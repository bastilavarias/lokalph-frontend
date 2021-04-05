<template>
    <v-card outlined>
        <v-card-title>Offers</v-card-title>
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

export default {
    components: { CustomLoadingSpinnerComponent },
    data() {
        return {
            offers: [],
            scrollOptions: {
                page: 1,
                perPage: 3,
                id: +new Date(),
                totalCount: 0,
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
