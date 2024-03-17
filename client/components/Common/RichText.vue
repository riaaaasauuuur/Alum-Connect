<template>
  <div
    class="editor"
    :content="value"
    v-quill:myQuillEditor="editorOption"
    @change="update($event)"
    :disabled="disabled"
  ></div>
</template>

<script>
export default {
  props: ["value","disabled"],
  data() {
    return {
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "strike", "link"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            ["blockquote", "script", "code"],
          ],
        },
      },
    };
  },
  methods: {
    update({ editor, html, text }) {
      this.$emit("input", html);
    },
  },
};
</script>

<style>
.editor {
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;
}
</style>
