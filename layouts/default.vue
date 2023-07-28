<template>
    <div>
      <div v-show="$route.path !== '/'" @click="$router.go(-1)" style="width: 30px; margin-bottom: 10px;">
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0z"></path></svg>
        <el-tag style="margin-top: 10px;" size="large"
        ><h2>{{ route.meta.title }}</h2></el-tag
      >
      </div>
      <slot />
    </div>
  </template>

<script setup>
const route = useRoute()
useHead({
  meta: [{ property: 'og:title', content: `${route.meta.title}` }]
})
</script>