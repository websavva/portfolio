import {
  defineExplorerTree,
  type ExplorerTreeFolderItem,
  type ExplorerTreeFileItem,
} from './Tree/types';

const treeItems = defineExplorerTree([
  {
    id: '.nuxt',
    type: 'folder',
    disabled: true,
    icon: 'folder-nuxt',
  },
  {
    id: 'node_modules',
    type: 'folder',
    disabled: true,
    icon: 'folder-node',
  },
  {
    id: 'public',
    type: 'folder',
    icon: {
      closed: 'folder-public',
      open: 'folder-public-open',
    },
  },
  {
    id: 'src',
    type: 'folder',
    icon: {
      closed: 'folder-src',
      open: 'folder-src-open',
    },
    children: [
      {
        id: 'apps',
        type: 'folder',
        icon: {
          closed: 'folder-app',
          open: 'folder-app-open',
        },
      },
      {
        id: 'packages',
        type: 'folder',
        icon: {
          closed: 'folder-packages',
          open: 'folder-packages-open',
        },
      },
    ],
  },
  {
    id: '.gitignore',
    type: 'file',
    icon: 'git',
  },
  {
    id: 'nuxt.config.ts',
    type: 'file',
    icon: 'nuxt',
  },
  {
    id: 'package.json',
    type: 'file',
    icon: 'nodejs',
  },
  {
    id: 'pnpm-lock.yaml',
    type: 'file',
    icon: 'pnpm',
  },
  {
    id: 'tsconfig.json',
    type: 'file',
    icon: 'tsconfig',
  },
]);

function transformPageToTreeItem(
  page: Page,
): ExplorerTreeFileItem {
  return {
    id: page.id || page.path,
    name: page.title,
    type: 'file',
    icon: page.iconName,
    path: page.realPath || page.path,
  };
}

function addPagesToTree(
  treeItems: Array<
    ExplorerTreeFileItem | ExplorerTreeFolderItem
  >,
  allPages: Pages,
): Array<ExplorerTreeFileItem | ExplorerTreeFolderItem> {
  return treeItems.map((treeItem) => {
    if (treeItem.type === 'folder') {
      const folderPages = allPages
        .filter((page) => {
          const [_, parentFolderId] = page.path
            .split('/')
            .filter(Boolean)
            .reverse();

          return parentFolderId === treeItem.id;
        })
        .map(transformPageToTreeItem);

      const formattedChildren = [
        ...addPagesToTree(
          treeItem.children || [],
          allPages,
        ),
        ...folderPages,
      ];

      return {
        ...treeItem,
        children: formattedChildren,
      };
    } else {
      return treeItem;
    }
  });
}

export const useExplorerTree = () => {
  const pages = usePages();

  return computed(() => {
    return addPagesToTree(treeItems, pages.value);
  });
};
