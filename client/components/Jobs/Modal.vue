<template><a-modal :title="`${isEdit ? 'Update' : isView ? 'View' : 'Add new'} Job`" :visible="visible" :maskClosable="false" @cancel="closeModal">
    <a-spin :spinning="editLoading">
      <a-icon slot="indicator" type="loading" style="font-size: 40px;" />
      <a-form-model :model="form" :rules="rules" ref="form">
        <a-form-model-item label="Job Title" prop="title">
          <a-input v-model="form.title" :disabled="loading" />
        </a-form-model-item>
        <a-row type="flex" :gutter="10">
          <a-col :span="16">
            <a-form-model-item label="Company" prop="company">
              <a-input v-model="form.company" :disabled="loading" />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="Vacant" prop="vacancy">
              <a-input-number v-model="form.vacancy" min="1" class="input-default" :disabled="loading" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="Posted By" prop="postedBy">
          <a-input v-model="form.postedBy" />
        </a-form-model-item>
        <a-row type="flex">
          <a-col :span="12">
            <a-form-model-item label="Type" prop="jobType">
              <a-radio-group button-style="solid" v-model="form.jobType" :disabled="loading || isView">
                <a-radio-button value="FULL_TIME">
                  Full-Time
                </a-radio-button>
                <a-radio-button value="PART_TIME">
                  Part-Time
                </a-radio-button>
              </a-radio-group>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="Status" prop="status">
              <a-radio-group button-style="solid" v-model="form.status" :disabled="loading || isView">
                <a-radio-button value="ACTIVE">
                  Active
                </a-radio-button>
                <a-radio-button value="ARCHIVED">
                  Archived
                </a-radio-button>
              </a-radio-group>
            </a-form-model-item>
          </a-col>
        </a-row>
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
        <a-form-model-item label="Other Details">
          <a-textarea v-model="form.notes" />
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
      return this.ruleSetter(['title', 'company', 'jobType', 'status', 'vacancy', 'postedBy']);
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
