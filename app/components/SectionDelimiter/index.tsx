export default defineComponent({
  name: 'SectionDelimiter',

  setup(props, { slots }) {
    return () => {
      return (
        <div
          class={cn(
            'h-px flex before:content-[""] before:h-full before:flex before:mr-2 before:bg-white after:content-[""] after:h-full before:basis-8 after:flex-1 after:bg-white/50',
          )}
        />
      );
    };
  },
});
