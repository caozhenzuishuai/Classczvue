<template>
  <div>
    <p v-if="isFirstView">请输入搜索内容</p>
    <p v-else-if="isLoading">Loading...</p>
    <div class="row" v-else-if="users">
      <div class="card" v-for="(user, index) in users" :key="index">
        <a :href="user.html_url" target="_blank">
          <img :src="user.avatar_url" style="width: 100px" />
        </a>
        <p class="card-text">{{ user.login }}</p>
      </div>
    </div>
    <p v-else>{{ errorMsg }}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      isFirstView: true,
      isLoading: false,
      users: null,
      errorMsg: "",
    };
  },
  created() {
    this.$bus.$on("search-name", this.reqUsersData);
  },
  methods: {
    async reqUsersData(searchName) {
      this.isFirstView = false;
      this.isLoading = true;

      try {
        const response = await axios.get(`/api/search/users?q=${searchName}`);

        const users = response.data.items.map((user) => {
          return {
            login: user.login,
            html_url: user.html_url,
            avatar_url: user.html_url,
          };
        });
        this.users = users;
        this.isLoading = false;
      } catch (e) {
        console.log(e);
        this.user = null;
        this.isLoading = false;
        this.errorMsg = "网络故障，请刷新重试";
      }
    },
  },
};
</script>

<style scoped>
.card {
  float: left;
  width: 33.333%;
  padding: 0.75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: 0.75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>
