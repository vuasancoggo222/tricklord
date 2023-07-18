<script setup>
const url = ref("");
const watchData = ref();
const isSubmit = ref(false);
const api =
  "https://facebook-reel-and-video-downloader.p.rapidapi.com/app/main.php";
const headers = {
  "X-RapidAPI-Key": "4649d21271msh0897a9f11f44a47p128308jsnb81e33b7b69a",
  "X-RapidAPI-Host": "facebook-reel-and-video-downloader.p.rapidapi.com",
};
const getFbDownload = async () => {
  watchData.value = null;
  if(!url.value){
    ElNotification({
      title: "Error",
      type: "error",
      message: `Không được để trống url.`,
    });
    return;
  }
  const loading = ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)",
  });
  const data = await useCustomFetch(api, { url: url.value }, headers);
  watchData.value = data;
  isSubmit.value = true;
  if (!data.success) {
    ElNotification({
      title: "Error",
      type: "error",
      message: data.error ?  `${data.error}` :  `${data.message}`,
    });
  }
  else{
    ElNotification({
      title: "Success",
      type: "success",
      message: `Get video successfully`,
    });
  }
  if (!data) {
    ElNotification({
      title: data,
      type: "error",
      message: `Cannot find video or reel !!`,
    });
  }
 
  loading.close();
};
</script>

<template>
  <div>
    <div>
      <span v-if="isSubmit">
        Trạng thái :{{ watchData?.success ? "Thành công" : "Thất bại" }}</span
      >
      <el-input v-model="url" />
      <el-button @click="getFbDownload">Submit</el-button>
      <template v-if="watchData">
        <h1>{{ watchData.title }}</h1>
        <div v-for="(link, index) in watchData.links">
          <span>{{ index }}</span> : <a :href="link"> {{ link }}</a>
          <br/>
        </div>
      </template>
    </div>
  </div>
</template>
