<template>
  <div>
    <div class="navbar">
      <div class="logo">
        <img src="@/assets/logo.png" alt="Logo">
        <h1>ALUM<span>CONNECT</span></h1>
      </div>
      <div class="navlist" v-if="$breakpoints.width > 1081">
        <Navlist :menus="ALUMNI_MENU" @navigate="navigate" />
      </div>
      <div class="alumni-nav-menu" v-else>
        <a-icon type="menu" style="color: #000; font-size: 30px;" @click="showNavlist = true" v-if="!showNavlist" />
        <div class="alumni-navlist-block" v-if="showNavlist">
          <a-icon type="close" class="alumni-navlist-block-close-icon" style="color: #fff; font-size: 30px;" @click="showNavlist = false" v-if="showNavlist" />
          <Navlist :menus="ALUMNI_MENU" @navigate="navigate" />
        </div>
      </div>
    </div>
    <a-spin :spinning="loading">
      <a-icon slot="indicator" type="loading" style="font-size: 100px;" />
      <nuxt />
    </a-spin>
    <div class="footer">
      <a-row type="flex" :justify="$breakpoints.width <= 1230 ? 'center' : 'space-between'">
        <a-col :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
          <img src="@/assets/PUPSMBAAI.png" alt="">
        </a-col>
        <a-col :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
          <a-row type="flex" justify="center">
            <a-col :span="24" :align="$breakpoints.width <= 1230 && 'center'">
              <div style="width: 400px">
                <h2>ALUMNI ASSOCIATION, INC.</h2>
                <h4>Km. 39, Sitio Gulod, Brgy. Pulong Buhangin, Santa Maria, Bulacan 3022</h4>
              </div>
            </a-col>
            <a-col :span="24">
              <h2>EMAIL</h2>
              <h4 style="text-decoration: underline;">info@pupsmbaai.com</h4>
            </a-col>
          </a-row>
        </a-col>
        <a-col :xl="8" :lg="8" :md="24" :sm="24" :xs="24">
          <a-col :span="24">
              <h2>CONTACT NUMBER</h2>
              <h4>(004) 309 - 4026</h4>
            </a-col>
            <a-col :span="24">
              <br>
              <h2>VISIT US ON:</h2>
              <a-row type="flex" :gutter="15" class="socials-footer" :justify="$breakpoints.width <= 1230 && 'center'">
                <a-col>
                  <a-icon type="facebook" />
                </a-col>
                <a-col>
                  <a-icon type="twitter" />
                </a-col>
                <a-col>
                  <a-icon type="linkedin" />
                </a-col>
              </a-row>
            </a-col>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
import { ALUMNI_MENU } from "../constants";
import Navlist from "../components/Alumni/Navlist.vue";
export default {
  components: { Navlist },
  data() {
    return {
      ALUMNI_MENU,
      loading: false,
      showNavlist: false,
      userAnsweredSurveys: [],
      surveys: []
    }
  },
  methods: {
    navigate(path) {
      this.$router.push(path.key);
    }
  },
  computed: {
    activeSurveys() {
      return this.surveys.filter(x => {
        return this.$moment(x.expiryDate).isAfter(this.$moment());
      });
    },
    userAnsweredAllSurveys() {
      const activeSurveyIds = this.activeSurveys.map((survey) => survey._id);
      return activeSurveyIds.every((surveyId) =>
        this.userAnsweredSurveys.includes(surveyId)
      );
    },
  },
  async beforeMount() {
    try {

      let isEmployed = this.$auth.user?.details?.isEmployed;
      if(isEmployed === null) {
        return this.$router.push('/alumni/additional-information');
      }

      this.loading = true;
      let { data } = await this.$axios.get(`/surveys?paginate=false&includes=surveyAnswers`);
      this.surveys = data.rows;

      this.userAnsweredSurveys = data.rows
      .flatMap((survey) => {
        return survey.surveyAnswers.filter((answer) => {
          return answer.alumniId === this.$auth.user.details._id;
        }).map((answer) => {
          return answer.surveyId;
        });
      }).filter((surveyId, index, self) => {
        return self.indexOf(surveyId) === index;
      });

      if(!this.userAnsweredAllSurveys) {
        this.$router.push('/alumni/surveys');
      }

    } catch (error) {
      this.notifyErrorMessage(error);
    } finally {
      this.loading = false;
    }
  }
}
</script>
<style>
.navbar {
  width: 100%;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.navbar .logo {
  display: flex;
  align-items: center;
}
.navbar .logo img {
  width: 100px;
}
.navbar .logo h1 {
  margin-left: -10px;
  margin-top: 8px;
  font-weight: 300;
}
.navbar .logo span {
  color: rgba(128, 0, 0, 0.75);
}
.navlist ul {
  margin-right: 30px;
  margin-top: 8px;
  display: flex;
  gap: 40px;
}
.navlist ul li {
  font-size: 19px;
  font-weight: 300;
  list-style: none;
}
.userIcon {
  color: #000;
}
.navlist  ul li a {
  color: #000;
}
.navlist ul li .ant-dropdown-link {
  color: #800000 !important;
}
.alumni-navlist-block ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 100%;
  list-style: none;
}
.alumni-navlist-block ul li {
  font-size: 25px;
}
.alumni-navlist-block ul li a {
  color: #fff;
}
.alumni-navlist-block .anticon {
  color: #fff;
}
.footer {
  box-shadow: inset 0px 0px 10px rgba(0,0,0,0.5);
  padding: 40px 50px;
}
.footer h2 {
  font-size: 30px;
  color: #800000;
  font-weight: bold;
}
.footer h4 {
  color: #000;
  font-size: 25px;
  font-weight: 300;
  margin-top: -10px;
}
.socials-footer .anticon {
  font-size: 40px;
  color: #000;
}
.alumni-nav-menu {
  margin-right: 20px;
}
.alumni-navlist-block {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background: #570000;
  z-index: 999;
}
.alumni-navlist-block-close-icon {
  position: fixed;
  top: 20px;
  right: 20px;
}
@media screen and (max-width: 1230px) {
  .footer {
    padding: 40px 20px;
    text-align: center;
    /* margin: auto; */
  }
}
</style>

