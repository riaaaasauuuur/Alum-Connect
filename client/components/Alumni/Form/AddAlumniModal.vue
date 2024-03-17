<template>
  <a-modal :visible="visible" :title="`${getTitle} Alumni`" :maskClosable="false" :width="700" @cancel="closeAlumniModal">

    <a-form-model :model="form" :rules="rules" ref="form" class="alumni">
      <a-divider><h2 class="main-text">Personal Information</h2></a-divider>
      <a-row type="flex" :gutter="15">
        <a-col :span="12">
          <a-form-model-item label="First Name" prop="firstName">
            <a-input v-model="form.firstName" :disabled="loading || isView" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="Middle Name" prop="middleName">
            <a-input v-model="form.middleName" :disabled="loading || isView" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="Last Name" prop="lastName">
            <a-input v-model="form.lastName" :disabled="loading || isView" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="Suffix" prop="suffix">
            <a-input v-model="form.suffix" :disabled="loading || isView" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="Birthdate" prop="birthday">
            <a-date-picker v-model="form.birthday" class="input-default" :disabled="loading || isView" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="Civil Status" prop="civilStatus">
            <a-select placeholder="Please Select" v-model="form.civilStatus" :disabled="loading || isView">
              <a-select-option key="SINGLE">SINGLE</a-select-option>
              <a-select-option key="MARRIED">MARRIED</a-select-option>
              <a-select-option key="WIDOWED">WIDOWED</a-select-option>
              <a-select-option key="DIVORCED">DIVORCED</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="Gender" prop="gender">
            <a-radio-group button-style="solid" v-model="form.gender" :disabled="loading || isView">
              <a-radio-button value="M">
                Male
              </a-radio-button>
              <a-radio-button value="F">
                Female
              </a-radio-button>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-divider><h2 class="main-text">Contact Information</h2></a-divider>
      <a-row type="flex" :gutter="15">
        <a-col :span="24">
          <a-form-model-item label="Address Line 1" prop="addressLine1">
            <a-input v-model="form.addressLine1" :disabled="loading || isView" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="Street" prop="street">
            <a-input v-model="form.street" :disabled="loading || isView" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="Contact Number" prop="mobileNumber">
            <a-input v-model="form.mobileNumber" :disabled="loading || isView" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-divider><h2 class="main-text">Alumni Information</h2></a-divider>
      <a-row type="flex" :gutter="15">
        <a-col :span="24">
          <a-form-model-item label="Course" prop="courseId">
            <a-select placeholder="Please Select" v-model="form.courseId" :disabled="courseLoading || isView || loading" @change="onCourseChange">
              <a-select-option v-for="course in courses" :key="course._id">
                {{ course.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="Batch" prop="batchId">
            <a-select placeholder="Please Select" v-model="form.batchId" :disabled="batchLoading || isView || loading">
              <a-select-option v-for="batch in batches" :key="batch._id">
                {{ batch.year }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="Student ID" prop="uniqueId">
            <a-input v-model="form.uniqueId" :disabled="loading || isView" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="Latin Honors" prop="latinHonors">
            <a-select v-model="form.latinHonors" :disabled="loading || isView" class="input-default" placeholder="Please Select">
              <a-select-option key="CUM_LAUDE">Cum Laude</a-select-option>
              <a-select-option key="MAGNA_CUM_LAUDE">Magna Cum Laude</a-select-option>
              <a-select-option key="SUMMA_CUM_LAUDE">Summa Cum Laude</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="PRC" prop="prc">
            <a-input v-model="form.prc" :disabled="loading || isView" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12" v-if="hasBoardExam">
          <a-form-model-item label="Board Exam Passer" prop="isBoardPasser">
            <a-radio-group v-model="form.isBoardPasser" button-style="solid" size="large">
              <a-radio-button :value="true">Yes</a-radio-button>
              <a-radio-button :value="false">No</a-radio-button>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>

    <template slot="footer">
      <a-row type="flex" :gutter="5" justify="end">
        <a-col>
          <a-button @click="closeAlumniModal">{{ isView ? 'Close' : 'Cancel' }}</a-button>
        </a-col>
        <a-col v-if="!isView">
          <a-button type="primary" @click="validate" :loading="loading">{{ isEdit ? 'Update' : 'Submit' }}</a-button>
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
    }
  },
  data() {
    return {
      loading: false,
      courseLoading: false,
      batchLoading: false,
      courses: [],
      batches: [],
      hasBoardExam: false
    }
  },
  computed: {
    rules() {
      return this.ruleSetter(
        ['firstName', 'lastName', 'birthday', 'civilStatus', 'gender', 'addressLine1', 'street', 'mobileNumber', 'courseId', 'batchId', 'uniqueId']
      );
    },
    getTitle() {
      return (!this.isEdit && !this.isView) ? 'Add New' : this.isEdit ? 'Update' : 'View';
    }
  },
  watch: {
    async visible(value) {
      if(value === true && (!this.isView)) {
        await this.loadCourses();
        await this.loadBatches();
      }
    }
  },
  methods: {
    onCourseChange(courseId) {
      const item = this.courses.find(course => course._id === courseId);
      this.hasBoardExam = item.hasBoard;
    },
    validate() {
      this.$refs.form.validate(valid => {
        if(valid) this.submit();
        else this.notify("error", "Fill up required fields");
      });
    },
    async submit() {
      try {
        this.loading = true;
        await this.$axios[this.isEdit ? 'put' : 'post'](`/user-details${this.isEdit ? `/${this.form._id}` : ''}`, this.form);
        this.notify("success", `Record has been successfully ${!this.isEdit ? 'added' : 'updated'}`);
        this.$emit('close', true);
      } catch (error) {
        this.notifyErrorMessage(error);
      } finally {
        this.loading = false;
      }
    },
    closeAlumniModal() {
      if(this.$refs.form) this.$refs.form.clearValidate();
      this.$emit('close');
    },
    async loadCourses() {
      try {
        this.courseLoading = false;
        let { data } = await this.$axios.get(`/courses?paginate=false&search=isActive:true`);
        this.courses = data.rows;
      } catch (error) {
        this.notifyErrorMessage(error);
      } finally {
        this.courseLoading = false;
      }
    },
    async loadBatches() {
      try {
        this.batchLoading = false;
        let { data } = await this.$axios.get(`/batches?paginate=false&search=isActive:true`);
        this.batches = data.rows;
      } catch (error) {
        this.notifyErrorMessage(error);
      } finally {
        this.batchLoading = false;
      }
    }
  }
}
</script>
<style>
.main-text {
  color: #800000;
}
</style>
