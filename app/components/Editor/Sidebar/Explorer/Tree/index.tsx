import { NuxtIcon, NuxtLink } from '#components';

import {
  type ExplorerTreeFileItem,
  type ExplorerTreeFolderItem,
} from './types';

const itemBaseClass = cn(
  'flex items-center py-[calc(var(--spacing)*0.9)] hover:bg-editor-background-secondary transition data-[item-type="folder"]:pl-[calc((var(--level)+1)*(var(--spacing)*4))] data-[item-type="file"]:pl-[calc(var(--spacing)*9+var(--level)*var(--spacing)*3.5)] relative',
);

const EditorSidebarExplorerTree = defineComponent({
  name: 'EditorSidebarExplorerTree',

  props: {
    class: {
      type: String,
      default: '',
    },

    openedFolders: {
      type: Array as PropType<string[]>,
      default: () => [],
    },

    items: {
      type: Array as PropType<
        Array<ExplorerTreeFileItem | ExplorerTreeFolderItem>
      >,
      default: () => [],
    },

    level: {
      type: Number,
      default: 0,
    },
  },

  emits: {
    'update:openedFolders': (value: string[]) => true,
  },

  setup(props, { emit }) {
    const $route = useRoute();

    const compOpenedFolders = useCompValue(
      emit,
      props,
      'openedFolders',
    );

    function onFolderToggle(
      folderId: string,
      isOpen: boolean,
    ) {
      if (isOpen) {
        compOpenedFolders.value = [
          ...compOpenedFolders.value,
          folderId,
        ];
      } else {
        compOpenedFolders.value =
          compOpenedFolders.value.filter(
            (folder) => folder !== folderId,
          );
      }
    }

    return () => {
      return (
        <div class={cn('flex flex-col', props.class)}>
          {props.items.map((item) => {
            const style = {
              '--level': props.level,
            };

            const levelDelimiters = Array.from(
              { length: props.level },
              (_, i) => {
                return (
                  <span
                    key={i}
                    class={cn(
                      'absolute top-0 left-[calc((var(--spacing)*6)+var(--level-delimiter-index)*var(--spacing)*4)] w-[.5px] bg-editor-fg/20 h-full',
                    )}
                    style={{
                      '--level-delimiter-index': i,
                    }}
                  />
                );
              },
            );

            if (item.type === 'folder') {
              const isOpen =
                compOpenedFolders.value.includes(item.id);

              const iconName =
                typeof item.icon === 'string'
                  ? item.icon
                  : isOpen
                  ? item.icon.open
                  : item.icon.closed;

              return (
                <>
                  <div
                    key={item.id}
                    class={cn(itemBaseClass)}
                    onClick={() =>
                      !item.disabled &&
                      onFolderToggle(item.id, !isOpen)
                    }
                    data-item-type="folder"
                    style={style}
                  >
                    {levelDelimiters}

                    <NuxtIcon
                      name="codicon:chevron-right"
                      class={cn('size-5 mr-1', {
                        'rotate-90': isOpen,
                      })}
                    />

                    <NuxtIcon
                      name={`material-icon-theme:${iconName}`}
                      class={cn('size-5')}
                    />

                    <span
                      class={cn('ml-2', {
                        'opacity-50': item.disabled,
                      })}
                    >
                      {item.name || item.id}
                    </span>
                  </div>
                  {!!item.children?.length && (
                    <EditorSidebarExplorerTree
                      v-show={isOpen}
                      v-model:openedFolders={
                        compOpenedFolders.value
                      }
                      items={item.children}
                      level={props.level + 1}
                    />
                  )}
                </>
              );
            } else {
              const Component = item.path
                ? NuxtLink
                : 'div';

              const props = item.path
                ? {
                    href: item.path,
                  }
                : null;

              return (
                <Component
                  {...props}
                  key={item.id}
                  class={cn(itemBaseClass, {
                    ['bg-editor-background-secondary']:
                      item.path &&
                      $route.path === item.path,
                  })}
                  data-item-type="file"
                  style={style}
                >
                  {levelDelimiters}

                  <NuxtIcon
                    name={`material-icon-theme:${item.icon}`}
                    class={cn('size-5')}
                  />

                  <span class={cn('ml-2')}>
                    {item.name || item.id}
                  </span>
                </Component>
              );
            }
          })}
        </div>
      );
    };
  },
});

export default EditorSidebarExplorerTree;
