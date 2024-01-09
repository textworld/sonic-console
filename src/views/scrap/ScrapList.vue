<template>
  <page-view>
    <ScrapListView ref="scrapListView" :columns="scrapColumns" @change:params="onChangeParams"> </ScrapListView>
  </page-view>
</template>

<script>
import { scrapColumns } from '@/core/constant'
import ScrapListView from '@/components/Scrap/ScrapListView.vue'
import { PageView } from '@/layouts'
export default {
  name: 'ScrapList',
  components: {
    ScrapListView,
    PageView
  },
  data() {
    return { scrapColumns }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const scrapListView = vm.$refs.scrapListView
      if (to.query.page) {
        scrapListView.list.params.page = Number(to.query.page)
      }

      if (to.query.size) {
        scrapListView.list.params.size = Number(to.query.size)
      }

      scrapListView.handleScrapList()
    })
  },
  methods: {
    onChangeParams(params) {
      const path = this.$router.history.current.path
      this.$router.replace({ path, query: params }).catch(err => err)
    }
  }
}
</script>

<style scoped>
div {
  color: #002140;
}
</style>
