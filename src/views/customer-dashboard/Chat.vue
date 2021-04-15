<template>
    <v-card outlined height="500px">
        <v-card-title>Chats</v-card-title>
        <v-row dense>
            <v-col cols="12" md="5">
                <div
                    :style="{ height: '400px', overflow: 'auto' }"
                    class="rooms-border"
                >
                    <v-list dense rounded>
                        <v-subheader>Rooms</v-subheader>
                        <v-list-item-group v-model="room" color="secondary">
                            <template v-for="n in 3">
                                <v-list-item
                                    :key="n"
                                    two-line
                                    active-class="black--text"
                                >
                                    <v-list-item-avatar :size="35" tile>
                                        <v-img
                                            src="https://res.cloudinary.com/deqllunb9/image/upload/v1618281994/lokal-ph-development/products/5f903103e5300231c292e547a17c4918_ht2bux.jpg"
                                        ></v-img>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            <span title="Samsung Galaxy S10">
                                                Samsung Galaxy S10
                                            </span>
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            <span title="30 minutes ago">
                                                30 minutes ago
                                            </span>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </template>
                        </v-list-item-group>
                    </v-list>
                </div>
            </v-col>
            <v-col cols="12" md="7">
                <h1>Conversations</h1>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            room: null,
        };
    },
};
</script>

<style scoped>
.rooms-border {
    border-right-width: thin !important;
    border-right-style: solid !important;
    border-right-color: rgba(0, 0, 0, 0.12) !important;
}
</style>
