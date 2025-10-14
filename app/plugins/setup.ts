export default defineNuxtPlugin({
  env: {
    islands: false,
  },

  async setup() {
    if (import.meta.server) {
      const pages = usePages();

      const localeFetch = useRequestFetch();

      const loadedPages = await localeFetch('/api/pages');

      pages.value = loadedPages;
    }
  },
});
