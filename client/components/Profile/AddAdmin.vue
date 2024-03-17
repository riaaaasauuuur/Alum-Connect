<template>
  <a-spin :spinning="loading">
    <a-icon slot="indicator" type="loading" style="font-size: 40px;" />
    <CommonProfileHeader @back="$emit('back')" :details="header" />
    <div class="add-admin-form">
      <a-form-model :model="form" ref="form" :rules="rules">
        <a-row type="flex" :gutter="10">
          <a-col :span="12">
            <a-form-model-item label="First Name" prop="details.firstName">
              <a-input v-model="form.details.firstName" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="Middle Name">
              <a-input v-model="form.details.middleName" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="Last Name" prop="details.lastName">
              <a-input v-model="form.details.lastName" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="Suffix">
              <a-input v-model="form.details.suffix" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="Email" prop="email">
              <a-input v-model="form.email" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="New Password" prop="password">
              <a-input-password v-model="form.password" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="Confirm Password" prop="confirmPassword">
              <a-input-password v-model="form.confirmPassword" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-button type="primary" size="large" block shape="round" @click="validate">Submit</a-button>
      </a-form-model>
    </div>
  </a-spin>
</template>
<script>
export default {
  data() {
    return {
      header: { title: "New Admin Account", subtitle: "Fill the required Details to create account" },
      loading: false,
      form: { details: {} }
    }
  },
  computed: {
    rules() {
      let rules =  this.ruleSetter(['details.firstName', 'details.lastName', 'password', 'confirmPassword']);
      Object.assign(rules, {
        email: [{ required: true, type: "email", message: "Invalid email address", trigger: "change" }]
      });
      return rules;
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
        this.loading = true;
        await this.$axios.post(`/user-details/create-admin`, this.form);
        this.notify("success", "Admin added successfully");
        this.$emit('back');
        this.$emit('loadAdmin', true);
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
.add-admin-form .ant-form-item-label {
  line-height: 20px;
}
</style>
