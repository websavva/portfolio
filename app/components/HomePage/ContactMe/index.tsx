import { Transition } from 'vue';

import {
  HomePageSection,
  HomePageContactMeInput,
} from '#components';

import type { ContactDto } from '#server/dtos';

const getDefaultForm = (): ContactDto => {
  return {
    name: '',
    email: '',
    company: '',
    message: '',
  };
};

interface Toast {
  message: string;
  type: 'success' | 'error';
}

export default defineComponent({
  name: 'HomePageContactMe',

  props: {
    class: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const $t = useI18nTranslation();

    const content = useCurrentPageContent();

    const form = ref(getDefaultForm());

    const pending = ref(false);

    const currentToast = ref<Toast | null>(null);

    const formFieldNames = computed(() => {
      return Object.keys(
        form.value,
      ) as (keyof ContactDto)[];
    });

    function showToast(
      message: string,
      type: 'success' | 'error',
    ) {
      currentToast.value = {
        message,
        type,
      };

      setTimeout(() => {
        currentToast.value = null;
      }, 4000);
    }

    async function onSubmit() {
      if (pending.value) return;

      pending.value = true;

      try {
        await new Promise((resolve) =>
          setTimeout(resolve, 1000),
        );

        await $fetch('/api/contact', {
          method: 'POST',
          body: form.value,
        });

        showToast(
          content.value.contactMe.successMessage,
          'success',
        );
        form.value = getDefaultForm();
      } catch (error: any) {
        console.error(error);

        showToast(
          error.data?.message ||
            content.value.contactMe.errorMessage,
          'error',
        );
      } finally {
        pending.value = false;
      }
    }

    return () => {
      return (
        <HomePageSection
          iconName="codicon:mail"
          color="blue"
          subtitle={content.value.contactMe.subtitle}
          class={props.class}
        >
          {{
            title: () => $t('contactMe'),
            default: () => (
              <>
                <form
                  id="contact-form"
                  onSubmit={withModifiers(onSubmit, [
                    'prevent',
                  ])}
                >
                  <div class={cn('flex flex-col')}>
                    <HomePageContactMeInput
                      label={
                        content.value.contactMe.labels.name
                      }
                      id="name"
                      v-model={form.value.name}
                    />
                    <HomePageContactMeInput
                      label={
                        content.value.contactMe.labels.email
                      }
                      id="email"
                      type="email"
                      v-model={form.value.email}
                    />
                    <HomePageContactMeInput
                      label={
                        content.value.contactMe.labels
                          .company
                      }
                      id="company"
                      maxLength={100}
                      v-model={form.value.company}
                    />
                    <HomePageContactMeInput
                      label={
                        content.value.contactMe.labels
                          .message
                      }
                      id="message"
                      maxLength={5000}
                      v-model={form.value.message}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={pending.value}
                    class={cn(
                      'mt-6 ml-auto block px-10 py-3',
                      'font-medium',
                      'bg-[var(--section-color)]/30 text-[var(--section-color)]',
                      'border border-blue-500/30',
                      'rounded-xl',
                      'transition-all duration-200',
                      'disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed',
                    )}
                  >
                    {content.value.contactMe.submit}
                  </button>
                </form>

                {/* Toast Notifications */}
                <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
                  <Transition
                    enterFromClass="opacity-0"
                    enterToClass="opacity-1"
                    leaveFromClass="opacity-1"
                    leaveToClass="opacity-1"
                    leaveActiveClass="transition-all"
                    enterActiveClass="transition-all"
                  >
                    {currentToast.value && (
                      <div
                        class={cn(
                          'pointer-events-auto',
                          'px-4 py-3 rounded-lg',
                          'backdrop-blur-sm',
                          'border shadow-lg',
                          'animate-in',
                          'duration-300',
                          currentToast.value.type ===
                            'success' && [
                            'bg-green-500/10 border-green-500/30',
                            'text-green-400',
                          ],
                          currentToast.value.type ===
                            'error' && [
                            'bg-red-500/10 border-red-500/30',
                            'text-red-400',
                          ],
                        )}
                      >
                        <div class="flex items-center gap-3">
                          <span class="text-lg">
                            {currentToast.value.type ===
                            'success'
                              ? '✓'
                              : '✕'}
                          </span>
                          <span class="text-sm font-medium">
                            {currentToast.value.message}
                          </span>
                        </div>
                      </div>
                    )}
                  </Transition>
                </div>
              </>
            ),
          }}
        </HomePageSection>
      );
    };
  },
});
