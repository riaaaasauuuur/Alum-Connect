<template>
  <div>
    <h1><a-icon type="inbox" /> Active Job Post</h1>
    <a-spin :spinning="loading">
      <a-icon slot="indicator" type="loading" style="font-size: 60px;" />
      <a-row type="flex" :gutter="[20, 20]" v-if="jobs.length > 0">
        <a-col v-for="job in jobs" :key="job._id" :xl="24 / 3" :lg="24 / 3" :md="12" :sm="12" :xs="24">
          <a-card class="job-post-cards">
            <template slot="title">
              <h1 style="line-height: 0; margin-top: 10px;">{{ job.title }}</h1>
            </template>
            <template slot="extra">
                <a-tag :color="job.jobType === 'FULL_TIME' ? 'red' : 'green'">{{ job.jobType.split("_").join("-") }}</a-tag>
            </template>
            <div class="job-title">
              {{ job.company }}
            </div>
            <div class="posted-date">
              <a-icon type="calendar" /> Posted {{ $moment(job.createdAt).fromNow() }}
            </div>
          </a-card>
        </a-col>
      </a-row>
      <a-empty v-else />
    </a-spin>
    <br>
    <a-row type="flex" justify="end" v-if="jobs.length">
      <a-button type="primary" size="large" @click="$router.push('/alumni/jobs')">SHOW MORE</a-button>
    </a-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      jobs: []
    }
  },
  beforeMount() {
    this.loadJobs();
  },
  methods: {
    async loadJobs() {
      try {
        this.loading = true;
        let { data } = await this.$axios.get(`/jobs?limit=4&page=1&search=isActive:true`);
        this.jobs = data.rows.filter(x => {
          return x.status === 'ACTIVE';
        });
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
.job-posting h1 {
  font-size: 40px;
  color: #000;
}
.job-post-cards {
  border-radius: 10px;
  box-shadow: 0px 0px 15px 0px #e4e4e4;
}
.job-post-cards:hover {
  transform: scale(1.05);
}
.job-post-cards h1 {
  font-weight: 300;
  color: #000;
  font-size: 25px;
}
.job-title {
  font-size: 20px;
  color: #000;
  font-weight: 500;
}
.posted-date {
  margin-top: 10px;
  color: #939393;
  font-size: 18px;
}
/* .event-cards {
  border-radius: 10px;
}
.event-cards img {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 300px;
}
.event-cards .ant-card-body {
  padding: 0;
  background: #800000;
}
.card-body {
  padding: 24px;
}
.card-body h1 {
  font-weight: 300;
  color: #fff;
  font-size: 30px;
}
.white-divider {
  height: 1px;
  background: #fff;
  width: 100%;
  margin: 20px 0;
}
.posted h5 {
  color: #fff;
  font-size: 16px;
  font-weight: 300;
}
.posted span {
  color: #fff;
} */
</style>
