export type PrimitiveDataType =
  | string
  | number
  | boolean
  | undefined
  | null
  | bigint
  | symbol;

export type WithFirestoreId<T> = T & {
  _id: string;
};
