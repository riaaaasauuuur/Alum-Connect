<template>
  <a-row type="flex" justify="space-between" align="middle" :gutter="[10, 10]">
    <a-col :xl="12" :lg="12" :md="16" :sm="24" :xs="24">
      <a-row type="flex" :gutter="[10, 10]">
        <a-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link">
              <a-button type="primary" icon="setting" shape="round">Manage <a-icon type="down" /></a-button>
            </a>
            <a-menu slot="overlay" @click="getSelected">
              <a-menu-item key="course">
                <a>Add Course</a>
              </a-menu-item>
              <a-menu-item key="batch">
                <a>Add Batch</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </a-col>
        <a-col :sm="12" :xs="12">
          <a-button @click="showOptions">Column Visibility <a-icon type="down" /></a-button>
          <a-card v-show="visible" class="options">
            <a-row>
              <a-col :span="24" v-for="(column, index) in filteredColumns" :key="index">
                <a-row type="flex" align="middle">
                  <a-col :span="20">
                    <div style="margin: 5px 0; cursor: pointer;">{{ column.title }}</div>
                  </a-col>
                  <a-col align="right" :span="4">
                    <a-checkbox :checked="column.isShow" @change="onCheckChange(index)" />
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
    </a-col>
    <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24" align="right">
      <a-button @click="showFilters = !showFilters" type="primary" icon="search">Toggle Filters <a-icon type="down" /></a-button>
      <div class="filters" v-if="showFilters">
        <a-row :gutter="[10, 10]" justify="end">
          <a-col :span="24">
            <a-input-search v-model="filter.name" placeholder="Search by Name or Student ID.." @change="$emit('change', { value: filter.name, type: 'name' })" />
          </a-col>
          <a-col :span="24">
            <a-select class="input-default" placeholder="Search by Batch" v-model="filter.batch" allowClear @change="$emit('change', { value: filter.batch, type: 'batch' })">
              <a-select-option v-for="batch in sortedBatches" :key="batch.year">
                {{ batch.year }}
              </a-select-option>
            </a-select>
          </a-col>
          <a-col :span="24">
            <a-select class="input-default" placeholder="Search by Course" v-model="filter.course" allowClear @change="$emit('change', { value: filter.course, type: 'course' })">
              <a-select-option v-for="course in searchables.courses" :key="course.code">
                {{ course.code }}
              </a-select-option>
            </a-select>
          </a-col>
          <a-col :span="24">
            <a-select class="input-default" v-model="filter.honor" allowClear placeholder="Search by Latin Honors.." @change="$emit('change', { value: filter.honor, type: 'honor' })">
              <a-select-option key="CUM_LAUDE">Cum Laude</a-select-option>
              <a-select-option key="MAGNA_CUM_LAUDE">Magna Cum Laude</a-select-option>
              <a-select-option key="SUMMA_CUM_LAUDE">Summa Cum Laude</a-select-option>
            </a-select>
          </a-col>
          <a-col :span="24">
            <a-select class="input-default" v-model="filter.board" allowClear placeholder="Search if Board Passer or not.." @change="$emit('change', { value: filter.board, type: 'board' })">
              <a-select-option :key="true">Yes</a-select-option>
              <a-select-option :key="false">No</a-select-option>
            </a-select>
          </a-col>
        </a-row>
      </div>
    </a-col>
  </a-row>
</template>
<script>
export default {
  props: {
    columns: {
      type: Array,
      default: []
    },
    filter: {
      type: Object,
      default: {}
    },
    searchables: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      visible: false,
      showFilters: false
    }
  },
  computed: {
    filteredColumns() {
      return this.columns.filter(x => x.key !== 'action');
    },
    sortedBatches() {
      return this.searchables.batches.sort((a, b) => b.year - a.year);
    }
  },
  methods: {
    showOptions() {
      this.visible = !this.visible;
    },
    onCheckChange(index) {
      const columnIndex = this.columns.findIndex((_, i) => i === index);
      this.columns[columnIndex].isShow = !this.columns[columnIndex].isShow;
    },
    getSelected(value) {
      this.$emit('select', value.key);
    }
  }
}
</script>
<style>
.options {
  position: absolute;
  left: 10px;
  width: 220px;
  z-index: 999;
  box-shadow: 0px 0px 15px 0px #ccc;
}
.options .ant-card-body {
  padding: 5px 15px;
}
.filters {
  padding: 15px;
  background: #fff;
  width: 400px;
  box-shadow: 0px 0px 15px 0px #ccc;
  position: absolute;
  z-index: 999;
  right: 0;
  border-radius: 5px;
}
</style>
