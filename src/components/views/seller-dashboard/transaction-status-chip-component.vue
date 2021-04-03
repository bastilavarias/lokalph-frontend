<template>
    <v-chip small :color="color" class="text-capitalize">
        {{ message }}
    </v-chip>
</template>

<script>
export default {
    name: "seller-dashboard-view-transaction-status-chip-component",

    props: {
        isReceived: {
            type: Boolean,
            required: true,
        },

        isCancelled: {
            type: Boolean,
            required: true,
        },
    },

    computed: {
        color() {
            let color = null;
            if (this.isReceived) color = "success";
            if (this.isCancelled) color = "error";
            return color;
        },

        message() {
            let message = "To Receive";
            if (this.isReceived) message = "Received";
            if (this.isCancelled) message = "Cancelled";
            return message;
        },
    },
};
</script>
