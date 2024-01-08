<template>
  <div>
    <a-card :bodyStyle="{ padding: '16px' }" :bordered="false">
      <div>
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item label="关键词：">
                <a-input v-model="list.params.key_word" @keyup.enter="handleQuery()" />
              </a-form-item>
            </a-col>

            <a-col :md="6" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-space>
                  <a-button type="primary" @click="handleQuery()">查询</a-button>
                  <a-button @click="handleResetParam()">重置</a-button>
                </a-space>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <a-table :columns="columns" :dataSource="list.data" :pagination="false">
        <template #action="text, page">
          <a-button @click="handleEditClick(page)"> 编辑 </a-button>
        </template>
      </a-table>

      <div class="page-wrapper">
        <a-pagination
          :current="pagination.page"
          :defaultPageSize="pagination.size"
          :pageSizeOptions="['5', '10', '20', '50', '100']"
          :total="pagination.total"
          class="pagination"
          showLessItems
          showSizeChanger
          @change="handlePageChange"
          @showSizeChange="handlePageSizeChange"
        />
      </div>
    </a-card>

    <ScrapEditModal
      :visible.sync="pageEditVisible"
      :page="list.selected"
      :savedCallback="onPageSaveCallback"
    ></ScrapEditModal>
  </div>
</template>
<script>
import apiClient from '@/api/admin-api'
import ScrapEditModal from '@/components/Scrap/ScrapEditModal.vue'
export default {
  name: 'ScrapListView',
  components: { ScrapEditModal },
  props: {
    columns: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    pagination() {
      return {
        page: this.list.params.page + 1,
        size: this.list.params.size,
        total: this.list.total
      }
    },
    selectPreviousButtonDisabled() {
      const index = this.list.data.findIndex(post => post.id === this.list.selected.id)
      return index === 0 && !this.list.hasPrevious
    },
    selectNextButtonDisabled() {
      const index = this.list.data.findIndex(post => post.id === this.list.selected.id)
      return index === this.list.data.length - 1 && !this.list.hasNext
    }
  },
  data() {
    return {
      list: {
        params: {
          page: 1,
          size: 10,
          key_word: ''
        },
        total: 0,
        hasPrevious: false,
        hasNext: false,
        loading: false,
        data: [],
        selected: {}
      },
      pageEditVisible: false,

      selectedRowKeys: []
    }
  },
  methods: {
    async handleScrapList() {
      try {
        const response = await apiClient.scrap.list(this.list.params)
        console.log(response)
        this.list.data = response.data.content
        this.list.hasNext = response.data.hasNext
        this.list.hasPrevious = response.data.hasPrevious
        this.list.total = response.data.total
      } catch (e) {
        this.$log.error('Failed to change post status', e)
      } finally {
        this.list.loading = false
      }
    },
    handleEditClick(page) {
      console.log('handlerEditClick', page)
      this.list.selected = page
      this.pageEditVisible = true
    },
    onPageSaveCallback() {
      this.handleScrapList()
    },
    /**
     * Handle page change
     */
    handlePageChange(page = 1) {
      console.log('handlePageChange')
      this.list.params.page = page - 1
      this.handleScrapList()
    },

    /**
     * Handle page size change
     */
    handlePageSizeChange(current, size) {
      console.log('handlePageSizeChange')
      this.$log.debug(`Current: ${current}, PageSize: ${size}`)
      this.list.params.page = 1
      this.list.params.size = size
      this.handleScrapList()
    },

    handleQuery() {
      this.handlePageChange(1)
    },
    handleResetParam() {
      this.list.params.key_word = undefined
      this.handlePageChange(1)
    }
  }
}
</script>

<style scoped></style>
