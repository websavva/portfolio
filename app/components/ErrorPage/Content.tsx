import type { NuxtError } from '#app';

export default defineComponent({
  props: {
    error: {
      type: Object as PropType<
        Pick<
          NuxtError,
          | 'statusCode'
          | 'statusMessage'
          | 'message'
          | 'stack'
        >
      >,
      required: true,
    },

    class: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const $t = useI18nTranslation();

    const handleGoBack = () => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = '/';
      }
    };

    const handleGoHome = () => {
      window.location.href = '/';
    };

    const errorTitle = computed(() => {
      const statusCode = props.error.statusCode;

      if (statusCode === 404) return $t('errorPage.titles.404');
      if (statusCode === 500) return $t('errorPage.titles.500');
      if (statusCode === 403) return $t('errorPage.titles.403');

      return $t('errorPage.titles.default');
    });

    const errorMessage = computed(() => {
      if (props.error.statusCode === 404) {
        return $t('errorPage.messages.404');
      }

      return (
        props.error.statusMessage ||
        props.error.message ||
        $t('errorPage.messages.default')
      );
    });

    useHead({
      title: errorTitle.value,
    });

    return () => {
      return (
        <div
          class={cn(
            'flex items-center justify-center h-full',
            'bg-editor-background',
            'px-4 py-8',
            props.class,
          )}
        >
          <div
            class={cn(
              'max-w-2xl w-full',
              'bg-editor-sidebar-bg/30 backdrop-blur-sm',
              'border border-editor-background-secondary/50',
              'rounded-2xl p-8 md:p-12',
              'text-center',
            )}
          >
            {/* Error Code */}
            <div
              class={cn(
                'text-8xl md:text-9xl font-bold',
                'text-primary/80',
                'mb-6',
              )}
            >
              {props.error.statusCode || '500'}
            </div>

            {/* Error Title */}
            <h1
              class={cn(
                'text-3xl md:text-4xl font-bold',
                'text-editor-fg',
                'mb-4',
              )}
            >
              {errorTitle.value}
            </h1>

            {/* Error Message */}
            <p
              class={cn(
                'text-base md:text-lg',
                'text-editor-fg/70',
                'mb-8',
                'leading-relaxed',
              )}
            >
              {errorMessage.value}
            </p>

            {/* Divider */}
            <div
              class={cn(
                'w-16 h-1 bg-primary',
                'mx-auto mb-8',
              )}
            />

            {/* Action Buttons */}
            <div
              class={cn(
                'flex flex-col sm:flex-row',
                'gap-4 justify-center',
              )}
            >
              <button
                onClick={handleGoBack}
                class={cn(
                  'px-6 py-3 rounded-lg',
                  'bg-editor-background-secondary',
                  'border border-editor-border',
                  'text-editor-fg',
                  'hover:border-primary/50',
                  'transition-all duration-300',
                  'font-medium',
                )}
              >
                {$t('errorPage.actions.goBack')}
              </button>

              <button
                onClick={handleGoHome}
                class={cn(
                  'px-6 py-3 rounded-lg',
                  'bg-primary',
                  'text-editor-background',
                  'hover:bg-primary/90',
                  'transition-all duration-300',
                  'font-medium',
                )}
              >
                {$t('errorPage.actions.goHome')}
              </button>
            </div>

            {/* Optional Debug Info (only in development) */}
            {import.meta.dev && props.error.stack && (
              <details
                class={cn(
                  'mt-8 text-left',
                  'text-xs text-editor-fg/70',
                  'bg-editor-background/50',
                  'rounded p-4',
                  'border border-editor-border/50',
                )}
              >
                <summary class="cursor-pointer font-mono mb-2">
                  {$t('errorPage.actions.debugInfo')}
                </summary>
                <pre class="whitespace-pre-wrap break-all font-mono">
                  {props.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    };
  },
});
