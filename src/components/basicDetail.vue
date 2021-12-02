<template>
  <div class="basic-detail">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{span: 5}"
      :wrapper-col="{span: 13}"
    >
      <a-form-model-item  label="标题" prop="title" required>
        <a-input
          v-model="form.title"
        />
      </a-form-model-item>
      <a-form-model-item label="商品描述" prop="desc">
      <a-input
          v-model="form.desc"
        />
      </a-form-model-item>
      <a-form-model-item label="商品类目" required prop="category">
    <a-select v-model="form.category" placeholder="请选择商品类目"
     @change="changeCategory"
    >
      <a-select-option v-for="c in categoryList" :key="c.id" :value="c.id"
      >
          {{c.name}}
        </a-select-option>
      </a-select>
     <a-select v-model="form.c_item" placeholder="请添加子类目">
        <a-select-option v-for="c in categoryItems" :key="c" :value="c">
          {{c}}
        </a-select-option>
      </a-select>

      </a-form-model-item>
      <a-form-model-item label="商品标签" prop="tags" required>
        <a-select
        mode="tags"
        placeholder="please"
        :default-value="['包邮，最晚次日达']"
        v-model="form.tags"
        >
        <a-select-option value="包邮，最晚次日达">
            包邮，最晚次日达
        </a-select-option>
        </a-select>
      </a-form-model-item>
     <a-form-model-item  label="" class="next-btn" :wrapperCol="{span: 24}">
         <a-button type="primary" @click="next">下一步</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import categoryApi from '@/api/category';

export default {
  data() {
    return {
      rules: {
        title: [
          { required: true, message: 'Please input Activity title', trigger: 'blur' },
        ],
        desc: [{ required: false, message: 'Please select Activity desc', trigger: 'blur' }],
        category: [{ required: true, message: 'Please pick a date', trigger: 'blur' }],
        tags: [{ required: true, message: 'Please pick a tags', trigger: 'blur' }],
      },
      categoryList: [],
      categoryItems: [],
    };
  },
  props: ['form'],
  created() {
    categoryApi.list().then((res) => {
      window.console.log(res);
      this.categoryList = res.data;
    });
  },
  methods: {
    changeCategory(category) {
      for (let i = 0; i < this.categoryList.length; i += 1) {
        if (this.categoryList[i].id === category) {
          this.categoryItems = this.categoryList[i].c_items;
        }
      }
    },
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.form);
          return true;
        }
        window.console.log('error submit!!');
        return false;
      });
    },
  },
};
</script>
<style lang="less">
.basic-detail{
    .next-btn{
        align-items: center;
    }
}
</style>
