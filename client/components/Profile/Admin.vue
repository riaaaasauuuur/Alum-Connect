<template>
  <a-spin :spinning="loading">
    <a-icon slot="indicator" type="loading" style="font-size: 40px;" />
    <CommonProfileHeader @back="$emit('back')" :details="header" />
    <a-list :data-source="admins" bordered>
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-list-item-meta :description="item.email">
          <a slot="title">{{ getEmployeeName(item.details, true) }} {{ item._id === $auth.user._id ? '(Me)' : '' }}</a>
          <a-avatar
            :size="45"
            slot="avatar"
            v-if="item.details?.avatar"
            :src="item.details?.avatar"
          />
          <a-avatar :size="45" slot="avatar" v-else icon="user" />
        </a-list-item-meta>
        <a-dropdown :trigger="['click']" v-if="item._id !== $auth.user._id">
          <a class="ant-dropdown-link">
            <a-icon type="more" style="font-size: 20px;" />
          </a>
          <a-menu slot="overlay" @click="getSelected">
            <a-menu-item key="course">
              <a-button type="link" icon="delete" size="small" @click="removeAdmin(item)">Remove</a-button>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-list-item>
    </a-list>
    <br>
    <a-button type="primary" shape="round" block icon="user" @click="$emit('showAddAdmin')">Add New Account</a-button>


  </a-spin>
</template>
<script>
export default {
  props: {
    flag: {
      type: Number,
      default: 0
    },
    user: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      header: { title: "Manage Admin Accounts", subtitle: "Add or Remove Admin Users" },
      loading: false,
      admins: []
    }
  },
  watch: {
    flag(oldVal, newVal) {
      if(oldVal !== newVal) {
        this.loadAdmins();
      }
    }
  },
  beforeMount() {
    this.loadAdmins();
  },
  methods: {
    async removeAdmin(rec) {
      const submit = async() => {
        try {
          this.loading = true;
          await this.$axios.put(`/users/${rec._id}`, { isActive: false });
          this.notify("success", `${this.getEmployeeName(rec.details, true)} has been removed`);
          await this.loadAdmins();
        } catch (error) {
          this.notifyErrorMessage(error);
        } finally {
          this.loading = false;
        }
      }
      this.$warning({
        title: 'Confirmation',
        content: `Are you sure you want to delete ${this.getEmployeeName(rec.details, true)}?`,
        onOk: async () => {
          await submit();
        },
      });
    },
    async loadAdmins() {
      try {
        this.loading = true;
        let { data } = await this.$axios.get(`/users?paginate=false&search=accountType:ADMIN&includes=details`);
        this.admins = data.rows.filter(x => x.isActive);
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

</style>
