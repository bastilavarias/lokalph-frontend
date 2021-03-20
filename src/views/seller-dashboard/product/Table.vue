<template>
    <v-card outlined>
        <v-card-title>
            <span>Product Management</span>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                depressed
                :to="{
                    name: 'seller-dashboard-product-form',
                    params: {
                        operation: 'create',
                        params: { operation: 'create' },
                    },
                }"
            >
                <span class="text-capitalize mr-1">Create</span>
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-card-title>
        <v-data-table></v-data-table>
    </v-card>
</template>
