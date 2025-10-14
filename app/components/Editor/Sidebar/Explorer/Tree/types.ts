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
