<template>
  <div class="home">
    <van-nav-bar title="登陆" />
    <div class="input">
      <van-cell-group>
        <van-field v-model="user_name" type="text" label="用户名" placeholder="请输入用户名" />
        <van-field v-model="pass_word" type="password" label="密码" placeholder="请输入密码" />
      </van-cell-group>
    </div>
    <div class="but">
      <van-button size="large" type="primary" @click="login">登陆</van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { asyncTool } from "../http/index.js";
export default {
  data() {
    return {
      user_name: "",
      pass_word: ""
    };
  },
  methods: {
    login() {
      if (!this.user_name) {
        Toast("用户名不能为空！");
        return;
      }
      if (!this.pass_word) {
        Toast("密码不能为空！");
        return;
      }
      Toast.loading({
        mask: true,
        message: "登陆中..."
      });
      asyncTool("user/login", {
        user_name: this.user_name,
        pass_word: this.pass_word
      })
        .then(res => {
          Toast.clear();
          if (res.status === 200 && res.data.resultCode === "E_CODE_0") {
            window.localStorage.setItem(
              "userInfo",
              JSON.stringify(res.data.resultData)
            );
            this.$router.back();
          } else {
            Toast(res.data.resultMsg);
          }
        })
        .catch(function(error) {
          Toast.clear();
          Toast("未知错误");
        });
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  .input {
    margin-top: -1px;
  }
  .but {
    width: 90%;
    margin: 0 auto;
    margin-top: 50px;
  }
}
</style>
