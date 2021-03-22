<template>
    <v-card outlined>
        <v-card-title>
            <span>Products</span>
            <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text>
            <v-row dense>
                <template v-for="n in 4">
                    <v-col cols="12" md="4" :key="n">
                        <global-product-mini-preview-component></global-product-mini-preview-component>
                    </v-col>
                </template>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script>
import GlobalProductMiniPreviewComponent from "@/components/global/product-mini-preview-component";
export default {
    components: { GlobalProductMiniPreviewComponent },
};
</script>
