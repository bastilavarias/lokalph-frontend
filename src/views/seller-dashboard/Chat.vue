<template>
    <v-card outlined height="700px">
        <v-card-title>
            <div class="d-flex align-center">
                <span class="mr-1">Chats</span>
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            text
                            v-bind="attrs"
                            v-on="on"
                            :loading="!selectedShopId || isGetShopsStart"
                            small
                        >
                            <span
                                class="mr-1 font-weight-bold"
                                v-if="selectedShop"
                                >{{ selectedShop.name }}</span
                            >
                            <v-badge
                                color="primary"
                                dot
                                v-if="!selectedShop"
                                class="mr-2 text-capitalize font-italic"
                            >
                                Select Shop
                            </v-badge>
                            <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <template v-for="(shop, index) in shops">
                            <v-list-item
                                :key="index"
                                @click="setRouteQueries(shop.id)"
                                :disabled="selectedShopId === shop.id"
                                >{{ shop.name }}</v-list-item
                            >
                        </template>
                    </v-list>
                </v-menu>
            </div>
            <v-spacer></v-spacer>
        </v-card-title>

        <v-row no-gutters>
            <v-col cols="12" md="5">
                <div :style="{ height: '635px' }" class="rooms-border">
                    <div :style="{ height: '633px', overflow: 'auto' }">
                        <v-list dense rounded>
                            <v-list-item-group v-model="room" color="secondary">
                                <template
                                    v-for="(chatRoom, index) in chatRooms"
                                >
                                    <global-chat-room-list-item
                                        :key="index"
                                        :first-name="
                                            chatRoom.room.account.profile
                                                .first_name
                                        "
                                        :last-name="
                                            chatRoom.room.account.profile
                                                .last_name
                                        "
                                        :image-url="
                                            chatRoom.room.account.profile
                                                .image_url
                                        "
                                        :message="chatRoom.last_chat.message"
                                        :updated-at="chatRoom.room.updated_at"
                                        :is-seen="
                                            chatRoom.last_chat[
                                                chatRoom.last_chat
                                                    .is_sent_by === 'customer'
                                                    ? 'is_seen_by_customer'
                                                    : 'is_seen_by_shop'
                                            ]
                                        "
                                    ></global-chat-room-list-item>
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
                            src="https://i.pinimg.com/originals/8d/ec/f9/8decf9caed777b8d0d698e01270ce308.png"
                        ></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="font-weight-bold">
                            <span title="Sebastian Curtis Lavarias"
                                >Sebastian Curtis Lavarias</span
                            >
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            Product:
                            <v-menu offset-y open-on-hover>
                                <template v-slot:activator="{ on, attrs }">
                                    <span
                                        title="Samsung Galaxy S10"
                                        class="black--text font-weight-bold"
                                        v-bind="attrs"
                                        v-on="on"
                                        >Samsung Galaxy S10</span
                                    >
                                </template>
                                <v-card width="250">
                                    <v-img
                                        height="200"
                                        width="auto"
                                        src="https://res.cloudinary.com/deqllunb9/image/upload/v1618281994/lokal-ph-development/products/5f903103e5300231c292e547a17c4918_ht2bux.jpg"
                                    ></v-img>
                                    <v-card-text>
                                        <v-row dense>
                                            <v-col cols="12">
                                                <div
                                                    class="d-flex align-content-center align-center"
                                                >
                                                    <v-icon class="mr-1" small
                                                        >mdi-cart</v-icon
                                                    >
                                                    <span
                                                        title="Name"
                                                        class="font-weight-bold"
                                                    >
                                                        Samsung Galaxy S10
                                                    </span>
                                                </div>
                                            </v-col>
                                            <v-col cols="12">
                                                <div
                                                    class="d-flex align-content-center align-center"
                                                >
                                                    <v-icon class="mr-1" small
                                                        >mdi-shape</v-icon
                                                    >
                                                    <span title="Category">
                                                        Mobile Phones & Tablet
                                                    </span>
                                                </div>
                                            </v-col>
                                            <v-col cols="12">
                                                <div
                                                    class="d-flex align-content-center align-center"
                                                >
                                                    <v-icon class="mr-1" small
                                                        >mdi-file-table-box-multiple</v-icon
                                                    >
                                                    <span
                                                        title="Available Stock"
                                                    >
                                                        99 pcs available
                                                    </span>
                                                </div>
                                            </v-col>
                                            <v-col cols="12">
                                                <div
                                                    class="d-flex align-content-center align-center"
                                                >
                                                    <v-icon class="mr-1" small
                                                        >mdi-heart</v-icon
                                                    >
                                                    <span title="Likes">
                                                        99 Likes
                                                    </span>
                                                </div>
                                            </v-col>
                                            <v-col cols="12">
                                                <div
                                                    class="d-flex align-content-center align-center"
                                                >
                                                    <v-icon class="mr-1" small
                                                        >mdi-eye</v-icon
                                                    >
                                                    <span title="Views">
                                                        99 Views
                                                    </span>
                                                </div>
                                            </v-col>
                                            <v-col cols="12">
                                                <div
                                                    class="d-flex align-content-center align-center"
                                                >
                                                    <v-icon class="mr-1" small
                                                        >mdi-clock</v-icon
                                                    >
                                                    <span title="Created At">
                                                        Created 2 days ago
                                                    </span>
                                                </div>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-menu>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <div
                    :style="{ height: '430px', overflow: 'auto' }"
                    ref="messages"
                >
                    <v-card-text>
                        <v-row dense>
                            <template v-for="(chat, index) in chats">
                                <v-col cols="12" :key="index">
                                    <template v-if="chat.sender === 0">
                                        <div
                                            :style="{ maxWidth: '75%' }"
                                            class="d-flex"
                                        >
                                            <v-avatar :size="25" class="mr-2">
                                                <v-img
                                                    src="https://i.pinimg.com/originals/8d/ec/f9/8decf9caed777b8d0d698e01270ce308.png"
                                                ></v-img>
                                            </v-avatar>
                                            <div>
                                                <!--Implement truncate here-->
                                                <span
                                                    class="caption"
                                                    title="Sebastian"
                                                >
                                                    Sebastian
                                                </span>
                                                <v-card
                                                    class="my-1"
                                                    color="#E4E6EB"
                                                    shaped
                                                    flat
                                                >
                                                    <v-card-text
                                                        class="black--text"
                                                    >
                                                        Lorem ipsum dolor sit
                                                        amet.
                                                    </v-card-text>
                                                </v-card>
                                            </div>
                                        </div>
                                    </template>
                                    <template v-if="chat.sender === 1">
                                        <div
                                            class="d-flex justify-space-between"
                                        >
                                            <v-spacer></v-spacer>
                                            <v-card
                                                color="secondary lighten--5"
                                                flat
                                                max-width="75%"
                                            >
                                                <v-card-text
                                                    class="white--text"
                                                >
                                                    {{ chat.message }}
                                                </v-card-text>
                                            </v-card>
                                        </div>
                                    </template>
                                </v-col>
                            </template>
                        </v-row>
                    </v-card-text>
                </div>

                <v-card-text>
                    <v-textarea
                        outlined
                        height="80"
                        color="secondary"
                        placeholder="Type your message here..."
                        no-resize
                        v-model="message"
                        :counter="200"
                        @keyup.enter="sendChat"
                        autofocus
                    >
                        <template v-slot:append-outer>
                            <v-btn
                                color="secondary"
                                fab
                                small
                                depressed
                                class="align-self-center"
                                :disabled="!isFormValid"
                                v-if="!isMessageNull"
                                @click="sendChat"
                            >
                                <v-icon>mdi-send</v-icon>
                            </v-btn>
                            <v-btn
                                color="secondary"
                                fab
                                small
                                depressed
                                class="align-self-center"
                                @click="openFileExplorer"
                                v-if="isMessageNull"
                            >
                                <v-icon>mdi-image</v-icon>
                            </v-btn>
                            <input
                                ref="uploader"
                                class="d-none"
                                type="file"
                                accept="image/*"
                            />
                        </template>
                    </v-textarea>
                </v-card-text>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import { GET_ACCOUNT_SHOPS } from "@/store/types/shop-store-type";
