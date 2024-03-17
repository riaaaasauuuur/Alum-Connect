<template>
  <a-spin :spinning="loading">
    <a-icon slot="indicator" type="loading" style="font-size: 40px;" />
    <CommonProfileHeader @back="$emit('back')" :details="header" />
    <div class="change-password-form">
      <a-form-model :model="form" ref="form" :rules="rules">
        <a-form-model-item label="Old Password" prop="oldPassword">
          <a-input-password v-model="form.oldPassword" />
        </a-form-model-item>
        <a-form-model-item label="New Password" prop="password">
          <a-input-password v-model="form.password" />
        </a-form-model-item>
        <a-form-model-item label="Confirm Password" prop="confirmPassword">
          <a-input-password v-model="form.confirmPassword" />
        </a-form-model-item>
        <a-button type="primary" size="large" block shape="round" icon="save" :loading="loading" @click="validate">Save Changes</a-button>
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
      header: { title: "Change Password", subtitle: "Choose a strong password and don’t reuse it for other accounts" },
      form: {},
      loading: false
    }
  },
  computed: {
    rules() {
      return this.ruleSetter(['oldPassword', 'password', 'confirmPassword']);
    }
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

        if(this.form.password !== this.form.confirmPassword) {
          return this.notify("error", "Password doesn't match");
        }

        this.loading = true;
        let { data } = await this.$axios.put(`/users/change-password/${this.user._id}`, this.form);
        if(data.data.message) {
          return this.notify("error", data.data.message);
        }
        this.$emit('back');
        this.$emit('loadProfile');
        this.notify("success", "Password has been changed");
      } catch (error) {
        this.notifyErrorMessage(error);
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>
<style>
.change-password-form {
  margin-top: 30px;
}
.change-password-form .ant-form-item-label {
  line-height: 20px;
}
</style>
