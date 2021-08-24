type Undefined<T> = { [P in keyof T]: P extends undefined ? T[P] : never };

type FilterFlags<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};

type AllowedNames<Base, Condition> = FilterFlags<Base, Condition>[keyof Base];

type SubType<Base, Condition> = Pick<Base, AllowedNames<Base, Condition>>;

export type OptionalKeys<T> = Exclude<
  keyof T,
  NonNullable<keyof SubType<Undefined<T>, never>>
>;
export type RequiredKeys<T> = NonNullable<keyof SubType<Undefined<T>, never>>;

type NonTypePropNames<T, Target> = {
  [K in NonNullable<keyof T>]: T[K] extends Target ? never : K;
}[NonNullable<keyof T>];
export type NonTypeProps<T, Target> = Pick<T, NonTypePropNames<T, Target>>;
export type TypePropNames<T, Target> = {
  [K in NonNullable<keyof T>]: T[K] extends Target ? K : never;
}[NonNullable<keyof T>];
type TypeProps<T, Target> = Pick<T, TypePropNames<T, Target>>;
export type DateCvt<T> = NonTypeProps<T, Date | undefined> &
  {
    [P in TypePropNames<T, Date | undefined>]?: number;
  };
