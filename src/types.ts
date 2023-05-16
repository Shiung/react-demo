/**
 * Expand an item a single level, or recursively.
 * Source: https://stackoverflow.com/a/69288824/62937
 */
export declare type Expand<T> = T extends (...args: infer A) => infer R
  ? (...args: Expand<A>) => Expand<R>
  : T extends infer O
  ? {
      [K in keyof O]: O[K]
    }
  : never
export declare type ExpandRecursively<T> = T extends (...args: infer A) => infer R
  ? (...args: ExpandRecursively<A>) => ExpandRecursively<R>
  : T extends object
  ? T extends infer O
    ? {
        [K in keyof O]: ExpandRecursively<O[K]>
      }
    : never
  : T

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

export type PartialExcept<T, K extends keyof T> = RecursivePartial<T> & Pick<T, K>
