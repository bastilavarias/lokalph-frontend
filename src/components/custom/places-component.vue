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
    },

    data() {
        return {
            placeLocal: null,
        };
    },

    watch: {
        placeLocal(value) {
            console.log(value);
        },
    },
};
</script>
