import { computed } from 'vue-demi';

type EmitFn<E extends string> = (
  event: E,
  ...args: any[]
) => any;

export const useCompValue = <
  P extends Record<string, any>,
  K extends keyof P = 'modelValue',
>(
  emit: EmitFn<any>,
  props: P,
  // @ts-expect-error invalid type
  modelProp: K = 'modelValue',
  // @ts-expect-error invalid type
  event: string = `update:${modelProp}`,
) =>
  computed<P[K]>({
    get: () => props[modelProp],
    set: (newVal) => emit(event, newVal),
  });
