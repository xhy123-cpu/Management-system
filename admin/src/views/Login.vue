<template>
  <div>
    <Particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
      :options="options"
    />
    <div class="formContainer">
      <h3>企业门户网站管理</h3>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        status-icon
        :rules="rules"
        label-width="80px"
        class="loginform"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { loadFull } from "tsparticles";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import axios from "axios";
import { useStore } from "vuex";
const store=useStore()

const router = useRouter();
const loginForm = reactive({
  username: "",
  password: "",
});
const rules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入用户名", trigger: "blur" }],
});
const loginFormRef = ref();
const submitForm = () => {
  loginFormRef.value.validate((valid) => {
    console.log(valid);
    if (valid) {
      // console.log(loginForm);
      axios.post("/adminapi/user/login", loginForm).then((res) => {
        console.log(res.data);
        if (res.data.ActionType === "ok") {
          // console.log(res.data.data);
          store.commit("changeUserInfo",res.data.data)
          store.commit("changeGetterRouter",false)
          router.push("/index");
        } else {
          ElMessage({
            showClose: true,
            message: "用户名和密码不匹配.",
            type: "error",
          });
        }
      });
    }
  });
};
const particlesInit = async (engine) => {
  await loadFull(engine);
};

const options = {
  background: {
    color: {
      value: "#2d3a41",
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 100,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 6,
      straight: false,
    },
    number: {
      density: {
        enable: false,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: false,
};
</script>

<style lang="scss" scoped>
.formContainer {
  width: 500px;
  height: 300px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba($color: #000000, $alpha: 0.5);
  text-align: center;
  padding: 20px;
}

::v-deep .el-form-item__label {
  color: white;
}
h3 {
  font-size: 30px;
  color: white;
}
.loginform {
  margin-top: 20px;
}
</style>