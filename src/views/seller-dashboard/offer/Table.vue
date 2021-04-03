<template>
    <v-card outlined>
        <v-card-title>
            <div class="d-flex align-center">
                <span class="mr-1">Offers</span>
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            text
                            v-bind="attrs"
                            v-on="on"
                            :loading="!selectedShopId || isGetShopsStart"
                            small
                        >
                            <span
                                class="mr-1 font-weight-bold"
                                v-if="selectedShop"
                                >{{ selectedShop.name }}</span
                            >
                            <v-badge
                                color="primary"
                                dot
                                v-if="!selectedShop"
                                class="mr-2 text-capitalize font-italic"
                            >
                                Select Shop
                            </v-badge>
                            <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <template v-for="(shop, index) in shops">
                            <v-list-item
                                :key="index"
                                @click="
                                    setRouteQueries(
                                        shop.id,
                                        selectedDatePresetValue
                                    )
                                "
                                :disabled="selectedShopId === shop.id"
                                >{{ shop.name }}</v-list-item
                            >
                        </template>
                    </v-list>
                </v-menu>
            </div>
            <v-spacer></v-spacer>
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        text
                        v-bind="attrs"
                        v-on="on"
                        small
                        :loading="!selectedDatePresetValue"
                    >
                        <v-icon class="mr-1">mdi-calendar</v-icon>
                        <span
                            class="font-weight-bold"
                            v-if="selectedDatePreset && dateFrom && dateTo"
                            >{{ formatBirthDate(dateFrom) }} -
                            {{ formatBirthDate(dateTo) }}</span
                        >
                        <span
                            class="font-weight-bold"
                            v-if="selectedDatePreset && !dateFrom && !dateTo"
                            >{{ selectedDatePreset.label }}</span
                        >
                        <v-badge
                            color="primary"
                            dot
                            v-if="!selectedDatePreset && !dateFrom && !dateTo"
                            class="mr-2 text-capitalize font-italic"
                        >
                            Date Range
                        </v-badge>
                    </v-btn>
                </template>
                <v-list>
                    <v-subheader v-if="hasCustomDates"
                        >Date Presets</v-subheader
                    >
                    <template v-for="(range, index) in datePresets">
                        <v-list-item
                            :key="index"
                            @click="
                                setRouteQueries(selectedShopId, range.value)
                            "
                            :disabled="selectedDatePresetValue === range.value"
                            >{{ range.label }}</v-list-item
                        >
                    </template>
                    <v-divider v-if="hasCustomDates"></v-divider>
                    <v-list-item
                        @click="isDateRangesDialogOpen = true"
                        v-if="hasCustomDates"
                        >Change Custom Date</v-list-item
                    >
                </v-list>
            </v-menu>
        </v-card-title>
        <v-data-table
            :headers="tableHeaders"
            :items="offers"
            :server-items-length="pagination.totalCount"
            :items-per-page.sync="pagination.perPage"
            :page.sync="pagination.page"
            :footer-props="{
                'items-per-page-options': pagination.rowsPerPageItems,
            }"
            :loading="isGetOffersStart"
        >
            <template v-slot:item.product="{ item }">
                <custom-router-link-component
                    :to="{
                        name: 'product-post-view',
                        params: {
                            shopId: item.shop.id,
                            slug: item.product.slug,
                        },
                    }"
                >
                    <span class="black--text font-weight-bold">{{
                        item.product.name
                    }}</span>
                </custom-router-link-component>
            </template>
            <template v-slot:item.price="{ item }">
                {{ formatMoney("PHP", item.total_price) }}
            </template>
            <template v-slot:item.shippingMethod="{ item }">
                {{ item.shipping_method.label }}
            </template>
            <template v-slot:item.datetime="{ item }">
                {{ formatRelativeTime(item.created_at) }}
            </template>
            <template v-slot:item.status="{ item }">
                <seller-dashboard-view-offer-status-chip-component
                    :status="item.status"
                ></seller-dashboard-view-offer-status-chip-component>
            </template>

            <template v-slot:item.action="{ item }">
                <v-btn icon @click="openOfferDialog(item)">
                    <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
            </template>
        </v-data-table>
        <seller-dashboard-view-date-range-picker-dialog-component
            :is-open.sync="isDateRangesDialogOpen"
            :custom-dates.sync="customDates"
            :cancel="cancelGetOffersByCustomDate"
            :proceed="setCustomDates"
            :disabled="hasCustomDates"
        ></seller-dashboard-view-date-range-picker-dialog-component>
        <seller-dashboard-view-offer-dialog-component
            :is-open.sync="isOfferDialogOpen"
            :product-preview="selectedOffer.product.images[0]"
            :product-name="selectedOffer.product.name"
            :product-created-at="selectedOffer.product.created_at"
            :product-condition="selectedOffer.product.condition"
            :product-stock="selectedOffer.product.stock"
            :product-price="selectedOffer.product.price"
            :product-category="selectedOffer.product.category"
            :product-shipping-methods="selectedOffer.product.shipping_methods"
            :offer-id="selectedOffer.id"
            :offer-total-price="selectedOffer.total_price"
            :offer-quantity="selectedOffer.quantity"
            :offer-status="selectedOffer.status"
            :offer-shipping-method="selectedOffer.shipping_method"
            :offer-created-at="selectedOffer.created_at"
            :offer-note="selectedOffer.note"
            :offers="offers"
            :offer-cancelled-by="selectedOffer.cancelled_by"
            :account-first-name="selectedOffer.account.profile.first_name"
            :account-image-url="selectedOffer.account.profile.image_url"
            :account-email="selectedOffer.account.email"
            v-if="selectedOffer"
        ></seller-dashboard-view-offer-dialog-component>
    </v-card>
