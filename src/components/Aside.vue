<template>
  <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
    <!-- <el-menu-item index="1">
      <router-link to="/" exact >
        <el-icon><location /></el-icon>
        <span>后台管理</span>
      </router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link to="/about" exact>
      <el-icon><Setting /></el-icon>
      <span>用户管理</span>
      </router-link>
    </el-menu-item> -->
    <el-menu-item index="1">
      <router-link to="/" exact style="text-decoration: none;">
        <el-icon>
          <location />
        </el-icon>
        <span>挂号管理</span>
      </router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link to="/about" exact style="text-decoration: none;">
        <el-icon>
          <Setting />
        </el-icon>
        <span>用户管理</span>
      </router-link>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { Location, Setting } from "@element-plus/icons";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  components: {
    Location,
    Setting
  },
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Aside"
}
</script>

<style scoped>
.el-menu-vertical-demo {
  height: 750px;
  margin-left: 20px;
}
</style>