import debounce from 'lodash-es/debounce';
import {
  EditorTopBar,
  EditorFooter,
  EditorSidebar,
  EditorTabsList,
} from '#components';

export default defineComponent({
  name: 'Editor',

  props: {
    class: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots }) {
    const $router = useRouter();
    const $ua = useUa();

    const screenFullHeight = ref<string>('100dvh');

    const styleProvider = computed(() => {
      return {
        '--editor-screen-full-height':
          screenFullHeight.value,
      };
    });

    const { closeSidebar } = useSidebarToggler();

    const mainElRef =
      useTemplateRef<HTMLDivElement>('main');

    let routerBeforeEachHookRemover: () => void;

    let routerAfterEachHookRemover: () => void;

    function updateScreenFullHeight() {
      screenFullHeight.value = window.innerHeight + 'px';
    }

    const onWindowResize = debounce(
      updateScreenFullHeight,
      200,
    );

    onMounted(() => {
      routerBeforeEachHookRemover = $router.beforeEach(
        (to, from) => {
          if (to.path !== from.path) {
            setTimeout(() => {
              mainElRef.value?.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }, 50);
          }
        },
      );

      routerAfterEachHookRemover = $router.afterEach(() => {
        if ($ua.isDesktop) return;

        setTimeout(() => {
          closeSidebar();
        }, 50);
      });

      if (!window.CSS?.supports('height: 100dvh')) {
        updateScreenFullHeight();

        window.addEventListener('resize', onWindowResize);
      }
    });

    onUnmounted(() => {
      routerBeforeEachHookRemover?.();
      routerAfterEachHookRemover?.();

      window.removeEventListener('resize', onWindowResize);
    });

    return () => {
      return (
        <div
          class={cn(
            'h-[var(--editor-screen-full-height)] max-h-[var(--editor-screen-full-height)] [--editor-top-bar-height:calc(var(--spacing)*12.5)] [--editor-footer-height:calc(var(--spacing)*7.5)] [--editor-body-height:calc(var(--editor-screen-full-height)-var(--editor-top-bar-height)-var(--editor-footer-height))] [--editor-body-tabs-list-height:calc(var(--spacing)*12)] [--editor-body-content-height:calc(var(--editor-body-height)-var(--editor-body-tabs-list-height))]',
            props.class,
          )}
          style={styleProvider.value}
        >
          <EditorTopBar
            class={cn(
              'w-full col-span-full h-[var(--editor-top-bar-height)]',
            )}
          />

          <div
            class={cn(
              'h-[var(--editor-body-height)] max-h-[var(--editor-body-height)] flex',
            )}
          >
            <EditorSidebar class={cn('h-full')} />

            <div
              class={cn(
                'grid flex-1 h-full grid-rows-[var(--editor-body-tabs-list-height)_var(--editor-body-content-height)]',
              )}
            >
              <EditorTabsList
                class={cn(
                  'h-[var(--editor-body-tabs-list-height)]',
                )}
              />

              <main
                ref="main"
                class={cn(
                  'break-words h-[var(--editor-body-content-height)] overflow-y-auto text-white overflow-x-hidden max-w-full custom-scrollbar',
                )}
              >
                {slots.default?.()}
              </main>
            </div>
          </div>

          <EditorFooter
            class={cn(
              'w-full col-span-full h-[var(--editor-footer-height)]',
            )}
          />
        </div>
      );
    };
  },
});
