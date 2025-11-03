type GenNode<
  K extends string | number,
  IsRoot extends boolean,
> = IsRoot extends true
  ? `${K}`
  :
      | `.${K}`
      | (K extends number ? `[${K}]` | `.[${K}]` : never);

export type ObjectKeyPaths<
  T extends object,
  IsRoot extends boolean = true,
  K extends keyof T = T extends Array<any>
    ? Extract<keyof T, number>
    : keyof T,
> = K extends string | number
  ?
      | GenNode<K, IsRoot>
      | (T[K] extends object
          ? `${GenNode<K, IsRoot>}${ObjectKeyPaths<
              T[K],
              false
            >}`
          : never)
  : never;

export type GetI18DictionaryValueByPath<
  T extends Record<string, any>,
  Path extends string,
> = Path extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? GetI18DictionaryValueByPath<T[K], Rest>
    : never
  : Path extends keyof T
    ? T[Path]
    : never;
