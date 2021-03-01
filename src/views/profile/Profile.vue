<template>
    <section>
        <v-row dense>
            <v-col cols="12">
                <v-card outlined flat min-height="150">
                    <v-img
                        src="https://mweb-cdn.karousell.com/build/profile-bg-aad22dfdb89aedb82568258e36764416.jpg"
                        height="150"
                        :style="{ position: 'relative' }"
                    >
                        <v-avatar :size="100" class="floating-avatar">
                            <v-img :src="user.profile.image_url"></v-img>
                        </v-avatar>
                    </v-img>
                    <v-card-text>
                        <div class="d-flex justify-space-between align-start">
                            <div>
                                <span
                                    class="text-capitalize title black--text d-block"
                                    >{{ user.profile.first_name }}
                                    {{ user.profile.last_name }}</span
                                >
                                <span class="subtitle-2">{{ user.email }}</span>
                            </div>
                            <v-spacer></v-spacer>
                            <v-btn
                                outlined
                                color="secondary"
                                class="text-capitalize"
                                >Edit Profile</v-btn
                            >
                        </div>
                    </v-card-text>
                    <v-tabs fixed-tabs>
                        <template v-for="(tab, index) in tabs">
                            <v-tab :key="index" :to="tab.to" exact>
                                <v-icon color="primary" class="mr-2">{{
                                    tab.icon
                                }}</v-icon>
                                <span class="text-capitalize">
                                    {{ tab.text }}
                                </span>
                            </v-tab>
                        </template>
                    </v-tabs>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-tabs-items>
                    <router-view></router-view>
                </v-tabs-items>
            </v-col>
        </v-row>
    </section>
</template>

<script>
export default {
    computed: {
        user() {
            return this.$store.state.authentication.user;
        },

        tabs() {
            return [
                {
                    text: "Shop",
                    icon: "mdi-storefront-outline",
                    to: { name: "profile-view" },
                },

                {
                    text: "Product",
                    icon: "mdi-cart-outline",
                    to: { name: "profile-product-view" },
                },

                {
                    text: "Review",
                    icon: "mdi-comment-quote-outline",
                    to: { name: "profile-review-view" },
                },
            ];
        },
    },
};
</script>

<style scoped>
.floating-avatar {
    bottom: -50%;
    left: 3%;
    transform: translateY(-50%);
}
</style>
