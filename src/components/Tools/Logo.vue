<template>
  <div class="logo">
    <img
      :style="{ width: sidebarOpened ? '64px' : '48px' }"
      alt="Sonic Logo"
      class="select-none cursor-pointer hover:brightness-125 transition-all"
      src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI3LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9Il/lm77lsYJfMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiCgkgdmlld0JveD0iMCAwIDYxMC42IDE1MS4xIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA2MTAuNiAxNTEuMTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNGRkZGRkY7fQo8L3N0eWxlPgo8ZyBpZD0iX+WbvuWxgl8xLTIiPgoJPGc+CgkJPGc+CgkJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik03OSwxMTIuNGMwLjktNi0wLjQtMTAuNC0zLjgtMTMuNHMtMTAuMS02LjItMjAtOS45QzM3LjcsODMuNCwyNC43LDc2LjYsMTYsNjguN1MzLjksNTAuOSw1LjcsMzguOQoJCQkJYzEuOC0xMiw4LjItMjEuNSwxOS0yOC41QzM1LjYsMy41LDQ4LjcsMCw2NCwwYzE2LjcsMCwyOS44LDQsMzkuMiwxMmM5LjUsOCwxMywxOSwxMC42LDMzbC0wLjIsMC42SDgwLjUKCQkJCWMwLjgtNS44LTAuNy0xMC41LTQuNS0xNGMtMy44LTMuNi05LjEtNS40LTE1LjktNS40Yy01LDAtOS41LDEuMi0xMy40LDMuNmMtNCwyLjQtNi4yLDUuNC02LjgsOC45Yy0wLjgsNS41LDAuNyw5LjUsNC41LDEyLjIKCQkJCXMxMiw2LjIsMjQuNCwxMC42YzE1LjksNS4yLDI3LjcsMTEuNywzNS40LDE5LjdjNy43LDcuOSwxMC43LDE4LjMsOC44LDMxYy0xLjksMTIuNi04LjMsMjIuMi0xOC45LDI4LjkKCQkJCWMtMTAuNyw2LjctMjMuOSwxMC0zOS42LDEwcy0yOS44LTMuNy00MS0xMXMtMTUuNS0xOC43LTEyLjgtMzRsMC4yLTAuNmgzMy4xYy0xLjEsNy4yLDAuOCwxMi4yLDUuOSwxNS4xczExLjIsNC4zLDE4LjUsNC4zCgkJCQljNSwwLDkuNS0xLjIsMTMuNi0zLjZTNzguNCwxMTYsNzksMTEyLjRMNzksMTEyLjR6Ii8+CgkJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yNTQuMSw4OC44Yy0yLjksMTguOC0xMC45LDMzLjktMjMuOSw0NS4zcy0yOC45LDE3LjEtNDcuNiwxNy4xcy0zMS45LTUuOS00Mi4xLTE3LjhzLTEzLjktMjYuNy0xMS4xLTQ0LjUKCQkJCWwzLjktMjYuNGMyLjgtMTguNywxMC43LTMzLjgsMjMuOS00NS4yQzE3MC4zLDUuNywxODYuMiwwLDIwNS4xLDBjMTcuOCwwLDMxLjcsNS45LDQxLjgsMTcuOHMxMy44LDI2LjcsMTEuMiw0NC41TDI1NC4xLDg4LjgKCQkJCUwyNTQuMSw4OC44eiBNMjI0LDYyLjFjMS42LTEwLjksMC41LTE5LjYtMy40LTI2LjFzLTEwLjQtOS44LTE5LjUtOS44cy0xNi40LDMuNC0yMi40LDEwLjFzLTkuOSwxNS4zLTExLjQsMjUuOGwtMy45LDI2LjYKCQkJCWMtMS43LDExLTAuNiwxOS44LDMuNCwyNi4zYzMuOSw2LjUsMTAuNSw5LjgsMTkuOCw5LjhjOC42LDAsMTYtMy40LDIyLTEwLjJjNi4xLTYuOCw5LjktMTUuNCwxMS42LTI1LjlMMjI0LDYyLjFMMjI0LDYyLjF6Ii8+CgkJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0zODguMywxNDloLTM0bC00MC05Mi40bC0wLjYsMC4xTDI5OS45LDE0OWgtMzQuMWwyMi0xNDYuOWgzNC4xbDQwLDkyLjNsMC42LTAuMWwxMy44LTkyLjJoMzRMMzg4LjMsMTQ5CgkJCQlMMzg4LjMsMTQ5eiIvPgoJCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDUyLDE0OWgtMzRMNDQwLDIuMWgzNEw0NTIsMTQ5TDQ1MiwxNDl6Ii8+CgkJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02MDEuOCw5OS41bDAuMiwwLjZjLTIuNCwxNy40LTksMzAuMy0xOS44LDM4LjZjLTEwLjgsOC4zLTI1LjMsMTIuNS00My40LDEyLjVzLTMxLjEtNS42LTQwLjgtMTYuOQoJCQkJYy05LjctMTEuMi0xMy4yLTI1LjctMTAuNS00My40bDQuNi0zMC43YzIuOC0xOC42LDEwLjItMzMuMiwyMi4zLTQ0QzUyNi43LDUuNCw1NDEuNiwwLDU1OS4yLDBzMzEuNSw0LjQsNDAuNywxMy4xCgkJCQljOS4yLDguNywxMi40LDIxLjMsOS43LDM3LjdsLTAuMywwLjZoLTMzLjNjMS4zLTkuNCwwLjQtMTUuOS0yLjctMTkuNnMtOS4yLTUuNi0xOC4xLTUuNmMtNy4zLDAtMTMuNiwzLjEtMTguOSw5LjMKCQkJCXMtOC42LDE0LjQtMTAuMSwyNC41bC00LjYsMzAuOWMtMS42LDEwLjYtMC42LDE5LDMsMjVzOS42LDksMTguMSw5YzcuNSwwLDEzLjMtMiwxNy41LTUuOWM0LjItNCw3LTEwLjUsOC40LTE5LjVMNjAxLjgsOTkuNQoJCQkJTDYwMS44LDk5LjV6Ii8+CgkJPC9nPgoJPC9nPgo8L2c+Cjwvc3ZnPgo="
      @click="onLogoClick()"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import apiClient from '@/utils/api-client'
import throttle from 'lodash.throttle'
import { mixin } from '@/mixins/mixin'

export default {
  name: 'Logo',
  mixins: [mixin],
  data() {
    return {
      clickCount: 0
    }
  },
  computed: {
    ...mapGetters(['options'])
  },
  methods: {
    ...mapActions(['refreshOptionsCache']),
    onLogoClick: throttle(async function () {
      this.clickCount++
      if (this.clickCount === 10) {
        try {
          await apiClient.option.saveMapView({ developer_mode: true })

          await this.refreshOptionsCache()
          this.$message.success(`开发者选项已启用！`)
          this.clickCount = 0
          this.$router.push({ name: 'ToolList' }).catch(() => {})
        } catch (e) {
          this.$log.error(e)
        }
        return
      }
      if (this.clickCount >= 5) {
        if (this.options.developer_mode) {
          this.$message.info(`当前已启用开发者选项！`)
          this.clickCount = 0
        } else {
          this.$message.info(`再点击 ${10 - this.clickCount} 次即可启用开发者选项！`)
        }
      }
    }, 200)
  }
}
</script>
