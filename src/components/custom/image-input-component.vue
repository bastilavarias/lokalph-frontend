<template>
    <div>
        <div v-if="previews.length > 0" class="mb-5">
            <div class="subtitle-2 font-weight-regular mb-5">
                Current Images
            </div>
            <v-slide-group>
                <template v-for="(preview, index) in previews">
                    <v-slide-item :key="index" class="mr-2">
                        <v-avatar :size="150" tile>
                            <v-img :src="preview"></v-img>
                        </v-avatar>
                    </v-slide-item>
                </template>
            </v-slide-group>
        </div>
        <v-file-input
            v-model="files"
            counter
            :label="label"
            multiple
            prepend-icon="mdi-image-multiple"
            :outlined="outlined"
            :show-size="1000"
            accept="image/png, image/jpeg, image/bmp"
        >
            <template v-slot:selection="{ index, text }">
                <v-chip v-if="index < 2" color="primary" dark label small>
                    {{ text }}
                </v-chip>

                <span
                    v-else-if="index === 2"
                    class="overline grey--text text--darken-3 mx-2"
                >
                    +{{ files.length - 2 }} File(s)
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
    },

    data() {
        return {
            files: [],
        };
    },

    computed: {
        previews() {
            if (this.files.length > 0) {
                const urls = this.files.map((file) =>
                    URL.createObjectURL(file)
                );
                URL.revokeObjectURL(this.files);
                return urls;
            } else {
                return [];
            }
        },
    },
};
</script>
