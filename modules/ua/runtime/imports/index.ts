export * from './types';

export const useUa = () => {
  return useNuxtApp().$ua;
};