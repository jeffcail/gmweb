<template>

    <div style="border-bottom: 1px solid #ccc; line-height: 60px; display: flex;">

        <div style="flex: 1;">
          <span :class="collapseBtnClass" style="cursor: pointer; font-size: 18px;" @click="collapse"></span>


            <el-breadcrumb separator="/" style="display: inline-block; margin-left: 10px;">
              <el-breadcrumb-item :to="'/'">首页</el-breadcrumb-item>
              <el-breadcrumb-item>{{ currentPathName }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

          <el-dropdown style="width: 130px; cursor: pointer;">
            <img src="../assets/images/avator.jpeg" alt="" style="width: 30px; border-radius: 50%; position: relative; top: 10px; right: 5px;"/>
            <span>{{ user.nickname }}</span><i class="el-icon-arrow-down" style="margin-left: 5px;"></i>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>
                <span @click="logout" style="text-decoration: none;">退出</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

    </div>

</template>

<script>
export default {
    name: "Header",
    props: {
        collapseBtnClass: String,
        collapse: Boolean,
    },

    data() {
      return {
        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      }
    },

    methods: {
      logout() {
        localStorage.removeItem("user");
        this.$router.push("/login");
      }
    },

    computed: {
      currentPathName() {
        return this.$store.state.currentPathName;
      }
    },

    watch: {
      currentPathName (newVal, oldVal) {
        // console.log(newVal);
      }
    },

  

}
</script>

<style scoped>

</style>
