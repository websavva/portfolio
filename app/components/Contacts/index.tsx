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
    const $t = useI18nTranslation()

    const bio = useBio();

    return () => {
      return (
        <div
          class={cn('flex items-center gap-3', props.class)}
        >
          {bio.value.socialLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: 10 }}
              transition={{
                duration: 0.25,
                delay: index * 0.2,
                ease: 'easeOut',
              }}
              whileInView={{ opacity: 1, y: 0 }}
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
              delay: bio.value.socialLinks.length * 0.2,
              ease: 'easeOut',
            }}
            whileInView={{ opacity: 1, y: 0 }}
          >
          <NuxtLink
            href="/#contact-form"
            class={cn(
              'group inline-flex items-center gap-1.5',
              'relative opacity-80',
              'after:absolute after:bottom-[-2px] after:left-0 after:h-[2px]',
              'after:w-0 after:bg-current after:transition-all after:duration-300',
              'hover:after:w-full',
            )}
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
