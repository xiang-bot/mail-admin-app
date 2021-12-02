<template>
          <div class="main-header">
         <a-button
          type="primary"
          style="margin-bottom: 16px"
          @click="toggleCollapsed"
        >
          <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
        </a-button>
        <div class="breadcrumb"><a-breadcrumb>
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item><a href="">统计</a>
          </a-breadcrumb-item>
        </a-breadcrumb>
         </div>
        <ul class="user-info">
          <li class="user-name">
            {{$store.state.user.username}}
            <a-icon type="down"></a-icon>
          </li>
          <li class="login-out" @click="logout">退出</li>
        </ul>
      </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('changeCollapsed');
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push({
        name: 'Login',
      });
      // 这里退出是你要调用你的vuex的方法 它会直接删除你的cookie;
    },
  },
};
</script>
<style lang="less">
@import url("~@/assets/css/sliderNav.less");
</style>
