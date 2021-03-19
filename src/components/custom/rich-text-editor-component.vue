<template>
    <div class="editor">
        <ckeditor
            v-model="editorContentLocal"
            :config="editorConfig"
            class="editor"
        ></ckeditor>
    </div>
</template>

<script>
export default {
    name: "custom-rich-text-editor-component",

    props: {
        editorContent: {
            required: true,
        },
    },

    data() {
        return {
            editorContentLocal: this.editorContent,
            editorConfig: {
                toolbar: [
                    ["Bold", "Italic", "Underline", "Strike"],
                    ["NumberedList", "BulletedList"],
                    ["Undo", "Redo"],
                    ["About"],
                ],
            },
        };
    },

    watch: {
        editorContent(value) {
            this.editorContentLocal = value;
        },

        editorContentLocal(value) {
            this.$emit("update:editorContent", value);
        },
    },
};
</script>

<style scoped>
.editor {
    font-family: "Poppins", sans-serif !important;
    font-size: 1rem !important;
}
</style>
