<template>
    <v-chip small color="primary">
        <v-icon small class="mr-1">mdi-star</v-icon>
        <span
            >{{ rating || 1 }}
            {{ rating && rating > 1 ? "Stars" : "Star" }}</span
        >
    </v-chip>
</template>

<script>
export default {
    name: "global-review-rating-chip-component",

    props: {
        rating: {
            type: Number,
            required: false,
        },
    },
};
</script>
