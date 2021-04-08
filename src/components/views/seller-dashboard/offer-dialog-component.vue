<template>
    <v-dialog width="600" persistent v-model="isOpenLocal">
        <v-card>
            <v-card-title>
                <div>
                    <span class="mr-2">Offer</span>
                    <global-offer-status-chip-component
                        :status="offerStatusLocal"
                        :cancelled-by="offerCancelledByLocal"
                    ></global-offer-status-chip-component>
                </div>
                <v-spacer> </v-spacer>
                <v-btn icon @click="isOpenLocal = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-stepper v-model="stepper" class="elevation-0">
                <v-stepper-header class="elevation-0" v-if="isStatusPending">
                    <v-stepper-step :step="1"> Offer Details </v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :step="2"> Date & Time </v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :step="3"> Finish </v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                    <v-stepper-content :step="1" class="pa-0">
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-card-text class="pl-0">
                                        <v-img
                                            :src="productPreview.url"
                                            width="100%"
                                            height="auto"
                                            position="center"
                                        ></v-img>
                                    </v-card-text>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-list-item-content>
                                        <v-list-item-title
                                            class="headline font-weight-bold accent--text"
                                        >
                                            <span :title="productName">
                                                {{ productName }}
                                            </span>
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            <span
                                                :title="`Product Category: ${productCategory.label}`"
                                                >{{
                                                    productCategory.label
                                                }}</span
                                            >
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-row dense>
                                        <v-col cols="12">
                                            <div
                                                class="d-flex align-content-center align-center"
                                            >
                                                <v-icon class="mr-1"
                                                    >mdi-clock</v-icon
                                                >
                                                <span
                                                    class="subtitle-1"
                                                    :title="`Posted: ${formatRelativeTime(
                                                        productCreatedAt
                                                    )}`"
                                                >
                                                    {{
                                                        formatRelativeTime(
                                                            productCreatedAt
                                                        )
                                                    }}
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
                                                    :title="`This item is tagged as ${productCondition.label}`"
                                                    >{{
                                                        productCondition.label
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
                                                    {{ productStock }} stock
                                                    available
                                                </span>
                                            </div>
                                        </v-col>
                                        <v-col cols="12">
                                            <div
                                                class="d-flex align-content-center align-center"
                                            >
                                                <span
                                                    class="subtitle-1 mr-1 font-weight-bold secondary--text"
                                                    title="Price per unit"
                                                >
                                                    {{
                                                        formatMoney(
                                                            "PHP",
                                                            productPrice
                                                        )
                                                    }}
                                                </span>
                                                per unit
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-card-text>
                            <v-row dense>
                                <v-col cols="12">
                                    <v-card
                                        outlined
                                        rounded
                                        class="grey lighten-5"
                                    >
                                        <v-row dense>
                                            <v-col cols="12" md="6">
                                                <v-card-subtitle
                                                    class="font-weight-bold"
                                                    >Customer
                                                    Offer</v-card-subtitle
                                                >
                                                <v-card-text>
                                                    <v-row dense>
                                                        <v-col cols="12">
                                                            <div
                                                                class="d-flex align-content-center align-center"
                                                            >
                                                                <span
                                                                    class="subtitle-1 font-weight-bold secondary--text"
                                                                    title="Offer Price"
                                                                >
                                                                    {{
                                                                        formatMoney(
                                                                            "PHP",
                                                                            offerTotalPrice
                                                                        )
                                                                    }}
                                                                </span>
                                                            </div>
                                                        </v-col>
                                                        <v-col cols="12">
                                                            <div
                                                                class="d-flex align-content-center align-center"
                                                            >
                                                                <v-icon
                                                                    class="mr-1"
                                                                    >mdi-file-table-box-multiple</v-icon
                                                                >
                                                                <span
                                                                    class="subtitle-1"
                                                                    title="Quantity"
                                                                >
                                                                    <span
                                                                        class="font-weight-bold black--text"
                                                                    >
                                                                        {{
                                                                            offerQuantity
                                                                        }}
                                                                    </span>
                                                                    pcs
                                                                </span>
                                                            </div>
                                                        </v-col>
                                                        <v-col cols="12">
                                                            <div
                                                                class="d-flex align-content-center align-center"
                                                            >
                                                                <v-icon
                                                                    class="mr-1"
                                                                    >mdi-truck</v-icon
                                                                >
                                                                <span
                                                                    class="subtitle-1 black--text"
                                                                    title="Prefer Shipping Method"
                                                                >
                                                                    {{
                                                                        offerShippingMethod.label
                                                                    }}
                                                                </span>
                                                            </div>
                                                        </v-col>
                                                    </v-row>
                                                </v-card-text>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-card-subtitle
                                                    class="font-weight-bold"
                                                    >You Prefer</v-card-subtitle
                                                >
                                                <v-card-text>
                                                    <v-row dense>
                                                        <v-col cols="12">
                                                            <div
                                                                class="d-flex align-content-center align-center"
                                                            >
                                                                <span
                                                                    class="subtitle-1 secondary--text font-weight-bold"
                                                                    title="Prefer Total Price"
                                                                >
                                                                    {{
                                                                        formatMoney(
                                                                            "PHP",
                                                                            preferTotalPrice
                                                                        )
                                                                    }}
                                                                </span>
                                                            </div>
                                                        </v-col>
                                                        <v-col cols="12">
                                                            <div
                                                                class="d-flex align-content-center align-center"
                                                            >
                                                                <v-icon
                                                                    class="mr-1"
                                                                    >mdi-file-table-box-multiple</v-icon
                                                                >
                                                                <span
                                                                    class="subtitle-1"
                                                                    title="Quantity"
                                                                >
                                                                    <span
                                                                        class="font-weight-bold black--text"
                                                                    >
                                                                        {{
                                                                            offerQuantity
                                                                        }}
                                                                    </span>
                                                                    pcs
                                                                </span>
                                                            </div>
                                                        </v-col>
                                                        <v-col cols="12">
                                                            <div
                                                                class="d-flex align-content-center align-center"
                                                            >
                                                                <v-icon
                                                                    class="mr-1"
                                                                    >mdi-truck</v-icon
                                                                >
                                                                <span
                                                                    class="subtitle-1 black--text"
                                                                    title="Prefer Shipping Method"
                                                                >
                                                                    {{
                                                                        preferShippingMethods
                                                                    }}
                                                                </span>
                                                            </div>
                                                        </v-col>
                                                    </v-row>
                                                </v-card-text>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                </v-col>
                                <v-col cols="12">
                                    <v-list-item two-line>
                                        <v-list-item-avatar :size="50">
                                            <v-img
                                                :src="accountImageUrl"
                                            ></v-img>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title>{{
                                                accountFirstName
                                            }}</v-list-item-title>
                                            <v-list-item-subtitle>
                                                <span
                                                    :title="`Offer was created ${formatRelativeTime(
                                                        offerCreatedAt
                                                    )}`"
                                                >
                                                    Offered this
                                                    {{
                                                        formatRelativeTime(
                                                            offerCreatedAt
                                                        )
                                                    }}
                                                </span>
                                            </v-list-item-subtitle>
                                        </v-list-item-content>
                                        <v-list-item-action>
                                            <v-btn
                                                color="primary"
                                                depressed
                                                small
                                                class="text-capitalize"
                                                :to="{
                                                    name: 'profile-view',
                                                    params: {
                                                        email: accountEmail,
                                                    },
                                                }"
                                            >
                                                View Profile
                                            </v-btn>
                                        </v-list-item-action>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="12" v-if="offerNote">
                                    <v-card-subtitle
                                        >Customer's Note</v-card-subtitle
                                    >
                                    <v-card-text>
                                        <div class="mb-3">
                                            <template
                                                v-if="offerNote.length <= 74"
                                            >
                                                <div>{{ offerNote }}</div>
                                            </template>
                                            <template
                                                v-if="
                                                    offerNote.length >= 75 &&
                                                    !isOfferNoteExpanded
                                                "
                                            >
                                                <div
                                                    v-html="
                                                        truncateString(
                                                            offerNote,
                                                            75
                                                        )
                                                    "
                                                ></div>
                                            </template>
                                            <template
                                                v-if="
                                                    offerNote.length >= 75 &&
                                                    isOfferNoteExpanded
                                                "
                                            >
                                                <div>{{ offerNote }}</div>
                                            </template>
                                        </div>
                                        <span
                                            class="font-weight-bold secondary--text"
                                            :style="{ cursor: 'pointer' }"
                                            @click="
                                                isOfferNoteExpanded = !isOfferNoteExpanded
                                            "
                                            v-if="offerNote.length >= 75"
                                            >{{
                                                isOfferNoteExpanded
                                                    ? "Show less"
                                                    : "Read more"
                                            }}
                                            <v-icon color="secondary">{{
                                                isOfferNoteExpanded
                                                    ? "mdi-chevron-up"
                                                    : "mdi-chevron-down"
                                            }}</v-icon></span
                                        >
                                    </v-card-text>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="error"
                                depressed
                                :loading="isRejectOfferStart"
                                @click="rejectOffer"
                                v-if="isStatusPending"
                            >
                                <v-icon class="mr-1">mdi-cancel</v-icon>
                                <span class="text-capitalize">Reject</span>
                            </v-btn>
                            <v-btn
                                color="success"
                                depressed
                                class="text-capitalize"
                                :disabled="isRejectOfferStart"
                                v-if="isStatusPending"
                                @click="stepper = 2"
                            >
                                Continue
                            </v-btn>
                        </v-card-actions>
                    </v-stepper-content>
                    <v-stepper-content :step="2" class="pa-0">
                        <v-card-text>
                            <v-col cols="12">
                                <custom-date-picker-component
                                    :date.sync="form.date"
                                    :label="`${offerShippingMethod.label} Date`"
                                    outlined
                                ></custom-date-picker-component>
                            </v-col>
                            <v-col cols="12">
                                <custom-time-picker-component
                                    :time.sync="form.time"
                                    :label="`${offerShippingMethod.label} Time`"
                                    outlined
                                >
                                </custom-time-picker-component>
                            </v-col>
                            <v-col cols="12">
                                <custom-places-component
                                    :label="`${offerShippingMethod.label} Address`"
                                    outlined
                                    :place.sync="form.address"
                                ></custom-places-component>
                            </v-col>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                class="text-capitalize"
                                @click="stepper = 1"
                                >Back</v-btn
                            >
                            <v-btn
                                color="primary"
                                depressed
                                :disabled="!isFormValid"
                                :loading="isAcceptOfferStart"
                                @click="acceptOffer"
                                class="text-capitalize"
                            >
                                Accept Offer
                            </v-btn>
                        </v-card-actions>
                    </v-stepper-content>
                    <v-stepper-content :step="3">
                        <v-card-text>
                            <div class="text-center">
                                <v-icon :size="125" color="success">
                                    mdi-cash-check
                                </v-icon>
                                <h1 class="display-1 success--text">Success</h1>
                                <p class="body-1">
                                    Successfully accepted this offer.
                                </p>
                            </div>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                class="text-capitalize"
                                @click="exitOfferDialog"
                                >Exit</v-btn
                            >
                            <v-btn
                                color="primary"
                                depressed
                                class="text-capitalize"
                                :to="{
                                    name: 'seller-dashboard-transaction',
                                    queries: { shop_id: shopId },
                                }"
                                v-if="shopId"
                                >View Transaction</v-btn
                            >
                        </v-card-actions>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-card>
    </v-dialog>
</template>

<script>
import commonUtility from "@/common/utility";
import CustomStockInputComponent from "@/components/custom/stock-input-component";
import { ACCEPT_OFFER, CANCEL_OFFER } from "@/store/types/offer-store-type";
import CustomDatePickerComponent from "@/components/custom/date-picker-component";
import CustomTimePickerComponent from "@/components/custom/time-picker-component";
import CustomPlacesComponent from "@/components/custom/places-component";
import GlobalOfferStatusChipComponent from "@/components/global/offer-status-chip-component";

const defaultForm = {
    address: null,
    date: null,
    time: null,
};

export default {
    name: "seller-dashboard-view-offer-dialog-component",
    components: {
        GlobalOfferStatusChipComponent,
        CustomPlacesComponent,
        CustomTimePickerComponent,
        CustomDatePickerComponent,
        CustomStockInputComponent,
    },

    mixins: [commonUtility],

    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },

        productPreview: {
            type: Object,
            required: true,
        },

        productName: {
            type: String,
            required: true,
        },

        productCreatedAt: {
            type: String,
            required: true,
        },

        productCondition: {
            type: Object,
            required: true,
        },

        productStock: {
            type: Number,
            required: true,
        },

        productPrice: {
            required: true,
        },

        productCategory: {
            type: Object,
            required: true,
        },

        productShippingMethods: {
            type: Array,
            required: true,
        },

        offerId: {
            type: Number,
            required: true,
        },

        offerTotalPrice: {
            type: Number,
            required: true,
        },

        offerQuantity: {
            type: Number,
            required: true,
        },

        offerStatus: {
            type: String,
            required: true,
        },

        offerShippingMethod: {
            type: Object,
            required: true,
        },

        offerCreatedAt: {
            type: String,
            required: true,
        },

        offerNote: {
            type: String,
            required: false,
        },

        offers: {
            type: Array,
            required: true,
        },

        offerCancelledBy: {
            required: true,
        },

        accountFirstName: {
            type: String,
            required: false,
        },

        accountImageUrl: {
            type: String,
            required: false,
        },

        accountEmail: {
            type: String,
            required: false,
        },
    },

    data() {
        return {
            isOpenLocal: this.isOpen,
            isOfferNoteExpanded: false,
            isRejectOfferStart: false,
            offersLocal: this.offers,
            offerStatusLocal: this.offerStatus,
            offerCancelledByLocal: this.offerCancelledBy,
            stepper: 1,
            form: Object.assign({}, defaultForm),
            defaultForm,
            isAcceptOfferStart: false,
        };
    },

    computed: {
        preferTotalPrice() {
            return this.productPrice * this.offerQuantity;
        },

        preferShippingMethods() {
            const sm = this.productShippingMethods.map((sm) => sm.label);
            return sm.length === 1 ? sm[0] : "Meet Up or Pick Up";
        },

        isStatusPending() {
            return this.offerStatusLocal === "pending";
        },

        user() {
            return this.$store.state.authentication.user;
        },

        isFormValid() {
            const { date, time, address } = this.form;
            return date && time && address;
        },

        shopId() {
            return this.$route.query.shop_id || null;
        },
    },

    watch: {
        isOpen(value) {
            this.isOpenLocal = value;
        },

        isOpenLocal(value) {
            this.$emit("update:isOpen", value);
        },

        offers(value) {
            this.offersLocal = value;
        },

        offersLocal(value) {
            this.$emit("update:offers", value);
        },

        offerStatus(value) {
            this.offerStatusLocal = value;
        },

        offerCancelledBy(value) {
            this.offerCancelledByLocal = value;
        },
    },

    methods: {
        async rejectOffer() {
            this.isRejectOfferStart = true;
            const payload = {
                offerId: this.offerId,
                cancelledBy: "shop",
            };
            const { data } = await this.$store.dispatch(CANCEL_OFFER, payload);
            if (data) {
                this.offersLocal = this.offersLocal.map((offer) => {
                    if (offer.id === data.id) {
                        this.offerStatusLocal = data.status;
                        offer.status = data.status;
                        this.offerCancelledByLocal = data.cancelled_by;
                        offer.cancelled_by = data.cancelled_by;
                    }
                    return offer;
                });
                this.isRejectOfferStart = false;

                return;
            }
            this.isRejectOfferStart = false;
        },

        async acceptOffer() {
            this.isAcceptOfferStart = true;
            const payload = {
                offerId: this.offerId,
                date: this.form.date || null,
                time: this.form.time || null,
                address: this.form.address || null,
            };
            const { data } = await this.$store.dispatch(ACCEPT_OFFER, payload);
            if (data) {
                this.offersLocal = this.offersLocal.map((offer) => {
                    if (offer.id === data.offer.id) {
                        this.offerStatusLocal = data.offer.status;
                        offer.status = data.offer.status;
                    }
                    return offer;
                });
                this.stepper = 3;
                this.isAcceptOfferStart = false;
            }
            this.isAcceptOfferStart = false;
        },

        exitOfferDialog() {
            this.stepper = 1;
            this.form = Object.assign({}, this.defaultForm);
            this.isOpenLocal = false;
        },
    },
};
</script>
