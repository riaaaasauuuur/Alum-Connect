<template>
    <a-layout id="components-layout-demo-top-side-2">
        <a-layout-header class="header">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <a-row type="flex" align="middle">
                <a-col>
                  <img src="@/assets/logo.png" height="60">
                </a-col>
                <a-col>
                  <h2 class="nav-logo-text">ADMIN<span>PANEL</span></h2>
                </a-col>
              </a-row>
              <div v-if="isSmall">
                <a-icon type="menu" class="menu-icon" @click="showMenu = true" />
              </div>
              <div v-else>
                <a-button v-if="isProfile" type="link" @click="$router.push('/app')">Switch to Dashboard</a-button>
                <!-- <a-button type="primary" size="large" shape="round">Switch to homepage</a-button> -->
              </div>
            </div>
        </a-layout-header>
        <a-layout>
            <a-layout-sider width="250" class="light" style="background: #fff;" v-model="collapsed" collapsible v-if="$breakpoints.current !== 'xs' && !isProfile">
                <a-row type="flex" justify="center" align="middle" :gutter="10" style="padding: 20px 20px 0 20px;">
                    <a-col :span="24">
                        <div class="avatar-container" v-if="!collapsed && showTitle">
                          <div class="avatar-icon">
                            <a-avatar icon="user" :size="64" v-if="!$auth.user?.details?.avatar" />
                            <a-avatar :src="$auth?.user?.details?.avatar" :size="64" v-else />
                          </div>
                          <div class="avatar-name" style="text-align: center;">
                            {{ getEmployeeName(this.$auth?.user?.details, true) }}
                          </div>
                          <!-- <div class="setting-icon">
                            <a-icon type="setting" theme="filled" />
                          </div> -->
                        </div>
                        <div style="text-align: center; margin-bottom: 20px;" v-else>
                          <a-avatar icon="user" />
                          <a-divider />
                        </div>
                    </a-col>
                    <a-col v-if="showTitle">
                    </a-col>
                </a-row>
                <br>
                <a-menu theme="light" :default-selected-keys="selectedMenu" mode="inline" @click="navigate">
                  <a-menu-item v-for="item in display1" :key="item.path">
                    <a-icon :type="item.icon" />
                    <span>{{ item.name }}</span>
                  </a-menu-item>
                  <a-sub-menu v-for="(item, index) in display2" :key="`subEventJob${index + 1}`">
                    <span slot="title">
                      <a-icon :type="item?.icon" />
                      <span>{{ item?.name }}</span>
                    </span>
                    <a-menu-item v-for="sub in item.subMenus" :key="sub?.path">
                      <span>{{ sub?.name }}</span>
                    </a-menu-item>
                  </a-sub-menu>
                  <a-menu-item v-for="item in display3" :key="item.path">
                    <a-icon :type="item.icon" />
                    <span>{{ item.name }}</span>
                  </a-menu-item>
                  <a-sub-menu v-for="(item, index) in display4" :key="`subSurvey${index + 1}`">
                    <span slot="title">
                      <a-icon :type="item?.icon" />
                      <span>{{ item?.name }}</span>
                    </span>
                    <a-menu-item v-for="sub in item.subMenus" :key="sub?.path">
                      <span>{{ sub?.name }}</span>
                    </a-menu-item>
                  </a-sub-menu>
                  <a-menu-item v-for="item in display5" :key="item.path">
                    <a-icon :type="item.icon" />
                    <span>{{ item.name }}</span>
                  </a-menu-item>
                  <a-menu-item key="/app/profile">
                    <a-icon type="user" />
                    <span>Profile</span>
                  </a-menu-item>
                  <a-menu-item key="/app/logout">
                    <a-icon type="logout" />
                    <span>Logout</span>
                  </a-menu-item>
                </a-menu>
                <div class="space"></div>
            </a-layout-sider>
            <a-layout style="padding: 24px 24px 40px 24px">
                <!-- <a-breadcrumb style="margin: 16px 0">
                    <a-breadcrumb-item v-for="(breadcrumb, index) in path" :key="index">
                        {{ breadcrumb }}
                    </a-breadcrumb-item>
                </a-breadcrumb> -->
                <a-layout-content
                    :style="{ padding: '0 0 40px 0', margin: 0, minHeight: '280px' }"
                >
                    <nuxt />
                </a-layout-content>
            </a-layout>
        </a-layout>

        <a-drawer :visible="showMenu" @close="showMenu = false" class="menu-drawer">
          <a-row type="flex" justify="center" align="middle" :gutter="10" style="padding: 20px 20px 0 20px;">
            <a-col :span="24">
              <div class="avatar-container" v-if="!collapsed && showTitle">
                <div class="avatar-icon">
                  <a-avatar icon="user" :size="64" v-if="!$auth.user?.details?.avatar" />
                  <a-avatar :src="$auth?.user?.details?.avatar" :size="64" v-else />
                </div>
                <div class="avatar-name" style="text-align: center;">
                  {{ getEmployeeName(this.$auth?.user?.details, true) }}
                </div>
              </div>
              <div style="text-align: center; margin-bottom: 20px;" v-else>
                <a-avatar icon="user" />
                <a-divider />
              </div>
            </a-col>
            <a-col v-if="showTitle">
            </a-col>
          </a-row>
          <br>
          <a-menu theme="light" :default-selected-keys="selectedMenu" mode="inline" @click="navigate">
            <a-menu-item v-for="item in display1" :key="item.path">
              <a-icon :type="item.icon" />
              <span>{{ item.name }}</span>
            </a-menu-item>
            <a-sub-menu v-for="(item, index) in display2" :key="`subEventJob${index + 1}`">
              <span slot="title">
                <a-icon :type="item?.icon" />
                <span>{{ item?.name }}</span>
              </span>
              <a-menu-item v-for="sub in item.subMenus" :key="sub?.path">
                <span>{{ sub?.name }}</span>
              </a-menu-item>
            </a-sub-menu>
            <a-menu-item v-for="item in display3" :key="item.path">
              <a-icon :type="item.icon" />
              <span>{{ item.name }}</span>
            </a-menu-item>
            <a-sub-menu v-for="(item, index) in display4" :key="`subSurvey${index + 1}`">
              <span slot="title">
                <a-icon :type="item?.icon" />
                <span>{{ item?.name }}</span>
              </span>
              <a-menu-item v-for="sub in item.subMenus" :key="sub?.path">
                <span>{{ sub?.name }}</span>
              </a-menu-item>
            </a-sub-menu>
            <a-menu-item v-for="item in display5" :key="item.path">
              <a-icon :type="item.icon" />
              <span>{{ item.name }}</span>
            </a-menu-item>
            <a-menu-item key="/app/profile">
              <a-icon type="user" />
              <span>Profile</span>
            </a-menu-item>
            <a-menu-item key="/app/logout">
              <a-icon type="logout" />
              <span>Logout</span>
            </a-menu-item>
          </a-menu>
          <div class="space"></div>
        </a-drawer>
    </a-layout>
