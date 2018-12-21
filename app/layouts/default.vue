<template>
  <div>
    <!-- 個別に指定がない限りThe Headerを読み込む -->
    <TheHeader />
    <div class="wrapper">
      <nuxt class="container" />
    </div>
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader.vue'

export default {
  components: {
    TheHeader
  }
}
</script>