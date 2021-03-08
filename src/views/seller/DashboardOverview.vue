<template>
    <v-card outlined>
        <v-card-title>
            <span>Overview</span>
            <v-spacer> </v-spacer>
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        text
                        v-bind="attrs"
                        v-on="on"
                        class="text-capitalize"
                    >
                        <span class="text-capitalize mr-1 font-weight-bold"
                            >Shop 1</span
                        >
                        <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <template v-for="n in 5">
                        <v-list-item :key="n">Shop {{ n }}</v-list-item>
                    </template>
                </v-list>
            </v-menu>
        </v-card-title>
        <v-card-text>
            <v-row dense>
                <v-col cols="12" md="6">
                    <v-card outlined height="300" class="overflow-auto">
                        <v-card-subtitle
                            class="d-flex justify-space-between align-center"
                        >
                            <span>
                                Product Stocks (<span class="font-weight-bold"
                                    >20</span
                                >)
                            </span>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="primary"
                                small
                                depressed
                                class="text-capitalize"
                                >View All</v-btn
                            >
                        </v-card-subtitle>

                        <template v-for="n in 20">
                            <v-list-item :key="n" two-line>
                                <v-list-item-content>
                                    <v-list-item-subtitle class="subtitle-2"
                                        >Product {{ n }}</v-list-item-subtitle
                                    >
                                    <v-list-item-subtitle>
                                        Current Stocks:
                                        <span class="font-weight-bold">
                                            {{ n }} ·
                                            <v-btn
                                                text
                                                x-small
                                                class="text-capitalize"
                                                color="primary"
                                                >Manage</v-btn
                                            >
                                        </span></v-list-item-subtitle
                                    >
                                </v-list-item-content>
                                <v-list-item-action v-if="n <= 9">
                                    <v-icon color="error">
                                        mdi-arrow-down-bold
                                    </v-icon>
                                </v-list-item-action>
                            </v-list-item>
                            <v-divider v-if="n !== 20"></v-divider>
                        </template>
                    </v-card>
                </v-col>
                <v-col cols="12" md="6">
                    <v-row dense>
                        <v-col cols="12">
                            <v-card outlined height="146" class="overflow-auto">
                                <v-card-subtitle
                                    class="d-flex justify-space-between align-center"
                                >
                                    <span>
                                        Reviews (<span class="font-weight-bold"
                                            >20</span
                                        >)
                                    </span>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="primary"
                                        small
                                        depressed
                                        class="text-capitalize"
                                        >View All</v-btn
                                    >
                                </v-card-subtitle>

                                <template v-for="n in 20">
                                    <v-list-item :key="n" two-line>
                                        <v-list-item-content>
                                            <v-list-item-subtitle
                                                class="subtitle-2"
                                            >
                                                Product {{ n }} review by John
                                                Doe.
                                            </v-list-item-subtitle>
                                            <v-list-item-subtitle
                                                >Reviewed a day ago ·
                                                <v-btn
                                                    text
                                                    x-small
                                                    class="text-capitalize"
                                                    color="primary"
                                                    >View</v-btn
                                                ></v-list-item-subtitle
                                            >
                                        </v-list-item-content>
                                        <v-list-item-action>
                                            <global-review-rating-chip-component></global-review-rating-chip-component>
                                        </v-list-item-action>
                                    </v-list-item>
                                    <v-divider v-if="n !== 20"></v-divider>
                                </template>
                            </v-card>
                        </v-col>

                        <v-col cols="12">
                            <v-card outlined height="146" class="overflow-auto">
                                <v-card-subtitle
                                    class="d-flex justify-space-between align-center"
                                >
                                    <span>
                                        Inquiries (<span
                                            class="font-weight-bold"
                                            >20</span
                                        >)
                                    </span>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="primary"
                                        small
                                        depressed
                                        class="text-capitalize"
                                        >View All</v-btn
                                    >
                                </v-card-subtitle>

                                <template v-for="n in 20">
                                    <v-list-item :key="n" two-line>
                                        <v-list-item-content>
                                            <v-list-item-subtitle
                                                class="subtitle-2"
                                            >
                                                Product {{ n }} inquiry by John
                                                Doe.
                                            </v-list-item-subtitle>
                                            <v-list-item-subtitle
                                                >Asked a day ago ·
                                                <v-btn
                                                    text
                                                    x-small
                                                    class="text-capitalize"
                                                    color="primary"
                                                    >View</v-btn
                                                >
                                            </v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-divider v-if="n !== 20"></v-divider>
                                </template>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12">
                    <v-card outlined height="300">
                        <v-card-subtitle
                            class="d-flex justify-space-between align-center"
                        >
                            <span> Recent Orders </span>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="primary"
                                small
                                depressed
                                class="text-capitalize"
                                >View All</v-btn
                            >
                        </v-card-subtitle>
                        <v-data-table
                            :headers="recentOrdersTableHeaders"
                            height="175"
                        ></v-data-table>
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <v-card outlined height="300">
                        <v-card-subtitle>Business Graph</v-card-subtitle>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script>
import GlobalReviewRatingChipComponent from "@/components/global/review-rating-chip-component";
export default {
    components: { GlobalReviewRatingChipComponent },

    computed: {
        recentOrdersTableHeaders() {
            return [
                {
                    text: "Product",
                },
                {
                    text: "Quantity",
                },
                {
                    text: "Customer",
                },
                {
                    text: "Payment Method",
                },
                {
                    text: "Ordered At",
                },
                {
                    text: "Status",
                },
            ];
        },
    },
};
</script>
