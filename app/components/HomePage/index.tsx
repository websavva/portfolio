import {
  HomePageIntro,
  HomePageAboutMe,
  HomePageJobExperience,
  HomePageWorks,
  HomePageSkills,
  HomePageContactMe,
} from '#components';

export default defineComponent({
  name: 'HomePage',

  props: {
    class: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    provideBio();

    return () => {
      return (
        <div class={cn(props.class)}>
          <HomePageIntro
            class={cn(
              'lg:min-h-[var(--editor-body-content-height)] max-h-[var(--editor-body-content-height)] max-lg:min-h-[450px]',
            )}
          />

          <HomePageAboutMe />

          <HomePageJobExperience />

          <HomePageWorks />

          <HomePageSkills />

          <HomePageContactMe />
        </div>
      );
    };
  },
});
