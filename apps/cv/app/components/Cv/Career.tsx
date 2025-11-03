import { NuxtIcon } from '#components';

export default defineComponent({
  name: 'CvCareer',

  setup(props) {
    const $t = useI18nTranslation();
    const bio = useBio();
    const getDateRangeLabel = useGetDateRangeLabel();

    const jobExperience = computed(() => {
      return bio.value.jobExperience.map((job) => {
        const dateRange = getDateRangeLabel(job.timerange);

        return {
          position: job.position,
          company: job.company,
          companyImageUrl: job.companyImageUrl,
          date: dateRange,
          responsibilities: job.responsibilities,
          url: job.url,
        };
      });
    });

    return () => (
      <section>
        <h2 class="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
          {$t('career')}
        </h2>
        <div class="space-y-5">
          {jobExperience.value.map((job, index) => (
            <div
              key={index}
              class="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200"
            >
              <div class="flex items-start gap-3">
                {/* Company logo */}
                {job.companyImageUrl && (
                  <img
                    src={job.companyImageUrl}
                    alt={job.company}
                    class="h-15 w-auto rounded-lg"
                  />
                )}

                <div class="flex-1 min-w-0">
                  <div class="flex justify-between items-start mb-1 gap-3">
                    <h3 class="text-base font-semibold text-gray-900">
                      {job.position}
                    </h3>
                    <span class="text-xs text-gray-500 whitespace-nowrap">
                      {job.date}
                    </span>
                  </div>

                  {job.url ? (
                    <a
                      href={job.url}
                      target="_blank"
                      class="text-xs text-blue-600 font-medium hover:underline inline-flex items-center gap-1"
                    >
                      {job.company}
                      <NuxtIcon
                        name="codicon:link-external"
                        class="size-3"
                      />
                    </a>
                  ) : (
                    <p class="text-sm text-blue-600 font-medium">
                      {job.company}
                    </p>
                  )}

                  {/* Responsibilities */}
                  {job.responsibilities &&
                    job.responsibilities.length > 0 && (
                      <ul class="mt-3 space-y-1.5">
                        {job.responsibilities.map(
                          (responsibility, idx) => (
                            <li
                              key={idx}
                              class="text-xs text-gray-600 flex items-start gap-2"
                            >
                              <span class="text-blue-500 mt-0.5">
                                •
                              </span>
                              <span class="flex-1">
                                {responsibility}
                              </span>
                            </li>
                          ),
                        )}
                      </ul>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  },
});
