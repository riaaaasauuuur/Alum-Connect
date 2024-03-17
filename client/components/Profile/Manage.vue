<template>
  <a-spin :spinning="loading">
    <a-icon slot="indicator" type="loading" style="font-size: 40px;" />
    <CommonProfileHeader @back="$emit('back')" :details="header" />
    <div class="manage-account-avatar">
      <a-avatar :size="100" v-if="user.details.avatar" :src="user.details.avatar" />
      <a-avatar :size="100" v-else icon="user" />
      <div v-if="isEdit">
        <a-upload
          class="importUploader"
          :multiple="false"
          :beforeUpload="(file) => beforeUpload(file)"
          accept="image/png, image/jpeg"
        >
          <a-icon type="edit" class="edit-profile" />
        </a-upload>
      </div>
    </div>
    <div class="manage-account-form">
      <a-form-model :model="form" ref="form" :rules="rules">
        <a-row type="flex" :gutter="10">
          <a-col :span="12">
            <a-form-model-item label="First Name" prop="details.firstName">
              <a-input v-model="form.details.firstName" :disabled="!isEdit" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="Middle Name" prop="details.middleName">
              <a-input v-model="form.details.middleName" :disabled="!isEdit" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="Last Name" prop="details.lastName">
              <a-input v-model="form.details.lastName" :disabled="!isEdit" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="Suffix" prop="details.suffix">
              <a-input v-model="form.details.suffix" :disabled="!isEdit" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="Email">
              <a-input v-model="form.email" disabled />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="Contact Number" prop="details.mobileNumber">
              <a-input v-model="form.details.mobileNumber" :disabled="!isEdit" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="Birth Date" prop="details.birthday">
              <a-date-picker v-model="form.details.birthday" class="input-default" :disabled="!isEdit" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-button type="primary" ghost block shape="round" icon="edit" size="large" v-if="!isEdit" @click="isEdit = true">Edit</a-button>
        <a-row type="flex" :gutter="10" v-else>
          <a-col :span="12">
            <a-button type="primary" ghost block shape="round" icon="close" size="large" @click="isEdit = false; $fetch()">Cancel</a-button>
          </a-col>
          <a-col :span="12">
            <a-button type="primary" block shape="round" icon="check" size="large" @click="validate">Confirm</a-button>
          </a-col>
        </a-row>
      </a-form-model>
    </div>
  </a-spin>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      header: { title: "My Account", subtitle: "Manage your info" },
      form: {},
      loading: false,
      isEdit: false
    }
  },
  computed: {
    rules() {
      return this.ruleSetter(['details.firstName', 'details.middleName', 'details.lastName', 'details.mobileNumber', 'details.birthday']);
    }
  },
  fetch() {
    this.form = this.deepCopy({ ...this.user, details: this.user.details });
  },
  methods: {
    validate() {
      this.$refs.form.validate(valid => {
        if(valid) this.submit();
        else this.notify("error", "Fill up required fields");
      });
    },
    async submit() {
      try {
        this.loading = true;
        if(!this.user?.details?._id)
          return this.notify("error", "Error occured");

        let {data} = await this.$axios.put(`/user-details/${this.user?.details?._id}`, this.form);
        this.$emit('loadProfile');
        this.$emit('back');
        this.notify("success", "Profile updated successfully");
      } catch (error) {
        this.notifyErrorMessage(error);
      } finally {
        this.loading = false;
      }
    },
    async beforeUpload(file) {
      try {
        this.loading = true;
        let fd = new FormData();
        fd.append('files', file)

        let { data } = await this.$axios.post(`https://upload-service-alpha.vercel.app/upload`, fd);
        const avatar = data.result[0].url;
        await this.$axios.put(`/user-details/${this.user?.details?._id}`, { avatar });
        this.notify("success", "Avatar has been changed");
        this.$emit('loadProfile');

      } catch (error) {
        this.notifyErrorMessage(error);
      } finally {
        this.loading = false;
      }
    },
  }
}
</script>
<style>
.manage-account-avatar {
  width: fit-content;
  margin: auto;
  position: relative;
}
.edit-profile {
  position: absolute;
  bottom: 15px;
  right: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.edit-profile.anticon {
  color: #fff;
}
.edit-profile:hover {
  background: rgba(0, 0, 0, 1);
}
.manage-account-form {
  margin-top: 30px;
}
.manage-account-form .ant-form-item-label {
  line-height: 20px;
}
</style>
