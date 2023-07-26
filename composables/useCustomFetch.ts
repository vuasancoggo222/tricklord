import { UseFetchOptions } from "nuxt/app";

export function useCustomFetch<T>(
  url: string,
  params: {} = {},
  headers: any,
  method: any = "GET",
  watch: any = false,
  options: UseFetchOptions<T> = {}
) {
  let loading: any;
  const defaults: UseFetchOptions<T> = {
    baseURL: url,
    params,
    key: url,
    method,
    watch,
    ...options,
    headers,
    onRequest() {
      loading = ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
    },
    onResponse(_ctx) {
      loading.close();
    },
    onResponseError(_ctx) {
      loading.close();
    },
  };

  return useFetch(url, defaults);
}
