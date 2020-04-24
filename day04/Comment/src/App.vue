<template>
  <div>
    <header class="site-header jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h1>请发表对Vue的评论</h1>
          </div>
        </div>
      </div>
    </header>

    <div class="container">
      <!-- 3. 使用组件 -->
      <AddComment :addComment="addComment" />
      <CommentList :comments="comments" :delComment="delComment" />
    </div>
  </div>
</template>

<script>
// 1. 引入组件
import AddComment from "@comps/AddComment";
import CommentList from "@comps/CommentList";

export default {
  data() {
    return {
      comments: [
        { id: 1, name: "cz", content: "vue" },
        { id: 2, name: "caozhen", content: "vue1" },
      ],
    };
  },
  methods: {
    addComment(comment) {
      this.comments.unshift(comment);
    },
    delComment(id) {
      this.comments = this.comments.filter((comment) => comment.id !== id);
    },
  },
  components: {
    // 2. 注册组件
    AddComment,
    CommentList,
  },
};
</script>

<style></style>
