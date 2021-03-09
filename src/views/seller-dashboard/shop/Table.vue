<template>
    <v-card outlined>
        <v-card-title>
            <span>Shop Management</span>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                depressed
                :to="{
                    name: 'seller-dashboard-shop-form',
                    params: { operation: 'create' },
                }"
            >
                <span class="text-capitalize mr-1">Create</span>
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-card-title>
        <v-data-table
            :headers="tableHeaders"
            :loading="isGetShopsStart"
            :items="shops"
            :server-items-length="pagination.totalCount"
            :items-per-page.sync="pagination.perPage"
            :page.sync="pagination.page"
            :footer-props="{
                'items-per-page-options': pagination.rowsPerPageItems,
            }"
        >
            <template v-slot:top>
                <v-card-text>
                    <v-text-field
                        filled
                        rounded
                        placeholder="Search"
                        append-icon="mdi-magnify"
                        autofocus
                        v-model="search"
                    ></v-text-field>
                </v-card-text>
            </template>
            <template v-slot:item.name="{ item }">
                <span class="font-weight-bold">{{ item.name }}</span>
            </template>
            <template v-slot:item.contactNumber="{ item }">
                {{ item.contact_number }}
            </template>
            <template v-slot:item.address="{ item }">
                {{ item.address.value }}
            </template>
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
import { GET_SHOP_ACCOUNT_SHOPS } from "@/store/types/shop-store-type";

export default {
    data() {
        return {
            shops: [],
            account: null,
            isGetAccountDetailsStart: false,
            isGetShopsStart: false,
            search: null,
            pagination: {
                page: 1,
                perPage: 10,
                totalCount: null,
                rowsPerPageItems: [10, 25, 50],
            },
        };
    },

    watch: {
        search() {
            let timer = 0;
            clearTimeout(timer);
            timer = setTimeout(
                async function () {
                    await this.getShops();
                }.bind(this),
                800
            );
        },

        async "pagination.page"() {
            await this.getShops();
        },

        async "pagination.perPage"(value) {
            console.log(value);
            await this.getShops();
        },
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
                page: this.pagination.page,
                perPage: this.pagination.perPage,
                search: this.search,
            };
            this.isGetShopsStart = true;
            const { data } = await this.$store.dispatch(
                GET_SHOP_ACCOUNT_SHOPS,
                payload
            );
            this.isGetShopsStart = false;
            this.shops = data.shops;
            if (!this.search) this.pagination.totalCount = data.total_count;
            if (this.search) this.pagination.totalCount = this.shops.length;
        },
    },

    async created() {
        await this.getAccountDetails();
        await this.getShops();
    },
};
</script>
