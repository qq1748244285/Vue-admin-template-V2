<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li
              @click="RemoveCategoryName()"
              class="with-x"
              v-if="SearchParams.categoryName"
            >
              {{ SearchParams.categoryName }}<i>x</i>
            </li>
            <li
              @click="RemoveKeyWord()"
              class="with-x"
              v-if="SearchParams.keyword"
            >
              {{ SearchParams.keyword }}<i>x</i>
            </li>
            <li
              @click="RemoveMark()"
              class="with-x"
              v-if="SearchParams.trademark"
            >
              {{ SearchParams.trademark.split(":")[1] }}<i>x</i>
            </li>
            <li
              class="with-x"
              v-for="(pitem, pindex) in SearchParams.props"
              :key="pindex"
              @click="RemoveProps(pindex)"
            >
              {{ pitem.split(":")[1] }}<i>x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          @getAttrVal="getAttrValFromChildren"
          @GetBrand="GetBrandFromChildren"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isActive }" @click="ChangeActive(1)">
                  <a
                    >综合
                    <span
                      v-show="isActive"
                      class="iconfont"
                      :class="isDown ? 'icon-arrowdown' : 'icon-arrowup'"
                    >
                    </span>
                  </a>
                </li>
                <li :class="{ active: !isActive }" @click="ChangeActive(2)">
                  <a
                    >价格
                    <span
                      v-show="!isActive"
                      class="iconfont"
                      :class="isDown ? 'icon-arrowdown' : 'icon-arrowup'"
                    >
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(item, index) in goodsList"
                :key="item.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/details/${item.id}`" 
                      ><img   v-lazy="item.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i> {{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ item.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页 -->
          <Pagination
            @getPageNo="getPageNo"
            :pageNo="SearchParams.pageNo"
            :pageSize="SearchParams.pageSize"
            :total="total"
            :continuse="5"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      SearchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:desc", //默认 综合排序-降序
        pageNo: 1,
        pageSize: 3,
        props: [],
        trademark: "",
      },
      searchBread: [],
      pagesInfo: {
        pageNo: 27,
        pageSize: 3,
        total: 91,
        continuse: 5, //分页页码个数 一般是奇数 5|7
      },
    };
  },
  beforeMount() {},
  watch: {
    $route: {
      immediate: true, //首次也进行检测
      handler: function (to, from) {
        let params = { ...to.query, ...to.params };
        Object.assign(this.SearchParams, params);
        this.getApiSearch();
        //每次需要清理之前选中的商品分类ID 分类和名称及keyword不需要清理 因为他们会随着用户行为变化
        this.ParamsInit();
      },
    },
  },
  computed: {
    ...mapState({
      total: (state) => state.Search.searchList.total,
    }),
    ...mapGetters(["goodsList", "trademarkList", "attrsList"]),
    isActive() {
      return this.SearchParams.order.indexOf("1") != -1;
    },
    isDown() {
      return this.SearchParams.order.indexOf("desc") != -1;
    },
  },
  methods: {
    getPageNo(i) {
      console.log(i, "获取点击的pageNo");
      this.SearchParams.pageNo = i;
      this.getApiSearch();
    },
    ChangeActive(curr) {
      let Order = this.SearchParams.order;
      let Flag = this.SearchParams.order.split(":")[0]; //拿到所选项;
      let Sort = this.SearchParams.order.split(":")[1]; //拿到所选项;
      console.log(Order, "order");
      console.log(Flag, "Flag");
      console.log(Sort, "Sort");
      console.log(curr, "curr");
      let newOrder = "";
      if (curr == Flag) {
        newOrder = `${curr}:${Sort == "desc" ? "asc" : "desc"}`;
        this.SearchParams.order = newOrder;
      } else {
        console.log("切换了所选项");
        newOrder = `${curr}:desc`;
        this.SearchParams.order = newOrder;
      }
      this.getApiSearch();
    },
    getAttrValFromChildren(item, name) {
      let str = `${item.attrId}:${name}:${item.attrName}`;
      //数组去重
      if (this.SearchParams.props.indexOf(str) == -1) {
        this.SearchParams.props.push(str);
      }
      this.getApiSearch();
    },
    GetBrandFromChildren(item) {
      this.SearchParams.trademark = `${item.tmId}:${item.tmName}`;
      this.getApiSearch();
    },
    ParamsInit() {
      this.SearchParams.category1Id = undefined;
      this.SearchParams.category2Id = undefined;
      this.SearchParams.category3Id = undefined;
    },
    RemoveMark() {
      this.SearchParams.trademark = undefined;
      this.getApiSearch();
    },
    RemoveCategoryName() {
      this.ParamsInit();
      this.SearchParams.categoryName = undefined;
      this.getApiSearch();
      let local = {
        name: "search",
      };
      if (this.$route.params.keyword) {
        local.params = this.$route.params;
      }
      this.$router.push(local);
    },
    RemoveKeyWord() {
      this.ParamsInit();
      this.SearchParams.keyword = undefined;
      //同时通过$bus 清理兄弟组件中的关键字 当然也可以传参
      this.$bus.$emit("clearKeyWord", "test");
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    RemoveProps(i) {
      this.SearchParams.props.splice(i, 1);
      this.getApiSearch();
    },
    getApiSearch(params) {
      this.$store.dispatch("acitons_getSearchList", this.SearchParams);
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        display: flex;
        justify-content: center;
        align-content: center;
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>