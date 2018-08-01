<template>
  <div>
    <van-nav-bar title="实名认证" @click-left="onClickLeft" left-arrow/>
    <div class="content">
      <div class="item">
        <van-cell-group>
          <van-field v-model="driver_mobile" type="text" label="用户手机号" placeholder="被上传人手机号" />
        </van-cell-group>
      </div>
      <div class="imgs">
        <div>上传头像</div>
        <div class="rig">
          <simple-cropper :initParam="iconParam" ref="icon" @childByValue="choseIcon">
            <img :src="icon" @click="upload('icon')" class="img">
          </simple-cropper>
        </div>
      </div>
      <div class="imgs">
        <div>身份证正面</div>
        <div class="rig">
          <simple-cropper :initParam="iconParam" ref="idCard" @childByValue="choseIdCard">
            <img :src="id_card" @click="upload('idCard')" class="img">
          </simple-cropper>
        </div>
      </div>
      <div class="but">
        <van-button size="large" type="primary" @click="submission">提交</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { asyncTool } from "../http/index.js";
import SimpleCropper from "../components/Update";
import { Toast } from "vant";
var img = require("../assets/personalCenter_takePhoto_90x90.png");
export default {
  data() {
    return {
      title: "",
      iconParam: {
        scale: 2 // 相对手机屏幕放大的倍数
      },
      isIcon: false,
      isIdCard: false,
      icon: img,
      id_card: img,
      driver_mobile: ""
    };
  },
  created() {
    if (!window.localStorage.getItem("userInfo")) {
      this.$router.push("/login");
    }
  },
  components: {
    SimpleCropper
  },
  methods: {
    onClickLeft() {
      this.$router.push("/");
    },
    upload(type) {
      this.$refs[type].upload();
    },
    choseIcon(imgData) {
      this.icon = imgData;
      this.isIcon = true;
    },
    choseIdCard(imgData) {
      this.id_card = imgData;
      this.isIdCard = true;
    },
    submission() {
      if (!this.driver_mobile) {
        Toast("请填写用户手机号");
        return;
      }
      if (
        !/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(
          this.driver_mobile
        )
      ) {
        Toast("手机号格式不正确");
        return;
      }
      if (!this.isIcon) {
        Toast("请上传用户头像");
        return;
      }
      if (!this.isIdCard) {
        Toast("请上传身份证正面");
        return;
      }
      Toast.loading({
        mask: true,
        message: "提交中..."
      });
      asyncTool("/handler/auth", {
        icon: this.icon.split(",")[1],
        id_card: this.id_card.split(",")[1],
        driver_mobile: this.driver_mobile,
        user_id: JSON.parse(window.localStorage.getItem("userInfo")).userId,
        sign: JSON.parse(window.localStorage.getItem("userInfo")).sign
      })
        .then(res => {
          if (res.status === 200) {
            Toast(res.data.resultMsg);
            if (res.data.resultCode === "E_CODE_3") {
              window.localStorage.removeItem("userInfo");
              this.$router.push("/login");
            } else if (res.data.resultCode === "E_CODE_0") {
              this.$router.push("/");
            }
          }
        })
        .catch(function(error) {
          Toast("未知错误");
        });
    }
  }
};
</script>
<style lang="less" scoped>
.content {
  margin-top: 20px;
  .imgs {
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: #fff;
    div {
      flex: 1;
      &:first-child {
        // margin-left: 10px;
        font-size: 14px;
      }
    }
    .rig {
      img {
        width: 60%;
      }
    }
  }
  .but {
    width: 90%;
    margin: 0 auto;
    margin-top: 50px;
  }
}
</style>


