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
        <v-data-table :headers="tableHeaders" :items="sampleItems">
            <template v-slot:item.status="{ item }">
                <v-chip color="success" label small>Accepted</v-chip>
            </template>
            <template v-slot:item.action="{ item }">
                <v-btn icon @click="isOfferDialogOpen = true">
                    <v-icon>mdi-eye-outline</v-icon>
                </v-btn>
            </template>
        </v-data-table>
        <seller-dashboard-view-date-range-picker-dialog-component
            :is-open.sync="isDateRangesDialogOpen"
            :custom-dates.sync="customDates"
            :max="currentDate"
            :cancel="cancelGetOffersByCustomDate"
            :proceed="setCustomDates"
        ></seller-dashboard-view-date-range-picker-dialog-component>
        <seller-dashboard-view-offer-dialog-component
            :is-open.sync="isOfferDialogOpen"
            :preview="{
                url:
                    'https://res.cloudinary.com/deqllunb9/image/upload/v1616231198/lokal-ph-development/products/d4b4ea816fd1796c1985cf2566300dd1_nfltf6.jpg',
            }"
            name="Awei A70BL"
            created-at="2021-03-20T09:06:37.949Z"
            :condition="{ label: 'Brand New' }"
            :stock="10"
            :price="1500"
            :category="{ label: 'Electronics' }"
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

export default {
    components: {
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
            sampleItems: [
                {
                    product: "Product Name",
                    quantity: 5,
                    price: 50000,
                    shippingMethods: "test",
                },
            ],
            isOfferDialogOpen: false,
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
                    text: "Shipping Methods",
                    sortable: false,
                    value: "shippingMethods",
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

        currentDate() {
            return moment().format("YYYY-MM-DD");
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
