export default defineComponent({
  name: 'CvSkills',

  setup() {
    const $t = useI18nTranslation();

    const bio = useBio();

    const skills = computed(() => {
      return Object.entries(bio.value.skills.groups).map(
        ([key, category]) => ({
          category,
          items: bio.value.skills.list[
            key as keyof typeof bio.value.skills.list
          ].map((skill) => skill.name),
        }),
      );
    });

    return () => (
      <section>
        <h2 class="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
          {$t('skills')}
        </h2>
        <div class="space-y-6">
          {skills.value.map((skill) => (
            <div
              key={skill.category}
              class="space-y-3"
            >
              <h3 class="text-lg font-semibold text-blue-600">
                {skill.category}
              </h3>
              <div class="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    class="px-3 py-1.5 bg-blue-50 text-blue-900 rounded-md text-sm font-medium border border-blue-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  },
});
