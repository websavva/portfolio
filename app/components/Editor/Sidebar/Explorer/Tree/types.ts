export interface ExplorerTreeBaseItem {
  id: string;
  name?: string;
  disabled?: boolean;
}

export interface ExplorerTreeFileItem
  extends ExplorerTreeBaseItem {
  type: 'file';
  icon: string;
  path?: string;
}

export interface ExplorerTreeFolderItem
  extends ExplorerTreeBaseItem {
  type: 'folder';
  icon: Record<'closed' | 'open', string> | string;
  children?: Array<
    ExplorerTreeFileItem | ExplorerTreeFolderItem
  >;
}

export const defineExplorerTree = (
  items: Array<
    ExplorerTreeFileItem | ExplorerTreeFolderItem
  >,
) => {
  return items;
};

export const treeItems = defineExplorerTree([
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
    children: [
      {
        id: 'README.md',
        type: 'file',
        path: '/',
        icon: 'material-icon-theme:readme',
      },
    ],
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
        children: [
          {
            id: 'Shortqix',
            type: 'file',
            icon: 'material-icon-theme:nuxt',
          },
          {
            id: 'WebBid',
            type: 'file',
            icon: 'material-icon-theme:next',
          },
        ],
      },
      {
        id: 'packages',
        type: 'folder',
        icon: {
          closed: 'material-icon-theme:folder-packages',
          open: 'material-icon-theme:folder-packages-open',
        },
        children: [
          {
            id: 'nuxtignore-dev',
            type: 'file',
            icon: 'material-icon-theme:nuxt',
          },
        ],
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
