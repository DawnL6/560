<template>
  <div class="home">
    <van-nav-bar title="选择项目" right-text="切换用户" @click-right="changeUser" />
    <div class="list">
      <ul>
        <li>
          <router-link :to="{ name: 'auth'}">
            <span>实名认证</span>
            <van-icon name="arrow" />
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'identity'}">
            <span>身份认证</span>
            <van-icon name="arrow" />
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'audittruck'}">
            <span>车辆认证</span>
            <van-icon name="arrow" />
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    if (!window.localStorage.getItem("userInfo")) {
      this.$router.push("/login");
    }
  },
  methods: {
    changeUser() {
      window.localStorage.removeItem("userInfo");
      this.$router.push("/login");
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  .list {
    width: 100%;
    margin-top: 20px;
    background-color: #f8f8f8;
    ul li {
      height: 44px;
      line-height: 44px;
      text-indent: 10px;
      background-color: #fff;
      margin-top: 10px;

      padding-right: 10px;
      a {
        color: #333;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          flex: 1;
        }
      }
    }
  }
}
</style>
