<template>
    <v-chip small :color="color" class="text-capitalize">
        {{ message }}
    </v-chip>
</template>

<script>
export default {
    name: "global-transaction-status-chip-component",

    props: {
        status: {
            type: String,
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
    },
};
</script>
