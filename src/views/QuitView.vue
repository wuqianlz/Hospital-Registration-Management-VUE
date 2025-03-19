<template>
  <div>
    <p>页面将在 {{ countdown }} 秒后自动关闭</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      countdown: 5
    };
  },
  mounted() {
    this.startCountdown();
  },
  methods: {
    startCountdown() {
      const timer = setInterval(() => {
        this.countdown -= 1;
        if (this.countdown === 0) {
          clearInterval(timer);
          this.quitPage();
        }
      }, 1000);
    },
    quitPage() {
      // 使用 JavaScript 的 window.close() 方法尝试关闭页面
      window.close();
    }
  }
};
</script>

<style>

</style>
