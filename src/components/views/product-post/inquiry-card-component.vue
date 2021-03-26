<template>
    <v-card
        outlined
        class="rounded-xl py-5 px-4"
        :id="`product-post-view-inquiry-card-component-${inquiryId}`"
    >
        <div class="d-flex align-start justify-space-between mb-2">
            <v-avatar>
                <v-img :src="imageUrl"></v-img>
            </v-avatar>
            <div class="mr-2 text-content flex-grow-1">
                <div class="pl-4">
                    <v-row dense>
                        <v-col cols="12">
                            <div
                                class="d-flex align-content-center align-center"
                            >
                                <span class="text-capitalize subtitle-1">
                                    {{ firstName }}
                                </span>
                                <span class="mx-1"> · </span>
                                <span class="caption">
                                    {{ formatRelativeTime(createdAt) }}
                                </span>
                            </div>
                        </v-col>
                        <v-col cols="12">
                            <v-row dense>
                                <v-col cols="12">
                                    <div
                                        class="subtitle-1 text-justify mb-2"
                                        :style="{ wordBreak: 'break-all' }"
                                    >
                                        {{ message }}
                                    </div>
                                </v-col>
                                <v-col cols="12" v-if="currentReply">
                                    <product-post-view-inquiry-reply-card-component></product-post-view-inquiry-reply-card-component>
                                </v-col>
                                <v-col
                                    cols="12"
                                    v-if="isGetReplyStart && !currentReply"
                                >
                                    <div class="text-center">
                                        <custom-loading-spinner-component></custom-loading-spinner-component>
                                    </div>
                                </v-col>
                                <v-col
                                    cols="12"
                                    v-if="!currentReply && !isGetReplyStart"
                                >
                                    <span
                                        class="font-weight-bold secondary--text"
                                        :style="{ cursor: 'pointer' }"
                                        v-if="!isReplyFormOpen && isOwner"
                                        @click="isReplyFormOpen = true"
                                    >
                                        <v-icon color="secondary"
                                            >mdi-reply</v-icon
                                        >
                                        Reply
                                    </span>
                                </v-col>
                                <v-col cols="12" v-if="isReplyFormOpen">
                                    <v-row dense>
                                        <v-col cols="12">
                                            <v-textarea
                                                placeholder="Write your answer(s) here"
                                                outlined
                                                :counter="2500"
                                                v-model="replyMessage"
                                            ></v-textarea>
                                        </v-col>
                                        <v-col cols="12">
                                            <div
                                                class="d-flex align-content-center align-center justify-space-between"
                                            >
                                                <v-spacer></v-spacer>
                                                <div>
                                                    <v-btn
                                                        text
                                                        class="text-capitalize mr-1"
                                                        @click="
                                                            isReplyFormOpen = false
                                                        "
                                                        >Cancel</v-btn
                                                    >
                                                    <v-btn
                                                        color="primary"
                                                        depressed
                                                        class="text-capitalize"
                                                        @click="answer"
                                                        :disabled="
                                                            !isAnswerFormValid
                                                        "
                                                        :loading="isAnswerStart"
                                                        >Answer</v-btn
                                                    >
                                                </div>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </div>
            </div>
        </div>
    </v-card>
</template>

<script>
import commonUtility from "@/common/utility";
import ProductPostViewInquiryReplyCardComponent from "@/components/views/product-post/inquiry-reply-card-component";
import {
    CREATE_PRODUCT_INQUIRY,
    CREATE_PRODUCT_INQUIRY_REPLY,
    GET_PRODUCT_INQUIRY_REPLY,
} from "@/store/types/product-store-type";
import CustomLoadingSpinnerComponent from "@/components/custom/loading-spinner-component";

export default {
    name: "product-post-view-inquiry-card-component",

    components: {
        CustomLoadingSpinnerComponent,
        ProductPostViewInquiryReplyCardComponent,
    },

    mixins: [commonUtility],

    props: {
        inquiryId: {
            type: Number,
            required: true,
        },

        productId: {
            type: Number,
            required: true,
        },

        firstName: {
            type: String,
            required: true,
        },

        createdAt: {
            type: String,
            required: true,
        },

        message: {
            type: String,
            required: true,
        },

        imageUrl: {
            type: String,
            required: true,
        },

        ownerId: {
            type: Number,
            required: true,
        },
    },

    data() {
        return {
            isReplyFormOpen: false,
            isAnswerStart: false,
            replyMessage: null,
            currentReply: null,
            isGetReplyStart: false,
        };
    },

    computed: {
        user() {
            return this.$store.state.authentication.user;
        },

        isOwner() {
            if (!this.user) return false;
            return this.user.id === this.ownerId;
        },

        isAnswerFormValid() {
            return (
                this.replyMessage &&
                this.replyMessage.length >= 3 &&
                this.replyMessage.length <= 2500
            );
        },
    },

    methods: {
        async answer() {
            this.isAnswerStart = true;
            const payload = {
                inquiryId: this.inquiryId,
                productId: this.productId,
                message: this.replyMessage,
            };
            const { data, success } = await this.$store.dispatch(
                CREATE_PRODUCT_INQUIRY_REPLY,
                payload
            );
            if (success) {
                this.currentReply = Object.assign({}, data);
                this.replyMessage = null;
                this.isAnswerStart = false;
                this.isReplyFormOpen = false;
            }
        },

        async getReply() {
            this.isGetReplyStart = true;
            const { data } = await this.$store.dispatch(
                GET_PRODUCT_INQUIRY_REPLY,
                this.inquiryId
            );
            if (data) {
                this.currentReply = Object.assign({}, data);
                this.isGetReplyStart = false;
                return;
            }
            this.isGetReplyStart = false;
        },
    },

    async mounted() {
        await this.getReply();
    },
};
</script>
