<script setup lang="ts"> 
definePageMeta({
  title: 'Chuyển văn bản thành giọng nói'
})
const chooseLang = ref('')
const lang = ref([])
const textContent = ref("")
const headers = {
    'X-RapidAPI-Key': 'ba86e4ddbdmsh1c394ed2fdbd863p1c9bc3jsnd7934ae40f62',
    'X-RapidAPI-Host': 'text-to-speech27.p.rapidapi.com',
  }
const querySearch = (queryString: string, cb: any) => {
  const results = queryString
    ? lang.value.filter(createFilter(queryString))
    : lang.value
  cb(results)
}
const createFilter = (queryString: string) => {
  return (lang: any) => {
    return (
        lang.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}
const loadAll = async () => {
  const api =  'https://text-to-speech27.p.rapidapi.com/speech/lang';
  const params = {}
  const {data} = await useCustomFetch(api, params, headers);   
  let langAccept = [];
  for(let i = 0 ; i < Object.keys(data.value).length ; i++){
    const lang = {
        link : Object.values(data.value)[i],
        value : Object.keys(data.value)[i],
    }
    langAccept.push(lang)
  }
  console.log(langAccept);
  
  return langAccept;
}

const textToSpeech = async () => {
    const api =  'https://text-to-speech27.p.rapidapi.com/speech';
    const params = {
        text : textContent.value,
        lang : chooseLang.value
    }
    if(!params.lang){
        ElNotification({
      title: "Error",
      type: "error",
      message:  `Vui lòng chọn ngôn ngữ giọng nói.`
    });
        return;
    }
    if(!params.text){
        ElNotification({
      title: "Error",
      type: "error",
      message:  `Vui lòng nhập văn bản.`
    });
        return;
    }
    const {data} = await useCustomFetch(api, params, headers);
}
const handleSelect = (item) => {
  console.log(item)
}
onMounted( async () => {
   lang.value = await loadAll()  
})
</script>

<template>
  <div>
    <el-autocomplete
        v-model="chooseLang"
        :fetch-suggestions="querySearch"
        clearable
        value-key="value"
        @select="handleSelect"
        class="inline-input w-50"
        placeholder="Vui lòng chọn ngôn ngữ"
      />
      <el-input
     style="margin-top: 20px"
    v-model="textContent"
    :rows="4"
    type="textarea"
    placeholder="Vui lòng nhập văn bản"
  />
    <div>
        <el-button @click="textToSpeech" type="primary">Chuyển đổi</el-button>
    </div>
  </div>
</template>