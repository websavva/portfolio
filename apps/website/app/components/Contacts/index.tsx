import { NuxtIcon, NuxtLink } from '#components';

export default defineComponent({
  name: 'Contacts',

  props: {
    class: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const $t = useI18nTranslation();

    const bio = useBio();

    const socialLinks = computed(() => {
      return [
        {
          name: 'Email',
          url: `mailto:${bio.value.email}`,
          icon: 'codicon:mail',
        },
        ...bio.value.socialLinks,
      ];
    });

    function onContactMeClick() {
      scrollToElement('contact-form');
    }

    return () => {
      return (
        <div
          class={cn('flex items-center gap-3', props.class)}
        >
          {socialLinks.value.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: 10 }}
              transition={{
                duration: 0.25,
                delay: (index + 1) * 0.2,
                ease: 'easeOut',
              }}
              whileInView={{ opacity: 1, y: 0 }}
              inViewOptions={{
                once: true,
              }}
            >
              <NuxtLink href={link.url}>
                <NuxtIcon
                  name={link.icon}
                  class={cn('size-7')}
                />
              </NuxtLink>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            transition={{
              duration: 0.25,
              delay:
                (bio.value.socialLinks.length + 1) * 0.2,
              ease: 'easeOut',
            }}
            whileInView={{ opacity: 1, y: 0 }}
            inViewOptions={{
              once: true,
            }}
          >
            <NuxtLink
              href="/#contact-form"
              class={cn(
                'group inline-flex items-center gap-1.5',
                'relative text-editor-fg',
                'after:absolute after:bottom-[-2px] after:left-0 after:h-[2px]',
                'after:w-0 after:bg-current after:transition-all after:duration-300',
                'hover:after:w-full',
              )}
              onClick={onContactMeClick}
            >
              {$t('contactMe')}

              <NuxtIcon
                name="codicon:arrow-right"
                class={cn(
                  'text-sm transition-transform duration-300',
                  'group-hover:translate-x-1',
                )}
              />
            </NuxtLink>
          </motion.div>
        </div>
      );
    };
  },
});
