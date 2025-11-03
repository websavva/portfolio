import { parse } from 'bowser';

import type { Ua } from './imports/types';

export default defineNuxtPlugin((nuxtApp) => {
  const uaHeaderValue = useRequestHeader('user-agent')!;

  const baseUa = parse(uaHeaderValue);

  const ua: Ua = {
    ...baseUa,
    isMobile: baseUa.platform.type === 'mobile',
    isTablet: baseUa.platform.type === 'tablet',
    isDesktop: baseUa.platform.type === 'desktop',
  };

  nuxtApp.payload.ua = ua;

  return {
    provide: {
      ua,
    },
  };
});
