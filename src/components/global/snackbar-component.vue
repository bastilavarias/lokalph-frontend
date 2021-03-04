<template>
    <v-snackbar
        v-model="isOpenLocal"
        :color="colorLocal"
        multi-line
        :timeout="timeout"
    >
        {{ textLocal }}
        <template v-slot:action="{ attrs }">
            <v-btn text v-bind="attrs" @click="isOpenLocal = false">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
import { GLOBAL_SET_SNACKBAR_CONFIGS } from "@/store/types/global-store-type";

export default {
    name: "global-snackbar",
    data() {
        return {
            isOpenLocal: false,
            textLocal: null,
            colorLocal: null,
            timeout: 4000,
        };
    },
    computed: {
        configs() {
            return this.$store.state.global.snackbarConfigs;
        },
    },
    watch: {
        configs(value) {
            if (value) {
                const { isOpen, text, color } = value;
                this.textLocal = text;
                this.colorLocal = color;
                this.isOpenLocal = isOpen;
                return;
            }
            this.textLocal = null;
            this.colorLocal = null;
            this.isOpenLocal = false;
        },
        isOpenLocal(isOpen) {
            if (!isOpen)
                return this.$store.commit(GLOBAL_SET_SNACKBAR_CONFIGS, null);
        },
    },
};
</script>
