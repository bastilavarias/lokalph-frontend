<template>
    <v-dialog width="600" persistent v-model="isOpenLocal">
        <v-card>
            <v-card-title>
                <div>
                    <span class="mr-2">Offer</span>
                    <span title="You accepted this offer 3 days ago">
                        <v-chip small color="success">Accepted</v-chip>
                    </span>
                </div>
                <v-spacer> </v-spacer>
                <v-btn icon @click="isOpenLocal = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-card-text class="pl-0">
                            <v-img
                                :src="preview.url"
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
                                <span :title="name">
                                    {{ name }}
                                </span>
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                <span
                                    :title="`Product Category: ${category.label}`"
                                    >{{ category.label }}</span
                                >
                            </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-row dense>
                            <v-col cols="12">
                                <div
                                    class="d-flex align-content-center align-center"
                                >
                                    <v-icon class="mr-1">mdi-clock</v-icon>
                                    <span
                                        class="subtitle-1"
                                        :title="`Posted: ${formatRelativeTime(
                                            createdAt
                                        )}`"
                                    >
                                        {{ formatRelativeTime(createdAt) }}
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
                                        :title="`This item is tagged as ${condition.label}`"
                                        >{{ condition.label }}</span
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
                                        {{ stock }} stock available
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
                                        {{ formatMoney("PHP", price) }}
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
                    <v-col cols="12" md="6">
                        <v-card-subtitle>Customer Offer</v-card-subtitle>
                        <v-card-text>
                            <v-row dense>
                                <v-col cols="12">
                                    <div
                                        class="d-flex align-content-center align-center"
                                    >
                                        <span
                                            class="subtitle-1"
                                            title="Offer Price"
                                        >
                                            <span
                                                class="font-weight-bold secondary--text"
                                            >
                                                {{ formatMoney("PHP", 6000) }}
                                            </span>
                                        </span>
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
                                            title="Quantity"
                                        >
                                            <span
                                                class="font-weight-bold black--text"
                                            >
                                                3
                                            </span>
                                            pcs
                                        </span>
                                    </div>
                                </v-col>
                                <v-col cols="12">
                                    <div
                                        class="d-flex align-content-center align-center"
                                    >
                                        <v-icon class="mr-1">mdi-truck</v-icon>
                                        <span
                                            class="subtitle-1"
                                            title="Prefer Shipping Method"
                                        >
                                            <span
                                                class="font-weight-bold black--text"
                                            >
                                                Meet Up
                                            </span>
                                        </span>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-card-subtitle>You Prefer</v-card-subtitle>
                        <v-card-text>
                            <v-row dense>
                                <v-col cols="12">
                                    <div
                                        class="d-flex align-content-center align-center"
                                    >
                                        <span
                                            class="subtitle-1"
                                            title="Offer Price"
                                        >
                                            <span
                                                class="font-weight-bold secondary--text"
                                            >
                                                {{ formatMoney("PHP", 6000) }}
                                            </span>
                                        </span>
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
                                            title="Quantity"
                                        >
                                            <span
                                                class="font-weight-bold black--text"
                                            >
                                                3
                                            </span>
                                            pcs
                                        </span>
                                    </div>
                                </v-col>
                                <v-col cols="12">
                                    <div
                                        class="d-flex align-content-center align-center"
                                    >
                                        <v-icon class="mr-1">mdi-truck</v-icon>
                                        <span
                                            class="subtitle-1"
                                            title="Prefer Shipping Method"
                                        >
                                            <span
                                                class="font-weight-bold black--text"
                                            >
                                                Meet Up or Pick Up
                                            </span>
                                        </span>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-col>
                    <v-col cols="12">
                        <v-list-item two-line>
                            <v-list-item-avatar :size="50">
                                <v-img
                                    src="https://i.pinimg.com/originals/8d/ec/f9/8decf9caed777b8d0d698e01270ce308.png"
                                ></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>Sebastian</v-list-item-title>
                                <v-list-item-subtitle>
                                    <span
                                        title="Account was created 3 days ago"
                                    >
                                        Created 3 days ago
                                    </span>
                                </v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn
                                    color="primary"
                                    depressed
                                    small
                                    class="text-capitalize"
                                >
                                    Chat Customer
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-col>
                    <v-col cols="12">
                        <v-card-subtitle>Customer's Note</v-card-subtitle>
                        <v-card-text>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Accusamus adipisci dolores est porro sequi
                            voluptates! Culpa deserunt iure quasi voluptatum.
                        </v-card-text>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" depressed>
                    <v-icon class="mr-1">mdi-cancel</v-icon>
                    <span class="text-capitalize">Cancel</span>
                </v-btn>
                <v-btn color="success" depressed class="text-capitalize">
                    Accept Offer
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import commonUtility from "@/common/utility";
import CustomStockInputComponent from "@/components/custom/stock-input-component";

export default {
    name: "product-post-view-offer-dialog-component",
    components: { CustomStockInputComponent },
    mixins: [commonUtility],

    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },

        preview: {
            type: Object,
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        createdAt: {
            type: String,
            required: true,
        },

        condition: {
            type: Object,
            required: true,
        },

        stock: {
            type: Number,
            required: true,
        },

        price: {
            required: true,
        },

        category: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            isOpenLocal: this.isOpen,
        };
    },

    watch: {
        isOpen(value) {
            this.isOpenLocal = value;
        },

        isOpenLocal(value) {
            this.$emit("update:isOpen", value);
        },
    },
};
</script>
