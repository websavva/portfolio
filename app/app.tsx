import { NuxtIcon } from '#components';

export default defineComponent({
  setup() {
    return () => {
      return (
        <h1 class={cn('text-3xl font-bold text-primary flex')}>
          Hello World
          <NuxtIcon name="codicon:source-control" />

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <NuxtIcon name="codicon:source-control" />
          </motion.div>
        </h1>
      );
    };
  },
});
