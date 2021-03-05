<template>
    <div class="d-flex justify-center align-center py-5">
        <v-progress-circular
            :size="35"
            :width="3"
            indeterminate
            color="primary"
        ></v-progress-circular>
    </div>
</template>

<script>
export default {
    name: "custom-loading-spinner-component",
};
</script>