import { GET_ACCOUNT_DETAILS_BY_EMAIL } from "@/store/types/account-store-type";
import pusherService from "@/services/pusher-service";
import commonUtility from "@/common/utility";
import GlobalChatRoomListItem from "@/components/global/chat-room-list-item";

export default {
    components: { GlobalChatRoomListItem },
    mixins: [commonUtility],

    data() {
        return {
            room: null,
            chats: [],
            message: null,
            shops: [],
            account: null,
            isGetAccountDetailsStart: false,
            isGetShopsStart: false,
            chatRooms: [],
        };
    },

    computed: {
        isFormValid() {
            const message = this.message ? this.message.trim() : null;
            return message
                ? message.length >= 2 && message.length <= 200
                : !!message;
        },

        isMessageNull() {
            return this.message === null || this.message === "";
        },

        user() {
            return this.$store.state.authentication.user;
        },

        selectedShopId() {
            const shopId = this.$route.query.shop_id;
            return parseInt(shopId) || null;
        },

        selectedShop() {
            if (!this.selectedShopId) return null;
            return this.shops.find((shop) => shop.id === this.selectedShopId);
        },
    },

    watch: {
        async selectedShopId(value) {
            if (value) {
                await this.subscribeShop();
            }
        },
    },

    methods: {
        openFileExplorer() {
            window.addEventListener("focus", () => {}, { once: true });
            this.$refs.uploader.click();
        },

        sendChat() {
            if (this.isFormValid) {
                this.chats = [
                    ...this.chats,

                    {
                        message: "Test",
                        sender: 0,
                    },

                    {
                        message: this.message.trim(),
                        sender: 1,
                    },
                ];
                this.message = null;
                this.scrollToBottom();
            }
        },

        scrollToBottom() {
            this.$nextTick(() => {
                const element = this.$refs.messages;
                this.$refs.messages.scrollTop =
                    element.scrollHeight - element.clientHeight;
            });
        },

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
                perPage: 999,
            };
            this.isGetShopsStart = true;
            const { data } = await this.$store.dispatch(
                GET_ACCOUNT_SHOPS,
                payload
            );
            this.isGetShopsStart = false;
            this.shops = data.shops;
            if (!this.selectedShop) {
                const shop = this.shops[0];
                await this.setRouteQueries(shop.id);
            }
        },

        async setRouteQueries(shopId) {
            await this.$router.push({
                name: "seller-dashboard-chat",
                query: { shop_id: shopId },
            });
        },

        async subscribeShop() {
            const subscription = pusherService.subscribe(
                `shop-${this.selectedShopId}`
            );
            subscription.bind("new-room", (chatRoom) => {
                this.chatRooms = [chatRoom, ...this.chatRooms];
            });
            subscription.bind("room", (chatRoom) => {
                console.log(chatRoom);
                this.chatRooms = this.chatRooms.filter(
                    (_chatRoom) => _chatRoom.room.id !== chatRoom.room.id
                );
                this.chatRooms = [chatRoom, ...this.chatRooms];
            });
        },

        unsubscribeShop() {
            pusherService.unsubscribe(`shop-${this.selectedShopId}`);
        },
    },

    async created() {
        if (this.selectedShopId) await this.subscribeShop();
        await this.getAccountDetails();
        await this.getShops();
        this.scrollToBottom();
    },

    destroyed() {
        this.unsubscribeShop();
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
