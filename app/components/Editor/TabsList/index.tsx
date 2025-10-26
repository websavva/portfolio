import { NuxtIcon, EditorTabsListItem } from '#components';

const actionIconsNames = [
  'codicon:git-compare',
  'codicon:layout-sidebar-right-off',
  'codicon:ellipsis',
];
export default defineComponent({
  name: 'EditorTabsList',

  props: {
    class: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const $route = useRoute();
    const $router = useRouter();

    const allPages = usePages();

    const historyPaths = ref<string[]>([$route.path]);

    const tabs = computed(() => {
      return historyPaths.value.map((historyPath) => {
        const page = allPages.value.find(
          (page) =>
            page.path === historyPath ||
            page.realPath === historyPath,
        )!;

        const {
          id,
          title,
          iconName,
          path,
          realPath,
          fileName,
        } = page || {};

        return {
          name: fileName || title,
          iconName,
          path: realPath || path,
          isActive: historyPath === $route.path,
        };
      });
    });

    watch(
      () => $route.path,
      (newPath) => {
        if (!historyPaths.value.includes(newPath)) {
          historyPaths.value.push(newPath);
        }
      },
    );

    function onHistoryPathDelete(path: string) {
      if (historyPaths.value.length <= 1) return;

      const pathToDeleteIndex =
        historyPaths.value.indexOf(path);

      if (~pathToDeleteIndex) {
        const pathToReplace =
          historyPaths.value[pathToDeleteIndex - 1] ||
          historyPaths.value[pathToDeleteIndex + 1];

        historyPaths.value.splice(pathToDeleteIndex, 1);

        $router.push(pathToReplace!);
      }
    }

    return () => {
      return (
        <div
          class={cn(
            'flex items-center justify-between pr-3 border-b-2 border-editor-border max-w-full overflow-hidden',
            props.class,
          )}
        >
          <div class={cn('flex items-center hide-scrollbar max-w-full overflow-x-auto')}>
            {tabs.value.map((tab) => {
              return (
                <EditorTabsListItem
                  key={tab.path}
                  {...tab}
                  class={cn(
                    'border-r-1 border-r-editor-border',
                  )}
                  onDelete={onHistoryPathDelete}
                />
              );
            })}
          </div>

          <div class={cn('flex items-center space-x-1 max-xs:hidden')}>
            {actionIconsNames.map((iconName) => {
              return (
                <button
                  key={iconName}
                  class={cn(
                    'text-editor-fg hover:bg-editor-background-secondary transition-colors cursor-default p-1 rounded-md',
                  )}
                >
                  <NuxtIcon
                    name={iconName}
                    class={cn('size-4')}
                  />
                </button>
              );
            })}
          </div>
        </div>
      );
    };
  },
});
