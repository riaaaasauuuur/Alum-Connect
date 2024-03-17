<template>
  <div>
    <a-row>
      <a-col :span="8">
        <a-button icon="plus" size="large" shape="round" @click="showViewAlumni">{{ $breakpoints.sMd ? '' : 'Add' }}</a-button>
      </a-col>
      <a-col :span="8">
        <a-upload
          name="file"
          :multiple="false"
          :beforeUpload="beforeUpload"
          class="importUploader"
        >
          <a-button icon="upload" size="large" shape="round" :loading="loading">{{ $breakpoints.sMd ? '' : 'Import' }}</a-button>
        </a-upload>
      </a-col>
      <a-col :span="8">
        <a-button icon="download" size="large" shape="round" @click="$emit('download')" :loading="downloadLoading">{{ $breakpoints.sMd ? '' : 'Download' }}</a-button>
      </a-col>
      <!-- <a-col :span="6">
        <a-button icon="printer" size="large" shape="round">Print</a-button>
      </a-col> -->
    </a-row>

    <!-- result modal -->
    <a-modal title="Uploaded Record" :maskClosable="false" :visible="showResultModal" @cancel="showResultModal = false" :width="600">

      <a-table :columns="resultColumns" :dataSource="resultData" size="small">
        <template slot="name" slot-scope="rec">
          {{ getEmployeeName(rec) }}
        </template>
      </a-table>

      <template slot="footer">
        <a-button @click="showResultModal = false">Close</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
export default {
  props: {
    downloadLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showAddModal: false,
      alumniForm: {},
      file: {},
      loading: false,
      resultData: [],
      showResultModal: false,
      resultColumns: [
        { title: "Student ID", dataIndex: "uniqueId", key: "uniqueId" },
        { title: "Name", key: "name", scopedSlots: { customRender: "name" } }
      ]
    }
  },
  methods: {
    showViewAlumni() {
      this.$emit('showAddAlumni');
    },
    beforeUpload(file) {
      if(file.type !== 'text/csv') {
        return this.notify("warning", "Please upload CSV file only");
      }
      this.file = file;
      this.$confirm({
        title: 'Confirmation',
        content: `Upload ${this.file.name}?`,
        okText: "Yes",
        cancelText: "No",
        onOk: () => this.uploadFiles(),
        onCancel: () => {
          this.file = {};
          return null;
        }
      });
      return false;
    },
    async uploadFiles() {
      try {
        this.loading = false;

        let fd = new FormData();
        fd.append('attachment', this.file);
        let { data } = await this.$axios.post(`/user-details/import-alumni`, fd);
        if(!data.data.length) return this.notify("error", "There was a problem in the file, either invalid rows or already exists.");
        else {
          this.resultData = data.data;
          this.showResultModal = true;
        }
        this.notify("success", "Record has been inserted successfully");
      } catch (error) {
        this.notifyErrorMessage(error);
      } finally {
        this.loading = false;
        this.$emit('reload');
      }
    }
  }
}
</script>
<style>
.importUploader .ant-upload-list-item {
  display: none;
}
</style>
