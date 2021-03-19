<template>
    <div>
        <div v-if="imagesLocal.length > 0" class="mb-5">
            <div class="subtitle-2 font-weight-regular mb-5">
                {{
                    operation === "create"
                        ? "Image Previews:"
                        : "Current Images"
                }}
            </div>
            <v-slide-group v-if="operation === 'create'">
                <template v-for="(file, index) in imagesLocal">
                    <v-slide-item :key="index" class="mr-2">
                        <v-avatar
                            :size="150"
                            tile
                            :style="{ position: 'relative' }"
                        >
                            <v-img :src="getFilePreview(file)"></v-img>
                            <v-btn
                                x-small
                                fab
                                light
                                class="preview-remove-button"
                                @click="removeFile(index)"
                            >
                                <v-icon color="primary">mdi-trash-can</v-icon>
                            </v-btn>
                        </v-avatar>
                    </v-slide-item>
                </template>
            </v-slide-group>
        </div>
        <v-file-input
            v-model="imagesLocal"
            counter
            :label="label"
            multiple
            prepend-icon="mdi-image-multiple"
            :outlined="outlined"
            :show-size="1000"
            accept="image/png, image/jpeg, image/bmp"
            v-if="operation === 'create'"
        >
            <template v-slot:selection="{ index, text }">
                <v-chip v-if="index < 2" color="primary" dark label small>
                    {{ text }}
                </v-chip>

                <span
                    v-else-if="index === 2"
                    class="overline grey--text text--darken-3 mx-2"
                >
                    +{{ imagesLocal.length - 2 }} File(s)
                </span>
            </template>
        </v-file-input>
    </div>
</template>

<script>
export default {
    name: "custom-image-input-component",

    props: {
        label: {
            type: String,
            required: false,
        },

        outlined: {
            type: Boolean,
            required: false,
        },

        operation: {
            type: String,
            required: true,
        },

        images: {
            type: Array,
            required: true,
        },
    },

    data() {
        return {
            imagesLocal: this.images,
        };
    },

    watch: {
        images(value) {
            this.imagesLocal = value;
        },

        imagesLocal(value) {
            this.$emit("update:images", value);
        },
    },

    methods: {
        getFilePreview(file) {
            const url = URL.createObjectURL(file);
            URL.revokeObjectURL(file);
            return url;
        },

        removeFile(index) {
            this.imagesLocal = this.imagesLocal.filter(
                (_, fileIndex) => index !== fileIndex
            );
        },
    },
};
</script>

<style scoped>
.preview-remove-button {
    position: absolute;
    top: 2%;
    right: 2%;
    transform: translate(-2%, -2%);
}
</style>
