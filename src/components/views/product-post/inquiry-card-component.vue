<template>
    <v-card
        outlined
        class="rounded-xl py-5 px-4"
        :id="`product-post-view-inquiry-card-component-${inquiryId}`"
    >
        <div class="d-flex align-start justify-space-between mb-2">
            <v-avatar>
                <v-img :src="accountImageUrl"></v-img>
            </v-avatar>
            <div class="mr-2 text-content flex-grow-1">
                <div class="pl-4">
                    <v-row dense>
                        <v-col cols="12">
                            <div
                                class="d-flex align-content-center align-center"
                            >
                                <custom-router-link-component
                                    :to="{
                                        name: 'profile-view',
                                        params: { email: accountEmail },
                                    }"
                                >
                                    <span
                                        class="black--text text-capitalize subtitle-1"
                                    >
                                        {{ accountFirstName }}
                                    </span>
                                </custom-router-link-component>
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
                                <template v-for="(reply, index) in replies">
                                    <v-col cols="12" :key="index">
                                        <product-post-view-inquiry-reply-card-component
                                            :first-name="
                                                reply.account.profile.first_name
                                            "
                                            :created-at="reply.created_at"
                                            :message="reply.message"
                                            :image-url="
                                                reply.account.profile.image_url
                                            "
                                        ></product-post-view-inquiry-reply-card-component>
                                    </v-col>
                                </template>
                                <v-col
                                    cols="12"
                                    v-if="isGetReplyStart && !currentReply"
                                >
                                    <div class="text-center">
                                        <custom-loading-spinner-component></custom-loading-spinner-component>
                                    </div>
                                </v-col>
                                <v-col cols="12" v-if="isReplyButtonShow">
                                    <span
                                        class="font-weight-bold secondary--text"
                                        :style="{ cursor: 'pointer' }"
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
import Product from "@/views/profile/Product";
import CustomRouterLinkComponent from "@/components/custom/router-link-component";

export default {
    name: "product-post-view-inquiry-card-component",

    components: {
        CustomRouterLinkComponent,
        Product,
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

        accountFirstName: {
            type: String,
            required: true,
        },

        accountEmail: {
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

        accountImageUrl: {
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
            replies: [],
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

        isReplyButtonShow() {
            return (
                !this.isReplyFormOpen &&
                this.isOwner &&
                this.replies.length === 0
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
                this.replies = [data, ...this.replies];
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
                this.replies = [data, ...this.replies];
                this.isGetReplyStart = false;
                return;
            }
            this.isGetReplyStart = false;
        },
    },

    async created() {
        await this.getReply();
    },
};
</script>
