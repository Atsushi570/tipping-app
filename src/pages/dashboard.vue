<template>
  <div>hello {{ displayName }}</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('auth', ['displayName'])
  }
}
</script>
