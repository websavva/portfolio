import type { InternalApi } from 'nitropack/types';

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
    icon: 'material-icon-theme:folder-nuxt',
  },
  {
    id: 'node_modules',
    type: 'folder',
    disabled: true,
    icon: 'material-icon-theme:folder-node',
  },
  {
    id: 'public',
    type: 'folder',
    icon: {
      closed: 'material-icon-theme:folder-public',
      open: 'material-icon-theme:folder-public-open',
    },
  },
  {
    id: 'src',
    type: 'folder',
    icon: {
      closed: 'material-icon-theme:folder-src',
      open: 'material-icon-theme:folder-src-open',
    },
    children: [
      {
        id: 'apps',
        type: 'folder',
        icon: {
          closed: 'material-icon-theme:folder-app',
          open: 'material-icon-theme:folder-app-open',
        },
      },
      {
        id: 'extensions',
        type: 'folder',
        icon: {
          closed: 'material-icon-theme:folder-plugin',
          open: 'material-icon-theme:folder-plugin-open',
        },
      },
      {
        id: 'packages',
        type: 'folder',
        icon: {
          closed: 'material-icon-theme:folder-packages',
          open: 'material-icon-theme:folder-packages-open',
        },
      },
    ],
  },
  {
    id: '.gitignore',
    type: 'file',
    icon: 'material-icon-theme:git',
  },
  {
    id: 'nuxt.config.ts',
    type: 'file',
    icon: 'material-icon-theme:nuxt',
  },
  {
    id: 'package.json',
    type: 'file',
    icon: 'material-icon-theme:nodejs',
  },
  {
    id: 'pnpm-lock.yaml',
    type: 'file',
    icon: 'material-icon-theme:pnpm',
  },
  {
    id: 'tsconfig.json',
    type: 'file',
    icon: 'material-icon-theme:tsconfig',
  },
]);

function transformPageToTreeItem(
  page: InternalApi['/api/pages']['get'][number],
): ExplorerTreeFileItem {
  return {
    id: page.id || page.path,
    name: page.fileName || page.title,
    type: 'file',
    icon: page.iconName,
    path: page.realPath || page.path,
  };
}

function addPagesToTree(
  treeItems: Array<
    ExplorerTreeFileItem | ExplorerTreeFolderItem
  >,
  allPages: InternalApi['/api/pages']['get'],
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
