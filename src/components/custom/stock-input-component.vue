<template>
    <div class="d-flex justify-space-between">
        <v-btn
            x-large
            color="primary"
            depressed
            tile
            height="56"
            @click="stockLocal--"
        >
            <v-icon>mdi-minus</v-icon>
        </v-btn>
        <v-text-field
            :label="label"
            outlined
            :style="{ borderRadius: '0' }"
            class="centered-input"
            type="number"
            v-model="stockLocal"
        ></v-text-field>
        <v-btn
            x-large
            color="primary"
            depressed
            tile
            height="56"
            @click="stockLocal++"
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </div>
</template>

<script>
export default {
    name: "custom-stock-input-component",

    props: {
        stock: {
            required: true,
        },

        label: {
            required: false,
            type: String,
        },
    },

    data() {
        return {
            stockLocal: this.stock,
        };
    },

    watch: {
        stock(value) {
            this.stockLocal = value;
        },

        stockLocal(value) {
            try {
                const stock = parseFloat(value);
                if (stock < 1) {
                    this.stockLocal = 1;
                }
                this.$emit("update:stock", this.stockLocal);
            } catch (_) {
                this.stockLocal = 1;
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
