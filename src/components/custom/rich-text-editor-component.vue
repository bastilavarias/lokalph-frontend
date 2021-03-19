<template>
    <div class="editor">
        <ckeditor
            v-model="editorData"
            :config="editorConfig"
            class="editor"
        ></ckeditor>
    </div>
</template>

<script>
export default {
    name: "custom-rich-text-editor-component",

    data() {
        return {
            editorData: null,
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
};
</script>

<style scoped>
.editor {
    font-family: "Poppins", sans-serif !important;
    font-size: 1rem !important;
}
</style>
