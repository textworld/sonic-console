<template>
  <a-modal v-model="modalVisible" :width="680">
    <template #title>
      {{ modalTitle }}
    </template>

    <div class="card-container">
      <a-form labelAlign="left" :label-col="form.labelCol" :wrapper-col="form.wrapperCol">
        <a-form-item label="文章标题">
          <a-input v-model="form.model.title" />
        </a-form-item>
      </a-form>
    </div>

    <template #footer>
      <slot name="extraFooter" />
      <ReactiveButton
        :errored="form.saveError"
        :loading="form.saving"
        text="保存"
        erroredText="保存失败"
        loadedText="保存成功"
        type="danger"
        @callback="handleSavedCallback()"
        @click="handleSavePage()"
      ></ReactiveButton>
      <a-button :disabled="loading" @click="modalVisible = false">关闭</a-button>
    </template>
  </a-modal>
</template>

<script>
import apiClient from '@/api/admin-api'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    page: {
      type: Object,
      default: () => ({})
    },
    savedCallback: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      form: {
        model: {},
        saving: false,
        saveError: false,
        labelCol: { sm: { span: 4 }, xs: { span: 24 } },
        wrapperCol: { sm: { span: 20 }, xs: { span: 24 } }
      }
    }
  },
  computed: {
    modalVisible: {
      get() {
        return this.visible
      },
      set(value) {
        this.$emit('update:visible', value)
      }
    },
    modalTitle() {
      return '爬取信息修改'
    }
  },
  watch: {
    modalVisible(value) {
      if (value) {
        this.form.model = Object.assign({}, this.page)
      }
    },
    post: {
      deep: true,
      handler(value) {
        this.form.model = Object.assign({}, value)
      }
    }
  },
  methods: {
    async handleSavePage() {
      try {
        this.form.saving = true

        console.log('handleSavePage')
        await apiClient.scrap.update(this.form.model.id, this.form.model)
      } catch (e) {
        this.$log.error('Failed to save page', e)
      } finally {
        setTimeout(() => {
          this.form.saving = false
        }, 400)
      }
    },
    handleSavedCallback() {
      console.log('handleSavedCallback')
      if (this.form.saveError) {
        this.form.saveError = false
      } else {
        this.savedCallback && this.savedCallback()
      }
    }
  }
}
</script>
