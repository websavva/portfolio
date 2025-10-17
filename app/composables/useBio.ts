import { bioConfig } from '#config/bio';

export type Bio = FlattenI18nWord<typeof bioConfig>;

const bioInjectionKey = Symbol('bio') as InjectionKey<
  ComputedRef<Bio>
>;

export const provideBio = () => {
  const { locale } = useI18n();

  const bio = computed<Bio>(() => {
    return flattenI18nWord(bioConfig, locale.value);
  });

  provide(bioInjectionKey, bio);
};

export const useBio = () => {
  return inject(bioInjectionKey)!;
};
