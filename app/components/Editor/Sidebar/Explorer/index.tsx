import {
  NuxtIcon,
  EditorSidebarExplorerSection,
} from '#components';

export default defineComponent({
  name: 'EditorSidebarExplorer',

  props: {
    class: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const $t = useI18nTranslation();

    const contentElRef = ref<HTMLDivElement | null>(null);
    const availableContentHeight = ref(0);

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

    const repoSectionActionIcons = [
      'codicon:new-file',
      'codicon:new-folder',
      'codicon:refresh',
      'codicon:collapse-all',
    ];

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
                          'rounded-md p-1 hover:bg-editor-background-secondary transition',
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
                    <h1>Hello</h1>
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
