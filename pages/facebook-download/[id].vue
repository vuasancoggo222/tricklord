<script setup> 
const route = useRoute()
</script>

<template>
  <div>
   {{ route.params.id }}
   <el-button @click="$router.go(-1)"></el-button>
  </div>

</template>