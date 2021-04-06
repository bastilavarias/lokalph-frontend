<template>
    <v-chip small :color="color" class="text-capitalize">
        {{ status }}
    </v-chip>
</template>

<script>
export default {
    name: "global-offer-status-chip-component",

    props: {
        status: {
            type: String,
            required: true,
        },
    },

    computed: {
        color() {
            const colors = {
                pending: null,
                received: "success",
                cancelled: "error",
            };
            return colors[this.status];
        },
    },
};
</script>
