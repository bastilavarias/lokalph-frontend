<template>
    <v-card outlined class="rounded-xl py-5 px-4">
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
                            <div>
                                <global-review-rating-chip-component
                                    :rating="rating"
                                ></global-review-rating-chip-component>
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
                                <v-col cols="12" v-if="images.length > 0">
                                    <v-row dense>
                                        <template
                                            v-for="(image, index) in images"
                                        >
                                            <v-col
                                                cols="12"
                                                md="4"
                                                :key="index"
                                            >
                                                <v-img
                                                    width="auto"
                                                    height="100"
                                                    :src="image.url"
                                                    position="center"
                                                ></v-img>
                                            </v-col>
                                        </template>
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
import GlobalReviewRatingChipComponent from "@/components/global/review-rating-chip-component";

export default {
    name: "product-post-view-review-card-component",
    components: { GlobalReviewRatingChipComponent },
    mixins: [commonUtility],

    props: {
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

        rating: {
            type: Number,
            required: true,
        },

        images: {
            type: Array,
            required: true,
        },
    },
};
</script>
