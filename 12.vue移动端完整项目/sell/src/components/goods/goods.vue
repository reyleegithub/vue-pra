<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item" v-for="(item,index) in goods" :class="{'current': currentIndex===index}"
            @click="selectMenu(index,$event)">
          <!--<span class="text border-1px"><span v-if="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>-->
          <span class="text border-1px"><icon v-if="item.type > 0" class="icon" :name="classMap[item.type]"
                                              :size="3"></icon>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img width="57px" height="57px" :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span><span class="old"
                                                                v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
              </div>
              <!--<div class="count-control">-->
              <!--<div class="control icon-remove_circle_outline" :class="{'hide': food.count == 0 || typeof food.count == 'undefined'}" @click="loseFood(food,$event)"></div>-->
              <!--<div class="count" :class="{'hide': food.count == 0 || typeof food.count == 'undefined'}">{{food.count}}</div>-->
              <!--<div class="control icon-add_circle" @click="addFood(food,$event)"></div>-->
              <!--</div>-->
              <div class="cartcontrol-wrapper">
                <cartcontrol @cart-add="cartAdd" :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :selectFoods="selectFoods" :delivery-price="seller.deliveryPrice"
              :min-price="seller.minPrice"></shopcart>
    <food ref="food" :food="selectedFood"></food>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">

  @import "./../../common/stylus/mixin.styl"

  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden

    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background-color: #f3f5f7

      .menu-item
        padding: 0 12px
        display: table
        width: 56px
        height: 50px
        line-height: 14px

        &.current
          background-color: #fff
          position: relative
          margin-top: -1px
          z-index: 10
          font-weight: 700

          .text
            border-none()

        .text
          font-size: 12px
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))

          .icon
            vertical-align: top
            margin-right: 2px

    .foods-wrapper
      flex: 1
      background-color: #fff

      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 1px solid #d9dd1
        color: rgb(144, 153, 159)
        font-size: 12px
        background-color: #f3f5f7

      .food-item
        display: flex
        border-1px(rgba(7, 17, 27, 0.1))
        margin: 18px
        padding-bottom: 18px
        position: relative;

        &:last-child
          border-none()
          margin-bottom: 0

        .icon
          flex: 0 0 57px
          margin-right: 10px

        .content
          flex: 1;

          .name
            margin: 2px 0 8px 0
            line-height: 16px
            font-size: 14px
            color: rgb(7, 17, 27)

          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)

          .desc
            margin-bottom: 8px
            line-height: 12px

          .extra
            .count
              margin-right: 6px

          .price
            font-weight: 700
            line-height: 24px

            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)

            .old
              text-decoration: line-through
              font-size: 10px
              color: gray

        .cartcontrol-wrapper
          position: absolute
          right: 0
          bottom: 8px


</style>

<script>

  import BScroll from 'better-scroll'
  import icon from './../icon/icon.vue'
  import shopcart from './../shopcart/shopcart.vue'
  import cartcontrol from './../cartcontrol/cartcontrol.vue'
  import food from './../food/food.vue'

  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {

            // 判断如果左侧栏选中item未滑动出来，需滑动左侧栏
            let menuWrapper = this.$refs.menuWrapper;
            let menuWrapperheight = menuWrapper.clientHeight;
            let menuList = menuWrapper.getElementsByClassName('menu-item');
            let menuItemHeight = 0;
            if (menuList.length > 0) {
              menuItemHeight = menuList[0].clientHeight;
            }
            // 往上滑动时，需要将隐藏的栏显示出来
            let el = menuList[i];
            this.menuScroll.scrollToElement(el, 500);
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        // 由于子组件改变了food，会导致父组件重新计算所有的foods，有count就加进来了
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          })
        })
        return foods;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods').then((res) => {
        if (res.data.errno == ERR_OK) {
          this.goods = res.data.data;
          this.$nextTick(() => {
            this.menuScroll.refresh()
            this.foodsScroll.refresh()
            this._calculateHeight()
          })

        }
      })
    },
    mounted() {
      this._initScroll();
    },
    methods: {
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true,
          probeType: 3
        });

        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          // 1.先能实时检测滚动的位置
          probeType: 3,
          click: true
        });

        // 2.在实现监听位置
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        })

        this.menuScroll.on('scroll', (pos) => {
          this.menuScrollY = Math.abs(Math.round(pos.y));
        })
      },
      _calculateHeight() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu(index, event) {
        // better-scroll派发的这个_constructed属性值为true
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      cartAdd(el) {
        // 异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(el);
        })
      },
      selectFood(food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
      }
    },
    components: {
      icon,
      shopcart,
      cartcontrol,
      food
    },
    beforeRouteEnter(to, from ,next) {
      console.log('abc')
      next()
    },
    beforeRouteUpdate(to, from ,next) {
      console.log('def')
      next()
    },
    beforeRouteLeave(to, from ,next) {
      console.log('hij')
      next()
    }
  }
</script>


