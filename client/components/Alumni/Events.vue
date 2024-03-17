<template>
  <div>
    <h1><a-icon type="calendar" /> Events</h1>
    <a-spin :spinning="loading">
      <a-icon slot="indicator" type="loading" style="font-size: 60px;" />
      <a-row type="flex" :gutter="[20, 20]" v-if="events.length > 0">
        <a-col v-for="event in events" :key="event._id" :xl="24 / (events.length < 4 ? 4 : events.length)" :lg="24 / (events.length < 4 ? 2 : events.length)" :md="12" :sm="24" :xs="24">
          <a-card class="event-cards">
            <img
              slot="cover"
              :alt="event.title"
              :src="event.thumbnail.url"
            />
            <div class="card-body">
              <h1>{{ event.title }}</h1>
              <div class="white-divider"></div>
              <div class="posted">
                <h5><a-icon type="schedule" /> Posted {{ formatDate($moment(event.createdAt)) }}</h5>
                <span style="cursor: pointer;" @click="$router.push({ name: 'alumni-view', query: { eventId: event._id } })">Read more <a-icon type="form" /></span>
              </div>
            </div>
          </a-card>
        </a-col>
      </a-row>
      <a-empty v-else />
    </a-spin>
    <br>
    <a-row type="flex" justify="end">
      <a-button type="primary" size="large" @click="$router.push('/alumni/events')">SHOW MORE</a-button>
    </a-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      events: []
    }
  },
  beforeMount() {
    this.loadEvents();
  },
  methods: {
    async loadEvents() {
      try {
        this.loading = true;
        let { data } = await this.$axios.get(`/events?limit=4&search=isActive:true`);
        this.events = data.rows;
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
.events {
  padding: 0 60px;
}
.events h1 {
  font-size: 40px;
  color: #000;
}
.event-cards {
  border-radius: 10px;
}
.event-cards:hover {
  transform: scale(1.03);
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
}
</style>
