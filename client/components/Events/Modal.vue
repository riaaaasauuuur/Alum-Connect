<template>
  <a-modal :title="`${isEdit ? 'Update' : isView ? 'View' : 'Add new'} ${getRoute.toLowerCase().split('s').join('')}`" :visible="visible" :maskClosable="false" @cancel="closeModal">
    <a-spin :spinning="editLoading">
      <a-icon slot="indicator" type="loading" style="font-size: 40px;" />
      <a-form-model :model="form" :rules="rules" ref="form">
        <a-form-model-item label="Title" prop="title">
          <a-input v-model="form.title" :disabled="loading" />
        </a-form-model-item>
        <a-form-model-item label="From - To" prop="dateRange">
          <a-range-picker class="input-default" v-model="form.dateRange" :disabled="loading" />
        </a-form-model-item>
        <div v-if="getRoute === 'Memoriam'">
          <a-form-model-item label="Caption" prop="caption">
            <a-input v-model="form.caption" :disabled="loading" />
          </a-form-model-item>
          <a-form-model-item label="Posted By" prop="postedBy">
            <a-input v-model="form.postedBy" :disabled="loading" />
          </a-form-model-item>
        </div>
        <a-form-model-item label="Thumbnail" prop="thumbnail">
          <a-upload
            :multiple="false"
            :fileList="imageList"
            @change="onFileChange"
            accept="image/png, image/jpeg"
          >
            <a-button type="primary" icon="upload" :disabled="loading || imageList.length > 0">Upload</a-button>
          </a-upload>
        </a-form-model-item>
        <a-form-model-item label="Description">
          <RichText v-model="form.description" :disabled="loading" />
        </a-form-model-item>
      </a-form-model>
    </a-spin>

    <template slot="footer">
      <a-row type="flex" :gutter="5" justify="end">
        <a-col>
          <a-button @click="closeModal">{{ isView ? 'Close' : 'Cancel' }}</a-button>
        </a-col>
        <a-col v-if="!isView">
          <a-button type="primary" @click="validate" :loading="loading">{{ isEdit ? 'Update' : 'Submit' }}</a-button>
        </a-col>
      </a-row>
    </template>
  </a-modal>
</template>
<script>
import RichText from "../Common/RichText.vue";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    isView: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object,
      default: {}
    },
    imageList: {
      type: Array,
      default: []
    },
    loading: {
      type: Boolean,
      default: false
    },
    editLoading: {
      type: Boolean,
      default: false
    }
  },
  components: { RichText },
  computed: {
    rules() {
      let keys = ['title'];
      if(this.getRoute === 'Memoriam') {
        keys.push(...['caption', 'postedBy']);
      } else if(this.getRoute === 'Events' || this.getRoute === 'Donations') {
        keys.push('dateRange')
      }
      return this.ruleSetter(keys);
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    onFileChange({ fileList }) {
      this.$emit('handleFile', fileList);
    },
    validate() {
      this.$refs.form.validate(valid => {
        if(valid) {
          console.log('this.imageList :>> ', this.imageList);
          if((this.imageList && this.imageList.length) && (this.form.description)) {
            this.$emit('submit');
          }
          else this.notify("error", "Fill up required fields");
        }
        else this.notify("error", "Fill up required fields");
      });
    }
  }
}
</script>
