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
            :loading="isGetProductsStart"
            :items="products"
            :server-items-length="pagination.totalCount"
            :items-per-page.sync="pagination.perPage"
            :page.sync="pagination.page"
            :footer-props="{
                'items-per-page-options': pagination.rowsPerPageItems,
            }"
        >
            <template v-slot:item.name="{ item }">
                <custom-router-link-component
                    :to="{
                        name: 'product-post-view',
                        params: { shopId: item.shop.id, slug: item.slug },
                    }"
                >
                    <span class="black--text font-weight-bold">{{
                        item.name
                    }}</span>
                </custom-router-link-component>
            </template>
            <template v-slot:item.category="{ item }">
                {{ item.category.label }}
            </template>
            <template v-slot:item.price="{ item }">
                {{ formatMoney("PHP", item.price) }}
            </template>
            <template v-slot:item.shippingMethods="{ item }">
                <template v-for="(method, index) in item.shipping_methods">
                    <v-chip :key="index" small color="primary" class="ma-1">
                        {{ method.label }}
                    </v-chip>
                </template>
            </template>
            <template v-slot:item.action>
                <v-btn icon>
                    <v-icon>mdi-eye-outline</v-icon>
                </v-btn>
            </template>
        </v-data-table>
        <v-dialog v-model="isDateRangesDialogOpen" persistent width="290px">
            <v-date-picker
                v-model="selectedCustomDates"
                range
                :max="currentDate"
                :reactive="false"
            >
                <v-spacer></v-spacer>
                <v-btn
                    text
                    @click="cancelGetOffersByCustomDate"
                    class="text-capitalize"
                >
                    Cancel
                </v-btn>
                <v-btn
                    color="primary"
                    depressed
                    @click="setCustomDate"
                    class="text-capitalize"
                >
                    View Offers
                </v-btn>
            </v-date-picker>
        </v-dialog>
    </v-card>
</template>

<script>
import { GET_ACCOUNT_SHOPS } from "@/store/types/shop-store-type";
import commonUtility from "@/common/utility";
import CustomRouterLinkComponent from "@/components/custom/router-link-component";
import moment from "moment";

export default {
    components: {
        CustomRouterLinkComponent,
    },
    mixins: [commonUtility],

    data() {
        return {
            shops: [],
            isGetShopsStart: false,
            isGetProductsStart: false,
            products: [],
            pagination: {
                page: 1,
                perPage: 10,
                totalCount: null,
                rowsPerPageItems: [10, 25, 50],
            },
            selectedCustomDates: [],
            dateFrom: null,
            dateTo: null,
            isDateRangesDialogOpen: false,
            lastDateRangeValue: "today",
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
                    text: "Actions",
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
            this.selectedCustomDates = [];
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

        async setCustomDate() {
            if (this.selectedCustomDates.length > 0) {
                this.dateFrom = this.selectedCustomDates[0];
                this.dateTo = this.selectedCustomDates[1];
                this.isDateRangesDialogOpen = false;
                await this.getOffers();
            }
        },

        async cancelGetOffersByCustomDate() {
            this.isDateRangesDialogOpen = false;
            this.selectedCustomDates = [];
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
