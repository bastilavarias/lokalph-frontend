<template>
    <v-dialog width="500" persistent v-model="isOpenLocal">
        <v-card>
            <v-card-title>
                <span>Send a Chat</span>
                <v-spacer> </v-spacer>
                <v-btn icon @click="isOpenLocal = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-card-text class="pl-0">
                            <v-img
                                :src="productPreview.url"
                                width="100%"
                                height="auto"
                                position="center"
                            ></v-img>
                        </v-card-text>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-list-item-content>
                            <v-list-item-title
                                class="headline font-weight-bold accent--text"
                            >
                                <span :title="productName">
                                    {{ productName }}
                                </span>
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                <span
                                    :title="`Product Category: ${productCategory.label}`"
                                    >{{ productCategory.label }}</span
                                >
                            </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-row dense>
                            <v-col cols="12">
                                <div
                                    class="d-flex align-content-center align-center"
                                >
                                    <v-icon class="mr-1">mdi-clock</v-icon>
                                    <span
                                        class="subtitle-1"
                                        :title="`Posted: ${formatRelativeTime(
                                            productCreatedAt
                                        )}`"
                                    >
                                        {{
                                            formatRelativeTime(productCreatedAt)
                                        }}
                                    </span>
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <div
                                    class="d-flex align-content-center align-center"
                                >
                                    <v-icon class="mr-1"
                                        >mdi-checkbox-blank</v-icon
                                    >
                                    <span
                                        class="subtitle-1"
                                        :title="`This item is tagged as ${productCategory.label}`"
                                        >{{ productCategory.label }}</span
                                    >
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <div
                                    class="d-flex align-content-center align-center"
                                >
                                    <v-icon class="mr-1"
                                        >mdi-file-table-box-multiple</v-icon
                                    >
                                    <span
                                        class="subtitle-1"
                                        title="Total Stock"
                                    >
                                        {{ productStock }} stock available
                                    </span>
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <div
                                    class="d-flex align-content-center align-center"
                                >
                                    <span
                                        class="subtitle-1 mr-1 font-weight-bold secondary--text"
                                        title="Price per unit"
                                    >
                                        {{ formatMoney("PHP", productPrice) }}
                                    </span>
                                    per unit
                                </div>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-text>
                <v-row dense>
                    <v-col cols="12">
                        <div class="-center">
                            <template v-for="(text, index) in messages">
                                <v-chip
                                    color="primary"
                                    class="mr-1"
                                    :key="index"
                                    @click="message = text"
                                    >{{ text }}</v-chip
                                >
                            </template>
                        </div>
                    </v-col>
                    <v-col cols="12"></v-col>
                    <v-col cols="12">
                        <v-textarea
                            outlined
                            label="Message"
                            v-model="message"
                            :counter="200"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    color="primary"
                    depressed
                    block
                    class="text-capitalize"
                    :disabled="!isFormValid"
                    :loading="isSendChatStart"
                    @click="sendChat"
                >
                    Send
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import commonUtility from "@/common/utility";
import { INITIATE_CHAT } from "@/store/types/chat-store-type";

export default {
    name: "product-post-view-chat-dialog-component",

    mixins: [commonUtility],

    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },

        productId: {
            type: Number,
            required: true,
        },

        productPreview: {
            type: Object,
            required: true,
        },

        productName: {
            type: String,
            required: true,
        },

        productCreatedAt: {
            type: String,
            required: true,
        },

        productCondition: {
            type: Object,
            required: true,
        },

        productStock: {
            type: Number,
            required: true,
        },

        productPrice: {
            required: true,
        },

        productCategory: {
            type: Object,
            required: true,
        },

        shopId: {
            type: Number,
            required: true,
        },
    },

    data() {
        return {
            isOpenLocal: this.isOpen,
            messages: [
                "Hi, is this available?",
                "Hi, is the price negotiable?",
            ],
            message: null,
            isSendChatStart: false,
        };
    },

    computed: {
        isFormValid() {
            const message = this.message ? this.message.trim() : null;
            return message
                ? message.length >= 2 && message.length <= 200
                : !!message;
        },

        user() {
            return this.$store.state.authentication.user;
        },
    },

    watch: {
        isOpen(value) {
            this.isOpenLocal = value;
        },

        isOpenLocal(value) {
            this.$emit("update:isOpen", value);
        },
    },

    methods: {
        async sendChat() {
            this.isSendChatStart = true;
            const payload = {
                shopId: this.shopId,
                accountId: this.user.id,
                message: this.message,
                productId: this.productId,
                image: null,
            };
            const { success } = await this.$store.dispatch(
                INITIATE_CHAT,
                payload
            );
            if (success) {
                this.message = null;
                this.isOpenLocal = false;
                this.isSendChatStart = false;
                return;
            }
            this.isSendChatStart = false;
        },
    },
};
</script>
