<template>
    <v-list-item
        two-line
        exact-active-class="black--text"
        exact
        :to="{
            name: 'seller-dashboard-chat',
            query: {
                shop_id: shopId,
                room_id: roomId,
            },
        }"
    >
        <v-list-item-avatar :size="35">
            <v-img :src="imageUrl"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title>
                <span
                    :title="`${firstName} ${lastName}`"
                    :class="{
                        'font-weight-bold': !isSeen,
                    }"
                >
                    {{ firstName }}
                    {{ lastName }}
                </span>
            </v-list-item-title>
            <v-list-item-subtitle>
                <span
                    :title="message"
                    :class="{
                        'font-weight-bold': !isSeen,
                    }"
                >
                    {{ truncateString(message, 15) }}
                </span>
                <span> · </span>
                <span :title="formatRelativeTime(updatedAt)">
                    {{ formatRelativeTime(updatedAt) }}
                </span>
            </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action v-if="!isSeen">
            <v-list-item-action-text>
                <v-icon color="primary" x-small>mdi-circle</v-icon>
            </v-list-item-action-text>
        </v-list-item-action>
    </v-list-item>
</template>

<script>
import commonUtility from "@/common/utility";

export default {
    name: "global-chat-room-list-item",

    mixins: [commonUtility],

    props: {
        imageUrl: {
            type: String,
            required: true,
        },

        firstName: {
            type: String,
            required: true,
        },

        lastName: {
            type: String,
            required: true,
        },

        message: {
            type: String,
            required: true,
        },

        updatedAt: {
            type: String,
            required: true,
        },

        isSeen: {
            type: Boolean,
            required: true,
        },

        roomId: {
            type: Number,
            required: true,
        },

        shopId: {
            type: Number,
            required: true,
        },
    },
};
</script>
