<template>
    <v-card outlined>
        <v-card-text>
            <v-row>
                <v-col cols="12" md="5">
                    <v-skeleton-loader type="image"></v-skeleton-loader>
                </v-col>
                <v-col cols="12" md="7">
                    <v-row dense>
                        <v-col cols="6">
                            <v-skeleton-loader
                                type="list-item"
                            ></v-skeleton-loader>
                            <v-skeleton-loader
                                type="list-item"
                            ></v-skeleton-loader>
                            <v-skeleton-loader
                                type="list-item"
                            ></v-skeleton-loader>
                        </v-col>
                        <v-col cols="6">
                            <v-skeleton-loader
                                type="list-item"
                            ></v-skeleton-loader>
                            <v-skeleton-loader
                                type="list-item"
                            ></v-skeleton-loader>
                            <v-skeleton-loader
                                type="list-item"
                            ></v-skeleton-loader>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12">
                    <v-skeleton-loader type="article"></v-skeleton-loader>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "shop-view-tabs-skeleton-loader",
};
</script>
