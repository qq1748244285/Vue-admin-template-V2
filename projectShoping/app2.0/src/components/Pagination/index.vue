<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="clickNum(pageNo - 1)">
      上一页
    </button>
    <button @click="clickNum(1)" v-if="StartNumAndEndNum.start > 1">1</button>
    <button v-if="StartNumAndEndNum.start > 2">···</button>
    <!-- 中间 -->
    <div
      class="inlineBlock"
      v-for="(item, index) of StartNumAndEndNum.end"
      :key="index"
    >
      <button
        @click="clickNum(item)"
        v-if="item >= StartNumAndEndNum.start"
        :style="{
          background: item == pageNo ? 'red' : '',
          color: item == pageNo ? '#fff' : '',
        }"
      >
        {{ item }}
      </button>
    </div>

    <button v-if="StartNumAndEndNum.end < totalPage - 1">···</button>
    <button
      @click="clickNum(totalPage)"
      v-if="StartNumAndEndNum.end < totalPage"
    >
      {{ totalPage }}
    </button>
    <button :disabled="pageNo == totalPage" @click="clickNum(pageNo + 1)">
      下一页
    </button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {};
  },
  props: ["pageNo", "pageSize", "total", "continuse"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    //计算出连续的页码的起始数字与结束数字
    StartNumAndEndNum() {
      //解构
      let { totalPage } = this;
      let { continuse, pageNo } = this;
      //定义起始位置和结束位置
      let start;
      let end = 0;
      //如果总页数小于连续页码数 则默认起始和结束位置
      if (totalPage < continuse) {
        start = 1;
        end = totalPage;
      } else {
        start = pageNo - parseInt(continuse / 2);
        end = pageNo + parseInt(continuse / 2);
      }
      //起始页如果小于1 则返回1
      if (start < 1) {
        start = 1;
        end = continuse;
      }
      //如果结束页 > 总页数 则 = 总页数
      if (end > totalPage) {
        end = totalPage;
        start = totalPage - continuse + 1;
      }
      return { start, end };
    },
  },
  methods: {
    clickNum(item) {
      //触发自定义事件传入点击的页码
      this.$emit("getPageNo", item);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  .inlineBlock {
    display: inline-block;
  }
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>