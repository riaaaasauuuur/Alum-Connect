<template>
  <div>
    <div class="manage-header">
      <a-icon type="left" @click="$emit('back')" />
      <div class="manage-header-title">
        <h1>{{ details.title }}</h1>
        <p>{{ details.subtitle }}</p>
      </div>
    </div>
    <br />
    <a-divider />
  </div>
</template>
<script>
export default {
  props: {
    details: {
      type: Object,
      default: {}
    }
  }
}
</script>
<style>
.manage-header .anticon{
  font-size: 25px;
  color: #000;
  z-index: 999;
}
.manage-header-title {
  position: absolute;
  width: 90%;
  left: 50%;
  top: -10px;
  transform: translateX(-50%);
  text-align: center;
}
.manage-header-title h1 {
  font-size: 30px;
  color: #000;
  font-weight: 400;
}
.manage-header-title p {
  font-size: 12px;
  color: #ccc;
  margin-top: -15px;
}
</style>
