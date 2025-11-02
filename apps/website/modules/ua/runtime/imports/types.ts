import type { Parser } from 'bowser';

export interface Ua extends Parser.ParsedResult {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}
