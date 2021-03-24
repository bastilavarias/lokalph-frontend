<template>
    <v-card elevation="3">
        <v-list-item>
            <v-list-item-avatar>
                <v-img :src="user.profile.image_url"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title>{{
                    user.profile.first_name
                }}</v-list-item-title>
                <v-list-item-subtitle>
                    Asked {{ formatRelativeTime(user.created_at) }}
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </v-card>
</template>

<script>
import commonUtility from "@/common/utility";

export default {
    name: "product-post-view-inquiry-card-component",

    mixins: [commonUtility],

    computed: {
        user() {
            return this.$store.state.authentication.user;
        },
    },
};
</script>
