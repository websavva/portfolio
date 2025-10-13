import {
  NuxtIcon,
  EditorSidebarExplorerSection,
  EditorSidebarExplorerTree,
} from '#components';

import {
  treeItems,
  type ExplorerTreeFileItem,
  type ExplorerTreeFolderItem,
} from './Tree/types';

const repoSectionActionIcons = [
  'codicon:new-file',
  'codicon:new-folder',
  'codicon:refresh',
  'codicon:collapse-all',
];

export default defineComponent({
  name: 'EditorSidebarExplorer',

  props: {
    class: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const $route = useRoute();
    const $t = useI18nTranslation();

    const contentElRef = ref<HTMLDivElement | null>(null);
    const availableContentHeight = ref(0);
    const openedFolders = ref<string[]>([
      'public',
      'src',
      'apps',
      'packages',
    ]);

    const isTreeOpened = ref(false);

    onMounted(() => {
      if (!contentElRef.value) return;

      const sectionEl =
        contentElRef.value.querySelector<HTMLElement>(
          '[data-editor-explorer-section]',
        )!;

      availableContentHeight.value =
        contentElRef.value.offsetHeight -
        5 * sectionEl.offsetHeight;

      isTreeOpened.value = true;
    });

    function populateTreeBranchByPath(
      treeItems: Array<
        ExplorerTreeFileItem | ExplorerTreeFolderItem
      >,
      branch: string[],
      path: string,
    ) {
      for (const item of treeItems) {
        if (item.type === 'file' && item.path === path) {
          branch.push(item.id);

          return true;
        } else if (
          item.type === 'folder' &&
          item.children
        ) {
          const doesContainPath = populateTreeBranchByPath(
            item.children,
            branch,
            path,
          );

          if (doesContainPath) {
            branch.push(item.id);

            return true;
          }
        }
      }
    }

    watch(
      () => $route.path,
      (newPath) => {
        const branch: string[] = [];

        populateTreeBranchByPath(
          treeItems,
          branch,
          newPath,
        );

        for (const itemId of branch) {
          if (!openedFolders.value.includes(itemId))
            openedFolders.value.push(itemId);
        }
      },
    );

    return () => {
      return (
        <div
          class={cn(
            'flex flex-col text-editor-fg',
            props.class,
          )}
          style={{
            '--editor-explorer-available-content-height': `${availableContentHeight.value}px`,
          }}
        >
          <div
            class={cn(
              'flex items-center justify-between py-3 pl-5 pr-4 text-xs uppercase',
            )}
          >
            <span>{$t('sidebar.explorer.title')}</span>

            <NuxtIcon
              name="codicon:ellipsis"
              class={cn('size-4')}
            />
          </div>

          <div
            ref={contentElRef}
            class={cn(
              'flex flex-col flex-1 *:border-t-2 first:border-t-transparent *:border-t-editor-border',
            )}
          >
            <EditorSidebarExplorerSection
              disabled
              data-editor-explorer-section
            >
              {{
                title: () =>
                  $t(
                    'sidebar.explorer.sectionTitles.openEditors',
                  ),
              }}
            </EditorSidebarExplorerSection>

            <EditorSidebarExplorerSection
              v-model:isOpen={isTreeOpened.value}
            >
              {{
                title: () =>
                  $t('sidebar.explorer.sectionTitles.repo'),
                actions: () =>
                  repoSectionActionIcons.map((icon) => {
                    return (
                      <button
                        key={icon}
                        class={cn(
                          'rounded-md p-1 py-0.5 hover:bg-editor-background-secondary transition',
                        )}
                      >
                        <NuxtIcon
                          name={icon}
                          class={cn('size-4')}
                        />
                      </button>
                    );
                  }),
                default: () => (
                  <div>
                    <EditorSidebarExplorerTree
                      v-model:openedFolders={
                        openedFolders.value
                      }
                      items={treeItems}
                    />
                  </div>
                ),
              }}
            </EditorSidebarExplorerSection>

            <EditorSidebarExplorerSection disabled>
              {{
                title: () =>
                  $t(
                    'sidebar.explorer.sectionTitles.outline',
                  ),
              }}
            </EditorSidebarExplorerSection>

            <EditorSidebarExplorerSection disabled>
              {{
                title: () =>
                  $t(
                    'sidebar.explorer.sectionTitles.timeline',
                  ),
              }}
            </EditorSidebarExplorerSection>

            <EditorSidebarExplorerSection disabled>
              {{
                title: () =>
                  $t(
                    'sidebar.explorer.sectionTitles.scripts',
                  ),
              }}
            </EditorSidebarExplorerSection>
          </div>
        </div>
      );
    };
  },
});
