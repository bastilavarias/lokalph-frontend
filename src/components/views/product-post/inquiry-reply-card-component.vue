<template>
    <div class="d-flex align-start justify-space-between mb-2">
        <v-avatar>
            <v-img :src="user.profile.image_url"></v-img>
        </v-avatar>
        <div class="mr-2 text-content flex-grow-1">
            <div class="pl-4">
                <v-row dense>
                    <v-col cols="12">
                        <div class="d-flex align-content-center align-center">
                            <span class="text-capitalize subtitle-1">
                                Sebastian Curtis Lavarias
                            </span>
                            <span class="mx-1">
                                <v-chip color="secondary" small label>
                                    <v-icon small class="mr-1"
                                        >mdi-reply</v-icon
                                    >
                                    <span>Answered</span>
                                </v-chip>
                            </span>
                            <span class="mx-1"> · </span>
                            <span class="caption">
                                {{ formatRelativeTime(user.created_at) }}
                            </span>
                        </div>
                    </v-col>
                    <v-col cols="12">
                        <v-row dense>
                            <v-col cols="12">
                                <div
                                    class="subtitle-1 text-justify mb-2"
                                    :style="{
                                        wordBreak: 'break-all',
                                    }"
                                >
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. A accusamus cum dolorum
                                    eaque ex id nam nisi quam quas voluptatibus.
                                    Asperiores debitis deserunt ducimus enim
                                    error fugit minima, nemo nihil nobis
                                    pariatur placeat quia quibusdam quos
                                    repellendus saepe sequi sint, voluptate. Cum
                                    dolore magnam necessitatibus velit vero.
                                    Atque ducimus, vel?
                                </div>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </div>
        </div>
    </div>
</template>

<script>
import commonUtility from "@/common/utility";

export default {
    name: "product-post-view-inquiry-reply-card-component",

    mixins: [commonUtility],

    data() {
        return {
            isReplyFormOpen: false,
        };
    },

    computed: {
        user() {
            return this.$store.state.authentication.user;
        },
    },
};
</script>
