const intro = defineI18nWord({
  en: 'Frontend developer with a B.S. in Business Informatics and extensive experience in both React/Next.js and Vue/Nuxt ecosystems. Transforming complex business requirements into elegant, scalable solutions with focus on performance, accessibility, and exceptional user experience. Deep expertise in modern architectural patterns, TypeScript, and CI/CD workflows.',
  ru: 'Frontend разработчик с дипломом бакалавра по бизнес-информатике и обширным опытом в обеих экосистемах: React/Next.js и Vue/Nuxt. Превращаю сложные бизнес-требования в элегантные, масштабируемые решения с фокусом на производительность, доступность и отличный пользовательский опыт. Глубокое понимание современных архитектурных паттернов, TypeScript и процессов CI/CD.',
});

export default defineComponent({
  name: 'CvIntro',

  setup() {
    const $t = useI18nTranslation();

    const { locale } = useI18n();

    const introText = computed(() => {
      return flattenI18nWord(intro, locale.value);
    });

    return () => (
      <section>
        <h2 class="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
          {$t('aboutMe')}
        </h2>
        <p class="text-base text-gray-700 leading-relaxed">
          {introText.value}
        </p>
      </section>
    );
  },
});
