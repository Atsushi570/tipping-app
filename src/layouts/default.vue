<template>
  <div>
    <Logo />
    <nuxt />
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
