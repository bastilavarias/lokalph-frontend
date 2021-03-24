<template>
    <v-card outlined class="rounded-xl">
        <div class="px-4 pt-3">
            <div class="d-flex align-start justify-space-between mb-2">
                <v-avatar>
                    <v-img :src="user.profile.image_url"></v-img>
                </v-avatar>
                <div class="mr-2 text-content flex-grow-1">
                    <div class="px-4">
                        <div class="subtitle-1 mb-2">
                            <div
                                class="mb-1 d-flex align-content-center align-center"
                            >
                                <span class="text-capitalize">
                                    Sebastian Curtis Lavarias
                                </span>
                                <span class="mx-1"> · </span>
                                <span class="caption">
                                    {{ formatRelativeTime(user.created_at) }}
                                </span>
                            </div>
                            <div
                                class="text-justify"
                                :style="{ wordBreak: 'break-all' }"
                            >
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. A accusamus cum dolorum eaque
                                ex id nam nisi quam quas voluptatibus.
                                Asperiores debitis deserunt ducimus enim error
                                fugit minima, nemo nihil nobis pariatur placeat
                                quia quibusdam quos repellendus saepe sequi
                                sint, voluptate. Cum dolore magnam
                                necessitatibus velit vero. Atque ducimus, vel?
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </v-card>
</template>

<script>
import commonUtility from "@/common/utility";

export default {
    name: "product-post-view-inquiry-card-component",

    mixins: [commonUtility],

    computed: {
        user() {
            return this.$store.state.authentication.user;
        },
    },
};
</script>
