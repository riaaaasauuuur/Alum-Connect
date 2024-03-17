<template>
  <a-row type="flex" justify="space-between">
    <a-col :xl="8" :lg="8" :md="24" :sm="24" :xs="24" align="center">
      <img src="../../assets/graduate.png" alt="Graduates">
      <div class="details">
        <a-spin :spinning="loading">
          <a-icon type="loading" slot="indicator" style="font-size: 60px;" />
          <h1 class="count">{{ graduates }}</h1>
        </a-spin>
        <div class="title">Alumni Graduates</div>
      </div>
    </a-col>
    <a-col :xl="8" :lg="8" :md="24" :sm="24" :xs="24" align="center">
      <img src="../../assets/graduate.png" alt="PUPSMB">
      <div class="details">
        <h1 class="count">2005</h1>
        <div class="title">PUPSMB</div>
      </div>
    </a-col>
    <a-col :xl="8" :lg="8" :md="24" :sm="24" :xs="24" align="center">
      <img src="../../assets/book.png" alt="Programs">
      <div class="details">
        <h1 class="count">8</h1>
        <div class="title">Academic Programs</div>
      </div>
    </a-col>
  </a-row>
</template>
<script>
export default {
  props: {
    graduates: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style>
.details {
  text-align: center;
  margin-top: -20px;
}
.details .count {
  color: #800000;
  font-weight: 300;
  font-size: 50px;
}
.details .title {
  color: #7f7f7f;
  font-weight: 300;
  font-size: 35px;
  margin-top: -20px;
}
</style>
