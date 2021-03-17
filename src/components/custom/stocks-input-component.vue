<template>
    <div class="d-flex justify-space-between">
        <v-btn
            x-large
            color="primary"
            depressed
            tile
            height="56"
            @click="stocksLocal--"
        >
            <v-icon>mdi-minus</v-icon>
        </v-btn>
        <v-text-field
            label="Stocks"
            outlined
            :style="{ borderRadius: '0' }"
            class="centered-input"
            type="number"
            v-model="stocksLocal"
        ></v-text-field>
        <v-btn
            x-large
            color="primary"
            depressed
            tile
            height="56"
            @click="stocksLocal++"
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </div>
</template>

<script>
export default {
    name: "custom-stocks-input-component",

    data() {
        return {
            stocksLocal: 1,
        };
    },

    watch: {
        stocksLocal(value) {
            if (typeof value === "string") {
                this.stocksLocal = 1;
            }
            if (value < 1) {
                this.stocksLocal = 1;
            }
        },
    },
};
</script>

<style scoped>
.centered-input >>> input {
    text-align: center;
    font-weight: bold;
    font-size: 1.6rem;
}
</style>
