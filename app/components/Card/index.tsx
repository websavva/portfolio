export default defineComponent({
  name: 'Card',

  props: {
    class: {
      type: String,
      default: '',
    },
    glowClassName: {
      type: String,
      default: '',
    },
  },

  setup(props, { slots }) {
    const mouseX = ref(0);
    const mouseY = ref(0);
    const width = ref(0);
    const height = ref(0);

    const containerRef = ref<HTMLDivElement | null>(null);

    function onMouseMove(e: MouseEvent) {
      if (!containerRef.value) return;

      const { clientX, clientY } = e;

      const { left, top } =
        containerRef.value.getBoundingClientRect();
      const localX = clientX - left;
      const localY = clientY - top;

      mouseX.value = localX;
      mouseY.value = localY;
    }

    onMounted(() => {
      if (containerRef.value) {
        width.value = containerRef.value.clientWidth;
        height.value = containerRef.value.clientHeight;
      }
    });

    const style = computed(() => ({
      '--card-width': width.value + 'px',
      '--card-height': height.value + 'px',
      '--card-mouse-x': mouseX.value + 'px',
      '--card-mouse-y': mouseY.value + 'px',
    }));

    return () => (
      <div
        ref={containerRef}
        onMousemove={onMouseMove}
        style={style.value}
        class={cn(
          'overflow-hidden p-6 sm:p-8 lg:p-12 relative rounded-2xl border border-editor-background-secondary hover:shadow-lg select-none hover:shadow-(color:--card-color)/50 [transition:box-shadow_300ms_ease-out]',
          'before:content-[""] before:absolute before:inset-0 before:bg-gradient-to-r before:blur-lg before:opacity-0 hover:before:opacity-20 before:transition before:duration-700 before:from-[var(--card-color)] before:to-[var(--card-color)] before:pointer-events-none',
          'before:mask-[radial-gradient(calc(0.6*var(--card-width))_at_var(--card-mouse-x)_var(--card-mouse-y),var(--card-color),transparent)]',
          props.class,
        )}
      >
        {slots.default?.()}
      </div>
    );
  },
});
