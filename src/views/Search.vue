<template>
    <section>
        <v-row dense>
            <v-col cols="12">
                <v-card flat>
                    <v-card-subtitle
                        >Shops related to "<span
                            class="primary--text font-weight-bold"
                            >Query</span
                        >"</v-card-subtitle
                    >
                    <v-card-text>
                        <v-row dense>
                            <template v-for="n in 3">
                                <v-col cols="12" :key="n">
                                    <global-shop-search-preview-component></global-shop-search-preview-component>
                                </v-col>
                            </template>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" class="text-capitalize" depressed
                            >See More</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </section>
</template>
<script>
import GlobalShopSearchPreviewComponent from "@/components/global/shop-search-preview-component";
export default {
    components: { GlobalShopSearchPreviewComponent },
};
</script>
