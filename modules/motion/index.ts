import { defineNuxtModule, addImports } from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'motion',
  },

  moduleDependencies: {
    'motion-v/nuxt': {
      defaults: {
        components: true,
        utilities: true,
      },
    },
  },

  setup() {
    addImports({
      from: 'motion-v',
      name: 'motion',
    });
  },
});
