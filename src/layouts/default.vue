<template>
  <div class="contents">
    <Logo />
    <nuxt class="main" />
    <Footer />
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Logo,
    Footer
  }
}
</script>

<style lang="scss" scoped>
.contents {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  .main {
    flex: 1;
  }
}
</style>