</template>
<script>
import { ADMIN_MENU } from '../constants';
export default {
    data() {
        return {
            collapsed: false,
            showTitle: true,
            showMenu: false,
            ADMIN_MENU
        }
    },
    watch: {
        collapsed(newData, oldData) {
            if(newData === false) {
                setTimeout(() => {
                    this.showTitle = true;
                }, 200);
            } else this.showTitle = false;
        }
    },
    computed: {
        isProfile() {
          return this.$route.path === '/app/profile';
        },
        isSmall() {
          return this.$breakpoints.current === 'xs';
        },
        display1() {
            return this.ADMIN_MENU.filter((x) => x.display === 0);
        },
        display2() {
            return this.ADMIN_MENU.filter((x) => x.display === 1);
        },
        display3() {
            return this.ADMIN_MENU.filter((x) => x.display === 2);
        },
        display4() {
            return this.ADMIN_MENU.filter((x) => x.display === 3);
        },
        display5() {
            return this.ADMIN_MENU.filter((x) => x.display === 4);
        },
        scopes() {
            return this.$auth?.user?.role?.scopes;
        },
        selectedMenu(){
            return [this.$route.path];
        },
        path() {
            let path = this.$route.path.split('/').reverse()[0];
            return path === "app"
                ? ["Home"]
                : ["Home", this.ucwords(path)];
        }
    },
    methods: {
        navigate(path) {
            if(path.key === "/app/logout") {
                this.confirmation();
            } else {
                this.$router.push(path.key);
            }
        },
        async logout() {
            try {
                await this.$auth.logout();
                location.href = '/login';
            } catch (error) {
                this.$notification.error({
                    message: "Error",
                    description: error
                })
            }
        },
        confirmation() {
          this.$warning({
            title: 'Confirmation',
            content: 'Are you sure you want to log out?',
            onOk: () => {
              this.logout();
            },
          });
        }
    }
}
</script>
<style>
#components-layout-demo-top-side-2 {
    font-family: 'Poppins' sans-serif !important;
    height: 100vh;
}
.ant-layout-header {
    background: #fff !important;
    padding: 0 40px;
    line-height: 0;
    height: 60px;
    box-shadow: 0px -3px 15px 0px #ccc;
    z-index: 999;
}
.ant-layout-sider-trigger {
    background: #800008;
    color: #fff;
}
.menu-icon {
    cursor: pointer;
    font-size: 30px;
    color: #000;
}
.menu-drawer .ant-drawer-body {
    padding: 40px 0;
    overflow: hidden;
}
.input-default {
    width: 100%;
}
.ant-menu-item-selected {
    color: #163851;
}
.ant-menu-vertical .ant-menu-item::after, .ant-menu-vertical-left .ant-menu-item::after, .ant-menu-vertical-right .ant-menu-item::after, .ant-menu-inline .ant-menu-item::after {
    border-color: #800000;
}
.ant-menu-item:hover {
    color: #163851;
}
.nav-logo-text {
    color: #000;
    font-weight: 300;
    margin-top: 8px;
}
.nav-logo-text span {
  color: #800000 !important;
}
.avatar-container {
  width: 100%;
  border-radius: 20px;
  background: #a04040;
  padding: 15px;
}
.avatar-icon {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar-name {
  text-align: center;
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  margin-top: 8px;
}
.setting-icon .anticon {
    color: #fff;
    position: absolute;
    right: 15px;
    top: 15px;
    font-size: 20px;
}
.dashboard-banner {
  position: relative;
  height: 150px;
  /* display: flex; */
  /* justify-content: center;
  flex-direction: column;
  align-items: center; */
  text-align: center;
  border-radius: 20px;
}
.dashboard-banner::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(160, 27, 27, 0.5);
  border-radius: 20px;
}
.dashboard-banner {
  background: url("@/assets/dashboard-banner.png") center/cover no-repeat;
}
.dashboard-banner h1 {
  color: #fff;
  font-size: 40px;
  font-weight: 600;
  z-index: 999;
  position: relative;
}
.dashboard-banner p {
  color: #fff;
  font-size: 18px;
  font-weight: 300;
  z-index: 999;
  position: relative;
  line-height: 0;
}
.space {
  /* padding-bottom: 100px; */
}
@media screen and (max-width: 871px) {
  .dashboard-banner h1 {
    font-size: 30px;
  }
}
@media screen and (max-width: 660px) {
  .dashboard-banner h1 {
    font-size: 25px;
  }
}
</style>
