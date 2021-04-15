<template>
    <v-row dense>
        <v-col cols="12" md="9">
            <v-row dense>
                <v-col cols="12">
                    <v-card outlined>
                        <v-card-title>Top Selling</v-card-title>
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <v-card outlined>
                        <v-card-title>Reviews</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="primary"
                                class="text-capitalize"
                                depressed
                                >See More</v-btn
                            >
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12" md="3">
            <v-row dense>
                <v-col cols="12">
                    <v-card flat>
                        <v-card-subtitle>From the same Shop</v-card-subtitle>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
