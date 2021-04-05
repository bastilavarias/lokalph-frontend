<template>
    <v-row dense>
        <v-col cols="12" md="4">
            <v-list>
                <v-list-item>
                    <v-list-item-avatar>
                        <v-img :src="user.profile.image_url"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>
                            <span
                                :title="`${user.profile.first_name} ${user.profile.last_name}`"
                            >
                                {{ user.profile.first_name }}
                                {{ user.profile.last_name }}
                            </span>
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            Edit your Profile
                        </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                        <v-btn icon>
                            <v-icon>mdi-pencil-outline</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-list>
        </v-col>
        <v-col cols="12" md="8">
            <router-view></router-view>
        </v-col>
    </v-row>
</template>

<script>
export default {
    computed: {
        user() {
            return this.$store.state.authentication.user;
        },
    },
};
</script>
