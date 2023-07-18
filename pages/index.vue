
<template>
  <div>
    <Head>
      <Title>Home</Title>
      <Meta name="description" content="Home" />
    </Head>
    <el-button >{{ foo }}</el-button>
  <ElButton :icon="ElIconEditPen" type="success">button</ElButton>
  <LazyElButton type="warning">lazzy button</LazyElButton>
  </div>
  <ContentDoc />
</template>

<script setup>
const foo = useFoo('trick-lor')
useHead({
  title: 'Home page',
})
</script>