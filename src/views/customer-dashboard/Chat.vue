<template>
    <v-card outlined height="700px">
        <v-card-title>Chats</v-card-title>
        <v-row no-gutters>
            <v-col cols="12" md="5">
                <div :style="{ height: '635px' }" class="rooms-border">
                    <div :style="{ height: '633px', overflow: 'auto' }">
                        <v-list dense rounded>
                            <v-list-item-group v-model="room" color="secondary">
                                <template v-for="n in 50">
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
                                                <span
                                                    title="Samsung Galaxy S10"
                                                >
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
                </div>
            </v-col>
            <v-col cols="12" md="7">
                <v-divider></v-divider>
                <v-list-item two-line>
                    <v-list-item-avatar>
                        <v-img
                            src="http://www.clker.com/cliparts/S/e/P/6/M/t/shop-front-icon.svg"
                        ></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="font-weight-bold"
                            >Expee</v-list-item-title
                        >
                    </v-list-item-content>
                    <v-list-item-action>
                        <v-btn color="primary" small depressed> Visit </v-btn>
                    </v-list-item-action>
                </v-list-item>
                <v-divider></v-divider>
                <v-card-text>
                    <div :style="{ height: '400px', overflow: 'auto' }">
                        <div class="d-flex">
                            <v-card
                                class="my-1"
                                color="#E4E6EB"
                                shaped
                                width="50%"
                                flat
                            >
                                <v-card-text class="black--text">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Adipisci, in.
                                </v-card-text>
                            </v-card>
                        </div>
                        <div class="d-flex">
                            <div class="flex-grow-1"></div>
                            <v-card
                                color="secondary lighten--5"
                                shaped
                                width="50%"
                                flat
                            >
                                <v-card-text class="white--text">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Adipisci, in.
                                </v-card-text>
                            </v-card>
                        </div>
                    </div>
                </v-card-text>
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
    border-top-width: thin !important;
    border-top-style: solid !important;
    border-top-color: rgba(0, 0, 0, 0.12) !important;
}
</style>
