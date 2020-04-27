<template>
  <div>
    <h1 v-if="isLoading">loading...</h1>
    <h1 v-else>
      most star repo is <a :href="repo.url">{{ repo.name }}</a>
    </h1>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      isLoading: false,
      repo: {
        name: "",
        url: "",
      },
    };
  },
  async created() {
    this.isLoading = true;
    // const path = "http://localhost:9527/api/search";
    const url = `http://localhost:3000/search`;

    this.$http
      .get(url)
      .then((response) => {
        // console.log(response.data); // 响应数据
        const { name, url } = response.data.data[0];
        // 请求成功 切换isLoading为false
        this.repo = {
          name,
          url,
        };
        this.isLoading = false; // 代表请求结束了
      })
      .catch((error) => {
        console.log(error);
        // 请求成功 切换isLoading为false
        this.isLoading = false; // 代表请求结束了
      });
  },
};
</script>

<style></style>
