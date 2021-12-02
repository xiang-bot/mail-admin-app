<template>
  <a-form-model
    layout="inline"
    :model="searchForm"
    @submit="handleSubmit"
    @submit.native.prevent
  >
    <a-form-model-item label="检索关键字">
      <a-input v-model="searchForm.searchWord" placeholder="请输入关键字"> </a-input>
    </a-form-model-item>
    <a-form-model-item label="商品类目">
      <a-select
        show-search
        placeholder="请选择商品类目"
        style="width: 200px"
        @change="handleChange"
        allowClear
      >
        <a-select-option  v-for="c in data" :key="c.id" :value="c.id">
             {{c.name}} </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item>
      <a-button
        type="primary"
        html-type="submit"
              >
        搜索
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>

export default {
  data() {
    return {
      searchForm: {
        searchWord: '',
        category: '',
      },
    };
  },
  props: ['data'],
  created() {
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.searchForm);
      // 子组件可以使用 $emit 触发父组件的自定义事件。
    },
    // 提交表单时触发的函数
    handleChange(val) {
      this.searchForm.category = val;
    },
    // 切换类目时触发的函数  里面的val就是你的第几个商品的id 可以点击它进行下面的操作
  },
};
</script>
<style lang="less">
.ant-form{
    margin-top: 10px;
.ant-row {
    margin-left: 30px;
}
}

</style>
