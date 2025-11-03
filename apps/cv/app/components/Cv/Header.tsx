import { NuxtIcon, NuxtLink } from '#components';
import meImageUrl from '@websavva/portoflio-core/public/me.webp?inline';

export default defineComponent({
  name: 'CvHeader',

  props: {
    class: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const $t = useI18nTranslation();
    const { locale } = useI18n();
    const bio = useBio();

    const ageLabel = computed(() => {
      const years = timePassedSince(
        bio.value.birthDate,
      ).years;

      const label = declineYears(years, {
        case: 'nominal',
        cases: {
          en: 'years old',
        },
        locale: locale.value,
      });

      return `${years} ${label}`;
    });

    const jobExperienceLabel = computed(() => {
      const years = timePassedSince(
        bio.value.careerStartDate,
      ).years;

      const label = declineYears(years, {
        case: 'nominal',
        locale: locale.value,
      });

      return `${years} ${label}`;
    });

    const socialLinks = computed(() => {
      const { hostname } = new URL(
        process.env.WS_PUBLIC_BASE_URL!,
      );

      return [
        ...bio.value.socialLinks.map((link) => ({
          icon: link.icon,
          name: link.name,
          url: link.url,
        })),
        {
          icon: 'codicon:globe',
          name: hostname,
          url: process.env.WS_PUBLIC_BASE_URL!,
        },
      ];
    });

    return () => (
      <header
        class={cn(
          'border-b-4 border-blue-600 pb-6',
          props.class,
        )}
      >
        <div class="grid grid-cols-[1fr_auto] gap-8 items-start mb-6">
          <div class="space-y-2">
            <h1 class="text-4xl font-bold text-gray-900 leading-tight">
              {bio.value.fullName}
            </h1>
            <h2 class="text-2xl font-semibold text-blue-600">
              {bio.value.position}
            </h2>

            {/* Contact Info */}
            <div class="grid grid-cols-2 grid-rows-3 grid-flow-col gap-3 text-sm text-gray-600 mt-5">
              <div class="flex items-center">
                <NuxtIcon
                  name="codicon:calendar"
                  class="text-blue-600 size-4 mr-2"
                />
                <span class="mr-1 text-gray-500">
                  {$t('age')}:
                </span>
                <span class="font-semibold">
                  {ageLabel.value}
                </span>
              </div>

              <div class="flex items-center">
                <NuxtIcon
                  name="codicon:briefcase"
                  class="text-blue-600 size-4 mr-2"
                />
                <span class="mr-1 text-gray-500">
                  {$t('jobExperience')}:
                </span>
                <span class="font-semibold">
                  {jobExperienceLabel.value}
                </span>
              </div>

              <div class="flex items-center">
                <NuxtIcon
                  name="codicon:mail"
                  class="text-blue-600 size-4 mr-2"
                />
                <span class="mr-1 text-gray-500">
                  {$t('email')}:
                </span>
                <span class="font-semibold">
                  {bio.value.email}
                </span>
              </div>

              <div class="flex items-center">
                <NuxtIcon
                  name="codicon:call-outgoing"
                  class="text-blue-600 size-4 mr-2"
                />
                <span class="mr-1 text-gray-500">
                  {$t('phoneNumber')}:
                </span>
                <span class="font-semibold">
                  {bio.value.phoneNumber}
                </span>
              </div>

              <div class="flex items-center">
                <NuxtIcon
                  name="codicon:location"
                  class="text-blue-600 size-4 mr-2"
                />
                <span class="mr-1 text-gray-500">
                  {$t('location')}:
                </span>
                <span class="font-semibold">
                  {bio.value.location}
                </span>
              </div>
            </div>
          </div>

          {/* Personal Photo */}
          <div class="size-34 rounded-full overflow-hidden border-3 border-blue-600 flex-shrink-0">
            <img
              src={meImageUrl}
              role="presentation"
              class="w-full h-auto -translate-y-[2.5px]"
            />
          </div>
        </div>

        {/* Social Links */}
        <div>
          <div class="flex items-center gap-4 text-sm text-blue-500 text-semibold">
            {socialLinks.value.map((link) => (
              <NuxtLink
                href={link.url}
                key={link.name}
                class="flex items-center gap-2"
              >
                <NuxtIcon
                  name={link.icon}
                  class="size-4"
                />
                {link.name}
              </NuxtLink>
            ))}
          </div>
        </div>
      </header>
    );
  },
});
