import { NuxtIcon } from '#components';

export default defineComponent({
  name: 'CvEducation',

  setup() {
    const $t = useI18nTranslation();
    const bio = useBio();
    const getDateRangeLabel = useGetDateRangeLabel();

    return () => (
      <section>
        <h2 class="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
          {$t('education')}
        </h2>
        <div class="p-6 rounded-lg border border-gray-200">
          <div class="flex items-start gap-4">
            {/* University logo */}
            <div class="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <img
                src={bio.value.collegeDegree.uniLogoUrl}
                alt="University logo"
                class="size-14 object-contain"
              />
            </div>

            <div class="flex-1">
              <div class="flex items-center justify-between">
                <h3 class="font-semibold text-gray-900">
                  {bio.value.collegeDegree.major}
                </h3>

                <span class="text-xs text-gray-500">
                  {getDateRangeLabel(
                    bio.value.collegeDegree.timerange,
                  )}
                </span>
              </div>
              <a
                href={bio.value.collegeDegree.url}
                target="_blank"
                class="text-xs text-blue-600 font-medium hover:underline inline-flex items-center gap-1"
              >
                {bio.value.collegeDegree.university}
                <NuxtIcon
                  name="codicon:link-external"
                  class="text-xs"
                />
              </a>

              <p class="text-xs text-gray-500 mt-2">
                {bio.value.collegeDegree.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  },
});
