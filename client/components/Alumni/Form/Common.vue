<template>
  <a-modal :visible="visible" :title="`New ${ucwords(details.title)}`" :maskClosable="false" @cancel="$emit('close')">

    <a-form-model :model="form" :rules="rules" ref="form" class="alumni">
      <a-form-model-item v-for="(field, index) in (details.fields || [])" :key="index" :label="field.label" :prop="field.model">
        <a-input v-model="form[field.model]" :disabled="loading" />
      </a-form-model-item>
      <div v-if="details.title === 'Course'">
        <a-form-model-item label="Has board exam" prop="hasBoard">
          <a-radio-group v-model="form.hasBoard" button-style="solid" size="large">
            <a-radio-button :value="true">Yes</a-radio-button>
            <a-radio-button :value="false">No</a-radio-button>
          </a-radio-group>
        </a-form-model-item>
      </div>
    </a-form-model>

    <template slot="footer">
      <a-row type="flex" :gutter="5" justify="end">
        <a-col>
          <a-button @click="$emit('close')">Cancel</a-button>
        </a-col>
        <a-col>
          <a-button :loading="loading" type="primary" @click="$emit('submit', $refs)">Submit</a-button>
        </a-col>
      </a-row>
    </template>
  </a-modal>
</template>
<script>
export default {
  props: {
    form: {
      type: Object,
      default: {}
    },
    details: {
      type: Object,
      default: {}
    },
    visible: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    rules() {
      let rules = {};
      let fields = this.deepCopy(this.details.fields);
      if(this.details.title === 'Course') fields.push({ model: 'hasBoard', label: 'This field' })
      fields.forEach(field => {
        Object.assign(rules, {
          [field.model]: [{
            required: true,
            message: `${field.label} is required`
          }]
        });
      });
      return rules;
    }
  }
}
</script>
<style>
.alumni .ant-form-item-label {
  line-height: 20px;
}
</style>
