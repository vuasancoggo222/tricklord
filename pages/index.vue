
<template>
  <div class="main-wrap">
    <div class="button-wrap">
    <el-button class="function-button"  size="large" type="primary" @click="$router.push('/facebook-download')">Tải Xuống Facebook Reel & Video</el-button>
   </div>
    <div class="button-wrap">
      <el-button class="function-button"  size="large" type="danger" @click="$router.push('/text-to-speech')">Chuyển văn bản thành giọng nói</el-button>
    </div>
  </div>
</template>

<script setup>

useHead({
  title: 'Home page',
})
</script>

<style>
.main-wrap{
  padding: 10%;
}
.button-wrap{
 margin: 15px 0 ;
}
.function-button {
  width: 100%;
}
</style>