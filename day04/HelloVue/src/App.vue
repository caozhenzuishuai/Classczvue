<template>
  <div>
    <h1 class="title">{{ title }}</h1>
    <HelloWorld />
    <HelloWorld></HelloWorld>
    <hello-world></hello-world>
    <hello-world />
    <Hello />
    <img class="logo" src="./assets/images/logo.png" alt="logo" />
    <img class="logo" src="./assets/images/川上富江.png" alt="" />
  </div>
</template>

<script>
import HelloWorld from "@comps/HelloWorld";
export default {
  data() {
    return {
      title: "今天真好啊",
    };
  },
  components: {
    HelloWorld,
  },
};
</script>

<style scopet>
.title {
  color: green;
}
.logo {
  display: block;
  width: 500px;
  height: 500px;
}
</style>
