<template>
  <a-modal :visible="visible" @cancel="$emit('close')" :title="`View ${getRoute.split('s').join('')}`" :maskClosable="false">

    <div>
      <div class="bold">Title: </div>
      <div>{{ modalData.title }}</div>
      <br>
      <div v-if="getRoute === 'Memoriam'">
        <div class="bold">Caption: </div>
        <div>{{ modalData.caption }}</div>
        <br>
        <div class="bold">Posted By: </div>
        <div>{{ modalData.postedBy }}</div>
        <br>
      </div>
      <div v-if="getRoute === 'Jobs'">
        <div class="bold">Company: </div>
        <div>{{ modalData.company }}</div>
        <br>
        <div class="bold">Posted By: </div>
        <div>{{ modalData.postedBy }}</div>
        <br>
        <div class="bold">Other Details: </div>
        <div>{{ modalData.notes || "--" }}</div>
        <br>
      </div>
      <div class="bold">Description: </div>
      <div v-html="modalData.description" />
      <div class="bold">Date Posted: </div>
      <div>{{ formatDate(modalData.createdAt) }}</div>
      <br>
      <div v-if="getRoute === 'Job Requests'">
        <div class="bold">Document: </div>
        <div><a :href="modalData?.attachment?.url" target="_blank"><a-icon type="paper-clip" /> {{ modalData?.attachment?.fileName || "--" }}</a></div>
        <br>
      </div>
      <div class="bold">Thumbnail: </div>
      <img v-if="modalData.thumbnail?.url" :src="modalData.thumbnail.url" width="100%" height="300" style="border: 1px solid #ccc; border-radius: 5px;">
      <div v-else>N/A</div>
    </div>

    <template slot="footer">
      <a-button @click="$emit('close')">Close</a-button>
    </template>
  </a-modal>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    modalData: {
      type: Object,
      default: {}
    }
  }
}
</script>
<style>
.bold {
  font-weight: bold;
  color: #000;
  font-size: 16px;
}
</style>
