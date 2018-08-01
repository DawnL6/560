<template>
  <div>
    <van-nav-bar title="身份认证" @click-left="onClickLeft" left-arrow/>
    <div class="content">
      <div class="item">
        <van-cell-group>
          <van-field v-model="driver_mobile" type="text" label="用户手机号" placeholder="被上传人手机号" />
        </van-cell-group>
      </div>
      <div class="imgs">
        <div>驾驶证（驾驶证，运营证至少上传一张）</div>
        <div class="rig">
          <simple-cropper :initParam="iconParam" ref="driverLicenseImg" @childByValue="choseDriverLicenseImg">
            <img :src="driver_license_img" @click="upload('driverLicenseImg')" class="img">
          </simple-cropper>
        </div>
      </div>
      <div class="imgs">
        <div>运营证（驾驶证，运营证至少上传一张）</div>
        <div class="rig">
          <simple-cropper :initParam="iconParam" ref="driverOperationImg" @childByValue="choseDriverOperationImg">
            <img :src="driver_operation_img" @click="upload('driverOperationImg')" class="img">
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
      isDriverLicenseImg: false,
      isDriverOperationImg: false,
      driver_license_img: img,
      driver_operation_img: img,
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
    choseDriverLicenseImg(imgData) {
      this.driver_license_img = imgData;
      this.isDriverLicenseImg = true;
    },
    choseDriverOperationImg(imgData) {
      this.driver_operation_img = imgData;
      this.isDriverOperationImg = true;
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
      if (!(this.isDriverLicenseImg || this.isDriverOperationImg)) {
        Toast("驾驶证，运营证至少上传一张");
        return;
      }
      Toast.loading({
        mask: true,
        message: "提交中..."
      });
      asyncTool("/handler/identity", {
        driver_license_img: this.driver_license_img.split(",")[1],
        driver_operation_img: this.driver_operation_img.split(",")[1],
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
          Toast(error);
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


