<template>
    <v-app>
        <v-system-bar app color="secondary" dark :height="40">
            <v-container>
                <v-row justify="space-between" align="center">
                    <v-spacer></v-spacer>
                    <div>
                        <v-btn small text class="text-capitalize"
                            >Register</v-btn
                        >
                        <v-btn small text class="text-capitalize">Login</v-btn>
                    </div>
                </v-row>
            </v-container>
        </v-system-bar>
        <v-app-bar app flat color="white" class="custom-toolbar">
            <v-container>
                <v-row justify="space-between" align="center">
                    <v-spacer></v-spacer>
                    <v-text-field
                        hide-details
                        dense
                        single-line
                        label="Search for a Product"
                        outlined
                        filled
                        append-icon="mdi-magnify"
                    >
                    </v-text-field>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" depressed>
                        <v-icon>mdi-cart</v-icon>
                    </v-btn>
                </v-row>
            </v-container>
        </v-app-bar>
    </v-app>
</template>

<script>
export default {
    name: "customer-layout",
};
</script>

<style scoped>
.custom-toolbar {
    border-width: 0 0 thin !important;
    border-style: solid !important;
    border-color: rgba(0, 0, 0, 0.12) !important;
}
</style>