</template>

<script>
import { GET_ACCOUNT_SHOPS } from "@/store/types/shop-store-type";
import commonUtility from "@/common/utility";
import CustomRouterLinkComponent from "@/components/custom/router-link-component";
import moment from "moment";
import SellerDashboardViewDateRangePickerDialogComponent from "@/components/views/seller-dashboard/date-picker-range-dialog-component";
import SellerDashboardViewOfferDialogComponent from "@/components/views/seller-dashboard/offer-dialog-component";
import { GET_SHOP_OFFERS } from "@/store/types/offer-store-type";
import SellerDashboardViewOfferStatusChipComponent from "@/components/views/seller-dashboard/offer-status-chip-component";

export default {
    components: {
        SellerDashboardViewOfferStatusChipComponent,
        SellerDashboardViewOfferDialogComponent,
        SellerDashboardViewDateRangePickerDialogComponent,
        CustomRouterLinkComponent,
    },

    mixins: [commonUtility],

    data() {
        return {
            shops: [],
            isGetShopsStart: false,
            pagination: {
                page: 1,
                perPage: 10,
                totalCount: null,
                rowsPerPageItems: [10, 25, 50],
            },
            customDates: [],
            dateFrom: null,
            dateTo: null,
            isDateRangesDialogOpen: false,
            lastDateRangeValue: "today",
            isOfferDialogOpen: false,
            isGetOffersStart: false,
            offers: [],
            selectedOffer: null,
        };
    },

    computed: {
        tableHeaders() {
            return [
                {
                    text: "Product",
                    sortable: false,
                    value: "product",
                },
                {
                    text: "Quantity",
                    sortable: false,
                    value: "quantity",
                },
                {
                    text: "Offer Price",
                    sortable: false,
                    value: "price",
                },
                {
                    text: "Shiping Method",
                    sortable: false,
                    value: "shippingMethod",
                },
                {
                    text: "Offered At",
                    sortable: false,
                    value: "datetime",
                },
                {
                    text: "Status",
                    sortable: false,
                    value: "status",
                },
                {
                    text: "Action",
                    value: "action",
                    sortable: false,
                    align: "right",
                },
            ];
        },

        user() {
            return this.$store.state.authentication.user;
        },

        selectedShopId() {
            const shopId = this.$route.query.shop_id;
            return parseInt(shopId) || null;
        },

        selectedShop() {
            if (!this.selectedShopId) return null;
            return this.shops.find((shop) => shop.id === this.selectedShopId);
        },

        datePresets() {
            return [
                {
                    label: "Today",
                    value: "today",
                },

                {
                    label: "Last 3 days",
                    value: "last-3-days",
                },

                {
                    label: "This Week",
                    value: "this-week",
                },

                {
                    label: "Custom",
                    value: "custom",
                },
            ];
        },

        selectedDatePresetValue() {
            return this.$route.query.date_preset || null;
        },

        selectedDatePreset() {
            if (!this.selectedDatePresetValue) return null;
            return this.datePresets.find(
                (range) => range.value === this.selectedDatePresetValue
            );
        },

        hasCustomDates() {
            return (
                this.selectedDatePresetValue === "custom" &&
                this.dateFrom &&
                this.dateTo
            );
        },
    },

    watch: {
        async "pagination.page"() {
            await this.getOffers();
        },

        async "pagination.perPage"() {
            await this.getOffers();
        },

        async selectedShopId(value) {
            if (value) await this.getOffers();
        },

        async selectedDatePresetValue(newValue, oldValue) {
            if (newValue === "custom") {
                this.lastDateRangeValue = oldValue;
                this.isDateRangesDialogOpen = true;
                return;
            }
            this.dateFrom = null;
            this.dateTo = null;
            this.customDates = [];
            if (newValue) await this.getOffers();
        },
    },

    methods: {
        async getShops() {
            const payload = {
                accountId: this.user.id,
                perPage: 999,
            };
            this.isGetShopsStart = true;
            const { data } = await this.$store.dispatch(
                GET_ACCOUNT_SHOPS,
                payload
            );
            this.isGetShopsStart = false;
            this.shops = data.shops;
            if (!this.selectedShop) {
                const shop = this.shops[0];
                await this.setRouteQueries(shop.id, "today");
            }
        },

        async setRouteQueries(shopId, dateRangeValue) {
            this.lastDateRangeValue = dateRangeValue;
            await this.$router.push({
                name: "seller-dashboard-offer",
                query: { shop_id: shopId, date_preset: dateRangeValue },
            });
        },

        extractDate() {
            let dateFrom = null;
            let dateTo = null;
            if (this.selectedDatePresetValue === "today") {
                dateFrom = this.currentDate;
                dateTo = this.currentDate;
            }
            if (this.selectedDatePresetValue === "last-3-days") {
                dateFrom = moment().subtract(3, "days").format("YYYY-MM-DD");
                dateTo = this.currentDate;
            }
            if (this.selectedDatePresetValue === "this-week") {
                dateFrom = moment().subtract(7, "days").format("YYYY-MM-DD");
                dateTo = this.currentDate;
            }
            if (this.selectedDatePresetValue === "custom") {
                dateFrom = this.dateFrom;
                dateTo = this.dateTo;
            }
            return {
                dateFrom,
                dateTo,
            };
        },

        async getOffers() {
            const { dateFrom, dateTo } = this.extractDate();
            if (this.isDateRangesDialogOpen)
                this.isDateRangesDialogOpen = false;
            this.isGetOffersStart = true;
            const payload = {
                shopId: this.selectedShopId,
                dateFrom,
                dateTo,
                page: this.pagination.page,
                perPage: this.pagination.perPage,
            };
            const { data } = await this.$store.dispatch(
                GET_SHOP_OFFERS,
                payload
            );
            this.offers = data.shop_offers;
            this.pagination.totalCount = parseInt(data.total_count) || 0;
            this.isGetOffersStart = false;
        },

        async setCustomDates() {
            if (this.customDates.length > 0) {
                this.dateFrom = this.customDates[0];
                this.dateTo = this.customDates[1];
                this.isDateRangesDialogOpen = false;
                await this.getOffers();
            }
        },

        async cancelGetOffersByCustomDate() {
            this.isDateRangesDialogOpen = false;
            this.customDates = [];
            if (!this.hasCustomDates) {
                await this.setRouteQueries(
                    this.selectedShopId,
                    this.lastDateRangeValue
                );
            }
        },

        openOfferDialog(offer) {
            this.selectedOffer = Object.assign({}, offer);
            this.isOfferDialogOpen = true;
        },
    },

    async created() {
        await this.getShops();
        if (this.selectedShopId && this.selectedDatePresetValue === "custom")
            return this.setRouteQueries(this.selectedShopId, "today");
        if (this.selectedShopId && this.selectedDatePresetValue)
            await this.getOffers();
    },
};
</script>
