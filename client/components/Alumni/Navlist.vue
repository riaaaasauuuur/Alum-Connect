<template>
  <ul>
    <li v-for="(menu, index) in menus" :key="index">
      <a v-if="menu?.path" @click="$router.push(menu?.path)" :class="$route.path === menu?.path && 'ant-dropdown-link'">
        {{ menu.name }}
      </a>
      <a-dropdown v-else>
        <a :class="(menu.subMenus || []).includes($route.path) && 'ant-dropdown-link'">
          {{ menu.name }} <a-icon type="down" />
        </a>
        <a-menu slot="overlay" @click="navigate">
          <a-menu-item v-for="subMenu in menu.subMenus" :key="subMenu.path">
            <a>{{ subMenu.name }}</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </li>
    <li>
      <a-dropdown>
        <a>
          <a-icon type="user" class="userIcon" />
        </a>
        <a-menu slot="overlay" @click="navigate">
          <a-menu-item key="/alumni/account">
            <a-icon type="setting" /> Manage Account
          </a-menu-item>
          <a-menu-item key="/alumni/notifications">
            <a-icon type="bell" /> Notifications
          </a-menu-item>
          <a-menu-item key="/alumni/logout">
            <a-icon type="logout" /> Logout
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    menus: {
      type: Array,
      required: true,
      default: []
    }
  },
  methods: {
    async navigate(path) {
      if(path.key === '/alumni/logout') {
        return this.$warning({
          title: 'Confirmation',
          content: 'Are you sure you want to log out?',
          onOk: async () => {
            await this.$auth.logout();
            location.href = '/login';
          },
        });
      }
      this.$emit('navigate', path);
    }
  }
}
</script>
