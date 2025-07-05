/**
 * Recursivamente aplana un tipo de objeto en una cadena de texto usando el carácter '.' como separador.
 * @example
 * // { a: { b: { c: 1 } } } -> 'a.b.c'
 *
 * @template T - El tipo de objeto a aplana.
 * @returns El tipo de objeto aplanado.
 */
export type Flatten<T> = T extends object
    ? {
          [K in keyof T & string]: T[K] extends Array<unknown>
              ? `${K}.*.${Flatten<T[K][number]> & string}` | K
              : NonNullable<T[K]> extends object
                ? `${K}.${Flatten<T[K]> & string}` | K
                : K;
      }[keyof T & string]
    : never;
