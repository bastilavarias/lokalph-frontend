<template>
    <v-row dense>
        <v-col cols="12" md="7">
            <v-row dense>
                <v-col cols="12">
                    <v-skeleton-loader type="image"></v-skeleton-loader>
                </v-col>
                <v-col cols="12"></v-col>
                <template v-for="n in 3">
                    <v-col cols="12" md="4" :key="n">
                        <v-skeleton-loader type="image"></v-skeleton-loader>
                    </v-col>
                </template>
            </v-row>
        </v-col>
        <v-col cols="12" md="5">
            <v-col cols="12">
                <v-skeleton-loader
                    type="list-item-two-line"
                ></v-skeleton-loader>
            </v-col>
            <v-col cols="12">
                <v-skeleton-loader
                    type="list-item-avatar-two-line"
                ></v-skeleton-loader>
            </v-col>
            <template v-for="n in 8">
                <v-skeleton-loader
                    type="list-item"
                    :key="n"
                ></v-skeleton-loader>
            </template>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "product-post-view-skeleton-loaders-component",
};
</script>
