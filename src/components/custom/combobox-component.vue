<template>
    <v-combobox
        v-model="itemsLocal"
        :label="label"
        multiple
        :outlined="outlined"
        small-chips
        :hint="hint"
        :persistent-hint="persistentHint"
        :disabled="disabled"
    ></v-combobox>
</template>

<script>
export default {
    name: "custom-combobox-component",

    props: {
        label: {
            type: String,
            required: false,
        },

        outlined: {
            type: Boolean,
            required: false,
        },

        persistentHint: {
            type: Boolean,
            required: false,
        },

        hint: {
            type: String,
            required: false,
        },

        disabled: {
            type: Boolean,
            required: false,
        },

        items: {
            required: true,
        },

        limit: {
            type: Number,
            required: false,
        },
    },

    data() {
        return {
            select: [],
            itemsLocal: this.items,
        };
    },

    watch: {
        items(value) {
            this.itemsLocal = value;
        },

        itemsLocal(value) {
            this.$emit("update:items", value);
        },
    },
};
</script>
