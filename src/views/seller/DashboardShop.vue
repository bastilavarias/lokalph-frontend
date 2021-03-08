<template>
    <v-card outlined>
        <v-card-title>
            <span>Shop Management</span>
            <v-spacer></v-spacer>
            <v-btn color="primary" depressed>
                <span class="text-capitalize mr-1">Create</span>
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-card-title>
        <v-data-table :headers="tableHeaders" :loading="isGetShopsStart">
            <template v-slot:item.actions>
                <v-btn icon class="mr-1">
                    <v-icon>mdi-pencil-outline</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
import { GET_ACCOUNT_DETAILS_BY_EMAIL } from "@/store/types/account-store-type";
import { GET_SHOP_ACCOUNTS } from "@/store/types/shop-store-type";

export default {
    data() {
        return {
            shops: [],
            account: null,
            isGetAccountDetailsStart: false,
            page: 1,
            perPage: 5,
            isGetShopsStart: false,
        };
    },

    computed: {
        tableHeaders() {
            return [
                {
                    text: "Name",
                    sortable: false,
                    value: "name",
                },
                {
                    text: "Contact Number",
                    sortable: false,
                    value: "contactNumber",
                },
                {
                    text: "Address",
                    sortable: false,
                    value: "address",
                },
                {
                    text: "Actions",
                    value: "actions",
                    sortable: false,
                    align: "right",
                },
            ];
        },

        user() {
            return this.$store.state.authentication.user;
        },
    },

    methods: {
        async getAccountDetails() {
            const email = this.user.email || null;
            if (!email) return this.$router.go(-1);
            this.isGetAccountDetailsStart = true;
            const { success, data, error } = await this.$store.dispatch(
                GET_ACCOUNT_DETAILS_BY_EMAIL,
                email
            );
            this.isGetAccountDetailsStart = false;
            if (error) return this.$router.go(-1);
            if (success) {
                this.account = Object.assign({}, data);
            }
        },

        async getShops() {
            const payload = {
                accountId: this.account.id,
                page: this.page,
                perPage: this.perPage,
            };
            this.isGetShopsStart = true;
            const { data } = await this.$store.dispatch(
                GET_SHOP_ACCOUNTS,
                payload
            );
            this.isGetShopsStart = false;
            console.log(data);
            this.shops = data;
        },
    },

    async created() {
        await this.getAccountDetails();
        await this.getShops();
    },
};
</script>
