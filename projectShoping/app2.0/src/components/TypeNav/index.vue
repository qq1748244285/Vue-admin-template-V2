<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseenter="isShowNav(true)" @mouseleave="isShowNav(false)">
        <h2 class="all">全部商品分类</h2>
        <!-- 过度动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 事件委托 -->
            <div class="all-sort-list2" @click="jumpSearch">
              <div
                class="item"
                v-for="(item, index) in categoryList"
                :key="item.categoryList"
              >
                <h3
                  :class="{ active: index == current }"
                  @mouseenter="activeIndex(index)"
                >
                  <a
                    :data-cname="item.categoryName"
                    :data-c1id="item.categoryId"
                    >{{ item.categoryName }}</a
                  >
                </h3>
                <div
                  :style="{ display: index == current ? 'block' : 'none' }"
                  class="item-list clearfix"
                >
                  <div
                    class="subitem"
                    v-for="(itemTwo, indexTwo) in item.categoryChild"
                    :key="itemTwo.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-cname="itemTwo.categoryName"
                          :data-c2id="itemTwo.categoryId"
                          >{{ itemTwo.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(
                            itemThree, indexThree
                          ) in itemTwo.categoryChild"
                          :key="itemThree.categoryId"
                        >
                          <a
                            :data-cname="itemThree.categoryName"
                            :data-c3id="itemThree.categoryId"
                            >{{ itemThree.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
//引入loadsh -  节流函数
import throttle from "lodash/throttle";

import { mapState } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      current: -1,
      show: true,
    };
  },
  mounted() {
    console.log("Typenav  生命周期");
    if (this.$route.path.search("/search") != -1) {
      this.show = false;
    } else {
      this.show = true;
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.Home.categoryList,
    }),
  },
  methods: {
    isShowNav(bool) {
      if (!bool) {
        this.current = -1;
      }
      if (!bool && this.$route.path.search("/search") != -1) {
        this.show = false;
      }
      if (bool && this.$route.path.search("/search") != -1) {
        this.show = true;
      }
    },
    jumpSearch(event) {
      let element = event.target;
      let { cname, c1id, c2id, c3id } = element.dataset; 
      //只有点击拥有自定义属性的元素才进行跳转
      if (cname) {
        let local = {
          name: "search",
          query: {
            categoryName: cname,
          },
        };
        if (c1id) {
          local.query.category1Id = c1id;
        }
        if (c2id) {
          local.query.category2Id = c2id;
        }
        if (c3id) {
          local.query.category3Id = c3id;
        }

        //如果路由跳转时params有参数也需要整理携带
        if (this.$route.params) {
          local.params = this.$route.params;
        }

        console.log(local, "query整理参数");
        //跳转search
        this.$router.push(local);
      }
    },
    //loadsh使用
    activeIndex: throttle(function (i) {
      this.current = i;
    }, 60),
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;
  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      background: #fafafa;
      z-index: 999;
      .all-sort-list2 {
        .item {
          // :hover{
          // background: skyblue;
          // }
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .active {
          background: skyblue;
        }
      }
    }
    //过度动画开始状态
    .sort-enter {
      height: 0px;
    }
    //离开时
    .sort-enter-to {
      // height: 461px;
    }
    //速率等动画
    .sort-enter-active {
      transition: all 0.5s linear;
    }

    .sort-leave {
      // height: 461px;
    }

    .sort-leave-to {
      height: 0;
    }
    .sort-leave-active {
      transition: all 0.5s linear;
    }
  }
}
</style>