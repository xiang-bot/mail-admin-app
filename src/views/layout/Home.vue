<template>
  <div class="home">
    <left-menu :key="key" />
    <!--上面是左侧 下面是右侧-->
    <div :class="{ 'main-app': true, 'menu-unfold': $store.state.collapsed }">
    <slider-nav />
    <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LeftMenu from './components/menu.vue';
import SliderNav from './components/sliderNav.vue';

export default {
  data() {
    return {
      key: new Date().getTime(),
    };
  },
  watch: {
    $route() {
      this.key = new Date().getTime();
    },
  },
  methods: {
  },
  components: {
    LeftMenu,
    SliderNav,
  },
};
</script>
<style lang="less">
@import url("~@/assets/css/home.less");
</style>
