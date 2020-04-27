<template>
  <div>
    <p>
      clicked: {{ count }} tims,count
      {{ oddOrEven }}
    </p>

    <button @click="INCREMENT">+</button>
    <button @click="DECREMENT">-</button>
    <button @click="incrementIfOdd">increment if odd</button>
    <button @click="incrementAsync">increment async</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    // oddOrEven() {
    //   return this.$store.state.count % 2 === 0 ? "奇数" : "偶数";
    // },
    ...mapState(["count"]),
    ...mapGetters(["oddOrEven"]),
  },
  methods: {
    // increment() {
    //   this.$store.commit("INCREMENT");
    // },
    // decrement() {
    //   this.$store.commit("DECREMENT");
    // },
    // incrementIfOdd() {
    //   this.$store.dispatch("incrementIfOdd");
    // },
    // incrementAsync() {
    //   this.$store.dispatch("incrementAsync");
    // },
    ...mapActions(["incrementIfOdd", "incrementAsync"]),
    ...mapMutations(["INCREMENT", "DECREMENT"]),
  },
};
</script>

<style></style>
