<script setup>
definePageMeta({
  title: 'Tải video & reel Facebook'
})
const url = ref("");
const watchData = ref();
const isSubmit = ref(false);
const getFbDownload = async () => {
  watchData.value = null;
  const params = { url: url.value };
  const api =
    "https://facebook-reel-and-video-downloader.p.rapidapi.com/app/main.php";
  const headers = {
    "X-RapidAPI-Key": "4649d21271msh0897a9f11f44a47p128308jsnb81e33b7b69a",
    "X-RapidAPI-Host": "facebook-reel-and-video-downloader.p.rapidapi.com",
  };
  if (!url.value) {
    ElNotification({
      title: "Error",
      type: "error",
      message: `Không được để trống url.`,
    });
    return;
  }
  const { data } = await useCustomFetch(api, params, headers);
  watchData.value = data.value;
  isSubmit.value = true;
  if (!data.value.success) {
    ElNotification({
      title: "Error",
      type: "error",
      message:  `Lỗi: Video ở chế độ riêng tư hoặc hiện không có sẵn.`
    });
  } else {
    ElNotification({
      title: "Success",
      type: "success",
      message: `Lấy link tải xuống thành công.`,
    });
  }
  if (!data.value) {
    ElNotification({
      title: data,
      type: "error",
      message: `Không tìm thấy video !!`,
    });
  }
};
</script>

<template>
  <div>
    <div>
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
        <div class="mb-10">
          <el-image  :src="watchData.thumbnail" lazy />
        </div>
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
