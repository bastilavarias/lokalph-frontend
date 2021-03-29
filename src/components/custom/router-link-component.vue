<template>
    <router-link :to="to" :style="{ textDecoration: 'none' }">
        <slot></slot>
    </router-link>
</template>

<script>
export default {
    name: "custom-router-link-component",

    props: {
        to: {
            type: Object,
            required: true,
        },
    },
};
</script>
