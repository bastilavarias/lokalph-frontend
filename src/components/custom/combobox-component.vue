<template>
    <v-combobox
        v-model="select"
        :items="items"
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
    },

    data() {
        return {
            select: [],
            items: [],
        };
    },
};
</script>
