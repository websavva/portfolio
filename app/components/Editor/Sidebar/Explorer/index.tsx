import {
  NuxtIcon,
  EditorSidebarExplorerSection,
  EditorSidebarExplorerTree,
} from '#components';
import throttle from 'lodash-es/debounce';

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

    const openedFolders = ref<string[]>([
      'public',
      'src',
      'apps',
      'packages',
    ]);

    const isTreeOpened = ref(true);

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
            'flex flex-col text-editor-fg overflow-hidden [--editor-explorer-header-height:calc(var(--spacing)*12.5)] [--editor-explorer-section-header-height:calc(var(--spacing)*5)] [--editor-explorer-available-content-height:calc(var(--editor-body-height)-var(--editor-explorer-header-height)-5*var(--editor-explorer-section-header-height)-10px)]',
            props.class,
          )}
        >
          <div
            class={cn(
              'flex items-center justify-between py-3 pl-5 pr-4 text-xs uppercase h-[var(--editor-explorer-header-height)]',
            )}
          >
            <span>{$t('sidebar.explorer.title')}</span>

            <NuxtIcon
              name="codicon:ellipsis"
              class={cn('size-4')}
            />
          </div>

          <EditorSidebarExplorerSection disabled>
            {{
              title: () =>
                $t(
                  'sidebar.explorer.sectionTitles.openEditors',
                ),
            }}
          </EditorSidebarExplorerSection>

          <EditorSidebarExplorerSection
            v-model:isOpen={isTreeOpened.value}
            class={cn('border-t border-editor-border')}
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

          <EditorSidebarExplorerSection
            disabled
            class={cn('border-t border-editor-border')}
          >
            {{
              title: () =>
                $t(
                  'sidebar.explorer.sectionTitles.outline',
                ),
            }}
          </EditorSidebarExplorerSection>

          <EditorSidebarExplorerSection
            disabled
            class={cn('border-t border-editor-border')}
          >
            {{
              title: () =>
                $t(
                  'sidebar.explorer.sectionTitles.timeline',
                ),
            }}
          </EditorSidebarExplorerSection>

          <EditorSidebarExplorerSection
            disabled
            class={cn('border-t border-editor-border')}
          >
            {{
              title: () =>
                $t(
                  'sidebar.explorer.sectionTitles.scripts',
                ),
            }}
          </EditorSidebarExplorerSection>
        </div>
      );
    };
  },
});
