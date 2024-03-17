<template>
  <div>
    <div class="main-header">
      <div class="main-header-avatar">
        <a-avatar :size="100" v-if="user?.details?.avatar" :src="user?.details?.avatar" />
        <a-avatar :size="100" v-else icon="user" />
      </div>
      <div class="main-header-info">
        <h1>Welcome, {{ user?.details?.firstName }}</h1>
        <p>Manage admin accounts</p>
      </div>
    </div>
    <a-divider />
    <a-row :gutter="[10, 10]">
      <a-col :span="24">
        <a-button type="primary" block shape="round" size="large" icon="user" @click="$emit('showManageAccount')">Manage My Account</a-button>
      </a-col>
      <a-col :span="24">
        <a-button type="primary" block shape="round" size="large" icon="lock" @click="$emit('showChangePassword')">Change Password</a-button>
      </a-col>
      <a-col :span="24">
        <a-button type="primary" block shape="round" size="large" icon="team" @click="$emit('showManageAdmin')">Manage Admin Accounts</a-button>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      default: {}
    }
  }
}
</script>
<style>
.main-header {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}
.main-header-info h1 {
  font-size: 23px;
  font-weight: 600;
  margin-top: 8px;
}
.main-header-info p {
  margin-top: -15px;
  font-size: 12px;
  color: #ccc;
}
</style>
