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
                                <!--                                <v-col cols="12">-->
                                <!--                                    <product-post-view-inquiry-reply-card-component></product-post-view-inquiry-reply-card-component>-->
                                <!--                                </v-col>-->
                                <v-col cols="12">
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

export default {
    name: "product-post-view-inquiry-card-component",

    components: { ProductPostViewInquiryReplyCardComponent },

    mixins: [commonUtility],

    props: {
        inquiryId: {
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
    },
};
</script>
