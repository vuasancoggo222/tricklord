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
  if (!url.value) {
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
      message: data.error
        ? `Lỗi: Video ở chế độ riêng tư hoặc hiện không có sẵn.`
        : `${data.message}`,
    });
  } else {
    ElNotification({
      title: "Success",
      type: "success",
      message: `Lấy link tải xuống thành công.`,
    });
  }
  if (!data) {
    ElNotification({
      title: data,
      type: "error",
      message: `Không tìm thấy video !!`,
    });
  }

  loading.close();
};
</script>

<template>
  <div>
    <div>
      <el-tag class="mb-10" size="large"
        ><h2>Tải video & reel Facebook</h2></el-tag
      >
      <el-row :gutter="20" class="mb-10" justify="center">
        <el-col :span="16">
          <el-input
            v-model="url"
            size="large"
            placeholder="Nhập URL..."
            :suffix-icon="Search"
          />
        </el-col>
        <el-col :span="8">
          <el-button type="primary" size="large" @click="getFbDownload"
            >Lấy link</el-button
          >
        </el-col>
      </el-row>
      <div class="mb-10">
        <el-text v-if="isSubmit">
          Trạng thái :{{
            watchData?.success ? "Thành công" : "Thất bại"
          }}</el-text
        >
      </div>
      <br />
      <template v-if="watchData">
        <el-tag class="mb-10" type="primary"
          ><h3>{{ watchData.title }}</h3></el-tag
        >
        <el-row class="mb-10" v-for="(link, index) in watchData.links">
          <el-col>
            <el-button
              ><el-link :underline="false" :href="link">
                {{ index }}</el-link
              ></el-button
            >
          </el-col>
        </el-row>
      </template>
    </div>
  </div>
</template>

<style>
.mb-10 {
  margin-bottom: 10px;
}
</style>
