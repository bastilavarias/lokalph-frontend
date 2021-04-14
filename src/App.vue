<template>
    <router-view></router-view>
</template>

<script>
export default {
    name: "App",
};
</script>

<style>
.custom-black-overlay {
    background: -moz-linear-gradient(
        top,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0) 59%,
        rgba(0, 0, 0, 0.65) 100%
    );
    background: -webkit-gradient(
        linear,
        left top,
        left bottom,
        color-stop(0%, rgba(0, 0, 0, 0)),
        color-stop(59%, rgba(0, 0, 0, 0)),
        color-stop(100%, rgba(0, 0, 0, 0.65))
    );
    background: -webkit-linear-gradient(
        top,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0) 59%,
        rgba(0, 0, 0, 0.65) 100%
    );
    background: -o-linear-gradient(
        top,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0) 59%,
        rgba(0, 0, 0, 0.65) 100%
    );
    background: -ms-linear-gradient(
        top,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0) 59%,
        rgba(0, 0, 0, 0.65) 100%
    );
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0) 59%,
        rgba(0, 0, 0, 0.65) 100%
    );
}
</style>
