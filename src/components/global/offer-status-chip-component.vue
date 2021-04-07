<template>
    <span :title="spanTitle">
        <v-chip small :color="color" class="text-capitalize">
            {{ status }}
        </v-chip>
    </span>
</template>

<script>
export default {
    name: "global-offer-status-chip-component",

    props: {
        status: {
            type: String,
            required: true,
        },

        cancelledBy: {
            required: true,
        },
    },
    computed: {
        color() {
            const colors = {
                pending: null,
                accepted: "success",
                cancelled: "error",
            };
            return colors[this.status];
        },

        spanTitle() {
            let title = "This offer is waiting for your approval";
            if (this.status === "accepted") title = "You accepted this offer";
            if (this.status === "cancelled")
                title = `${
                    this.cancelledBy === "shop" ? "You" : "Customer"
                } cancelled this offer`;
            return title;
        },
    },
};
</script>
