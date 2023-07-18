export const useCustomFetch = async (apiUrl : string, query : {}, headers : {},) => {
    const data = await $fetch(
        apiUrl,
        {
          query,
          headers,
        }
      ).catch((error) => error.data);
      return data;
}

