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
                                        <v-list-item-avatar :size="35">
                                            <v-img
                                                src="https://i.pinimg.com/originals/8d/ec/f9/8decf9caed777b8d0d698e01270ce308.png"
                                            ></v-img>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                <span
                                                    title="Samsung Galaxy S10"
                                                >
                                                    Sebastian Curtis Lavarias
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
                            <span
                                title="Samsung Galaxy S10"
                                class="black--text font-weight-bold"
                                >Samsung Galaxy S10</span
                            >
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
                                @click="sendChat"
                            >
                                <v-icon>mdi-send</v-icon>
                            </v-btn>
                        </template>
                    </v-textarea>
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
            chats: [],
            message: null,
        };
    },

    computed: {
        isFormValid() {
            const message = this.message ? this.message.trim() : null;
            return message
                ? message.length >= 2 && message.length <= 200
                : !!message;
        },
    },

    methods: {
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
    },

    created() {
        this.scrollToBottom();
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
