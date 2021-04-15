<template>
    <v-card outlined class="rounded-xl py-5 px-4">
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
                            <div>
                                <global-review-rating-chip-component
                                    :rating="rating"
                                ></global-review-rating-chip-component>
                            </div>
                        </v-col>
                        <v-col cols="12">
                            <div
                                class="subtitle-1 text-justify mb-2"
                                :style="{ wordBreak: 'break-all' }"
                            >
                                {{ message }}
                            </div>
                        </v-col>
                    </v-row>
                </div>
            </div>
        </div>
    </v-card>
</template>

<script>
import commonUtility from "@/common/utility";
import GlobalReviewRatingChipComponent from "@/components/global/review-rating-chip-component";
import CustomRouterLinkComponent from "@/components/custom/router-link-component";

export default {
    name: "shop-view-review-card-component",
    components: { CustomRouterLinkComponent, GlobalReviewRatingChipComponent },
    mixins: [commonUtility],

    props: {
        accountFirstName: {
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

        rating: {
            type: Number,
            required: true,
        },

        accountEmail: {
            type: String,
            required: true,
        },
    },
};
</script>
