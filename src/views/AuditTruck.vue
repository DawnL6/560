<template>
  <div>
    <van-nav-bar title="车辆认证" @click-left="onClickLeft" left-arrow/>
    <div class="content">
      <div class="item">
        <van-cell-group>
          <van-field v-model="driver_mobile" type="text" label="用户手机号" placeholder="被上传人手机号" />
        </van-cell-group>
      </div>
      <div class="item">
        <van-cell-group>
          <van-field v-model="plate_no1" type="text" label="车牌号码1级" placeholder="京A123456  京字为第一级号码" />
        </van-cell-group>
      </div>
      <div class="item">
        <van-cell-group>
          <van-field v-model="plate_no2" type="text" label="车牌号码2级" placeholder="京A123456  A为第2级号码" />
        </van-cell-group>
      </div>
      <div class="item">
        <van-cell-group>
          <van-field v-model="plate_no3" type="text" label="车牌号码3级" placeholder="京A123456  123456字为第3级号码" />
        </van-cell-group>
      </div>
      <div class="item">
        <van-cell-group>
          <van-field v-model="truck_type_name" type="text" label="车型" placeholder="车型" readonly @click="choseTruckTypeId" />
        </van-cell-group>
      </div>
      <div class="item">
        <van-cell-group>
          <van-field v-model="truck_length_name" type="text" label="车长" placeholder="车型" readonly @click="choseTruckLengrhId" />
        </van-cell-group>
      </div>
      <div class="item">
        <van-radio-group v-model="plate_color">
          <van-cell-group>
            <van-cell title="蓝色" clickable @click="plate_color = '1'">
              <van-radio name="1" />
            </van-cell>
            <van-cell title="黄色" clickable @click="plate_color = '2'">
              <van-radio name="2" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
      <div class="imgs">
        <div>车头照</div>
        <div class="rig">
          <simple-cropper :initParam="iconParam" ref="truckHeadImg" @childByValue="choseTruckHeadImg">
            <img :src="truck_head_img" @click="upload('truckHeadImg')" class="img">
          </simple-cropper>
        </div>
      </div>
      <div class="imgs">
        <div>行驶证照片</div>
        <div class="rig">
          <simple-cropper :initParam="iconParam" ref="driverLicenseImg" @childByValue="choseDriverLicenseImg">
            <img :src="driver_license_img" @click="upload('driverLicenseImg')" class="img">
          </simple-cropper>
        </div>
      </div>
      <div class="but">
        <van-button size="large" type="primary" @click="submission">提交</van-button>
      </div>
      <!-- 车型 -->
      <van-popup v-model="showType" position="bottom">
        <div class="truckType">
          <ul>
            <li v-for="item in truckType" :key='item.id' @click="choseType(item)" :class="item.id===currentTypeId ? 'sure' : '' ">{{item.displayName}}</li>
          </ul>
          <van-button size="large" type="primary" @click="showType = false">确定</van-button>
        </div>
      </van-popup>
      <!-- 车长 -->
      <van-popup v-model="showLength" position="bottom">
        <div class="truckType">
          <ul>
            <li v-for="item in truckLength" :key='item.id' @click="choseLength(item)" :class="item.id===currentLengthId ? 'sure' : '' ">{{item.displayName}}</li>
          </ul>
          <van-button size="large" type="primary" @click="showLength = false">确定</van-button>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { asyncTool } from "../http/index.js";
import SimpleCropper from "../components/Update";
import { Toast } from "vant";
import truckType from "../data/truckType.js";
import truckLength from "../data/truckLength.js";
var img = require("../assets/personalCenter_takePhoto_90x90.png");
export default {
  data() {
    return {
      title: "",
      iconParam: {
        scale: 2 // 相对手机屏幕放大的倍数
      },
      truckType: truckType,
      truckLength: truckLength,
      showType: false,
      showLength: false,
      isTruckHeadImg: false,
      isDriverLicenseImg: false,
      truck_head_img: img,
      driver_license_img: img,
      driver_mobile: "",
      plate_color: "",
      plate_no1: "",
      plate_no2: "",
      plate_no3: "",
      truck_type_id: "",
      truck_length_id: "",
      truck_type_name: "",
      truck_length_name: "",
      currentTypeId: "",
      currentLengthId: "",
      currentType: ""
    };
  },
  components: {
    SimpleCropper
  },
  created() {
    if (!window.localStorage.getItem("userInfo")) {
      this.$router.push("/login");
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push("/");
    },
    upload(type) {
      this.$refs[type].upload();
    },
    choseTruckHeadImg(imgData) {
      this.truck_head_img = imgData;
      this.isTruckHeadImg = true;
    },
    choseDriverLicenseImg(imgData) {
      this.driver_license_img = imgData;
      this.isDriverLicenseImg = true;
    },
    choseTruckTypeId(type) {
      this.showType = true;
    },
    choseTruckLengrhId() {
      this.showLength = true;
    },
    choseType(item) {
      this.currentTypeId = item.id;
      this.truck_type_id = item.id;
      this.truck_type_name = item.displayName;
    },
    choseLength(item) {
      this.currentLengthId = item.id;
      this.truck_length_id = item.id;
      this.truck_length_name = item.displayName;
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
      if (!this.plate_no1) {
        Toast("车牌号码第1级不能为空");
        return;
      }
      if (!this.plate_no2) {
        Toast("车牌号码第2级不能为空");
        return;
      }
      if (!this.plate_no3) {
        Toast("车牌号码第3级不能为空");
        return;
      }
      if (!this.truck_type_id) {
        Toast("车型id不能为空");
        return;
      }
      if (!this.truck_length_id) {
        Toast("车长id不能为空");
        return;
      }
      if (!this.plate_color) {
        Toast("选择车牌颜色");
        return;
      }
      if (!this.isTruckHeadImg) {
        Toast("请上传车头照");
        return;
      }
      if (!this.isDriverLicenseImg) {
        Toast("请上传行驶证照");
        return;
      }
      Toast.loading({
        mask: true,
        message: "提交中..."
      });
      asyncTool("/handler/auditTruck", {
        plate_color: this.plate_color,
        plate_no1: this.plate_no1,
        plate_no2: this.plate_no2,
        plate_no3: this.plate_no3,
        user_id: JSON.parse(window.localStorage.getItem("userInfo")).userId,
        sign: JSON.parse(window.localStorage.getItem("userInfo")).sign,
        driver_mobile: this.driver_mobile,
        truck_length_id: this.truck_length_id,
        truck_type_id: this.truck_type_id,
        truck_head_img: this.truck_head_img.split(",")[1],
        driver_license_img: this.driver_license_img.split(",")[1]
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: #fff;
    div {
      flex: 1;
      &:first-child {
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
  .truckType {
    background-color: fff;
    ul {
      display: flex;
      flex-wrap: wrap;
      width: 95%;
      margin: 20px auto;
      li {
        padding: 4px;
        border-radius: 5px;
        border: 1px solid #4b0;
        margin: 4px;
        color: #666;
        &.sure {
          background-color: #4b0;
          border: 1px solid #fff;
          color: #fff;
        }
      }
    }
  }
}
</style>


