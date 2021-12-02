<template>
    <div class="product-list">
        <!--搜索-->
        <search @submit="searchSubmit" :data="categoryList"/>
        <a-button class="product-add-btn">
          <router-link :to="{name:'ProductAdd'}">添加商品</router-link> </a-button>
        <!--表格-->
        <productTable :data="tableData" :page="page"
        @change="changePage"
        :categoryList="categoryList"
        @edit="editProduct"
        @remove="removeProduct"
        />
    </div>
</template>
<script>
import api from '@/api/product';
import categoryApi from '@/api/category';
import search from '@/components/search.vue';
import productTable from '@/components/productTable.vue';

export default {
  data() {
    return {
      tableData: [],
      searchForm: {},
      categoryList: [],
      page: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 1,
      },
      categoryObj: {},
    };
  },
  components: {
    search,
    productTable,
  },
  async created() {
    await categoryApi.list().then((res) => {
      this.categoryList = res.data;
      res.data.forEach((item) => {
        this.categoryObj[item.id] = item;
      });
    });
    this.getTableData();
    // 上面的先后顺序
  },
  methods: {
    searchSubmit(form) {
      this.searchForm = form;
      this.getTableData();
    },
    getTableData() {
      api.list({
        page: this.current,
        size: this.pageSize,
        ...this.searchForm,
      }).then((res) => {
        window.console.log(res);
        this.page.total = res.total;
        this.tableData = res.data.map((item) => ({
          ...item,
          categoryName: this.categoryObj[item.category],
          // 上面的值取的是全部的名字
        }));
      });
    },
    changePage(page) {
      this.page = page;
      this.getTableData();
    },
    editProduct(record) {
      window.console.log(record);
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: record.id,
        },
      });
    },
    removeProduct(record) {
      this.$confirm({
        title: '确认删除',
        content: () => <div style="color:red;">{`确认删除标题为:${record.title}的商品吗`}</div>,
        onOk: () => {
          api.remove({
            id: record.id,
          }).then(() => {
            this.getTableData();
          });
        },
        onCancel() {

        },
        class: 'confirm-box',
      });
    },
  },
};
</script>

<style lang="less">
.product-list{
  position: relative;
  .product-add-btn{
    position: absolute;
    right: 10px;
    top: 4px;
  }
}
</style>
