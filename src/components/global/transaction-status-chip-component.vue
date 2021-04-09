<template>
    <span :title="spanTitle">
        <v-chip small :color="color" class="text-capitalize">
            {{ message }}
        </v-chip>
    </span>
</template>

<script>
export default {
    name: "global-transaction-status-chip-component",

    props: {
        status: {
            type: String,
            required: true,
        },

        cancelledBy: {
            required: true,
        },

        isShop: {
            type: Boolean,
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

        message() {
            let message = this.status;
            if (this.isShop && this.status === "pending") message = "Pending";
            if (!this.isShop && this.status === "pending")
                message = "To Receive";
            return message;
        },

        spanTitle() {
            let title = "This transaction is waiting to be receive";
            if (this.status === "received")
                title = "Transaction is already received";
            if (this.status === "cancelled")
                title = `${
                    this.cancelledBy === "shop" ? "You" : "Customer"
                } cancelled this transaction`;
            return title;
        },
    },
};
</script>
