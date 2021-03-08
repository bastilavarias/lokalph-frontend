<template>
    <v-card outlined>
        <v-card-title>Overview</v-card-title>
        <v-card-text>
            <v-row dense>
                <v-col cols="12" md="6">
                    <v-card outlined height="300" class="overflow-auto">
                        <v-card-subtitle>Product Stocks</v-card-subtitle>
                        <template v-for="n in 20">
                            <v-list-item :key="n" two-line>
                                <v-list-item-content>
                                    <v-list-item-subtitle class="subtitle-2"
                                        >Product Name</v-list-item-subtitle
                                    >
                                    <v-list-item-subtitle class="subtitle-2"
                                        >Current Stocks:
                                        <span class="font-weight-bold">
                                            {{ n }}
                                        </span></v-list-item-subtitle
                                    >
                                </v-list-item-content>
                                <v-list-item-icon v-if="n <= 9">
                                    <v-icon color="error">
                                        mdi-arrow-down-bold
                                    </v-icon>
                                </v-list-item-icon>
                            </v-list-item>
                            <v-divider v-if="n !== 20"></v-divider>
                        </template>
                    </v-card>
                </v-col>
                <v-col cols="12" md="6">
                    <v-row dense>
                        <v-col cols="12">
                            <v-card outlined height="146">
                                <v-card-subtitle>Reviews</v-card-subtitle>
                            </v-card>
                        </v-col>

                        <v-col cols="12">
                            <v-card outlined height="146">
                                <v-card-subtitle>Inquiries</v-card-subtitle>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12">
                    <v-card outlined height="300">
                        <v-card-subtitle>Recent Orders</v-card-subtitle>
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <v-card outlined height="300">
                        <v-card-subtitle>Business Insights</v-card-subtitle>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
