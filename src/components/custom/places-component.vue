<template>
    <vuetify-algolia-places
        v-model="placeLocal"
        language="en"
        :outlined="outlined"
        :label="label"
        append-icon="mdi-map-marker"
        debounce
        clearable
        @click:clear="placeLocal = null"
        autocomplete="new"
    ></vuetify-algolia-places>
</template>

<script>
export default {
    name: "custom-places-component",

    props: {
        outlined: {
            type: Boolean,
            required: false,
        },
        label: {
            type: String,
            required: false,
        },
        place: {
            required: true,
        },
    },

    data() {
        return {
            placeLocal: this.place,
        };
    },

    watch: {
        place(value) {
            this.placeLocal = value;
        },

        placeLocal(value) {
            this.$emit("update:place", value);
        },
    },
};
</script>
