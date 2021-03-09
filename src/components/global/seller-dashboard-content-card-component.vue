<template>
    <v-card :outlined="outlined">
        <v-card-title>
            <span>
                <v-btn icon @click="$router.go(-1)" class="mr-1">
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <slot name="title"></slot>
            </span>
        </v-card-title>
        <slot></slot>
    </v-card>
</template>

<script>
export default {
    name: "seller-dashboard-form-card-component",

    props: {
        outlined: {
            type: Boolean,
            required: false,
        },
    },
};
</script>
