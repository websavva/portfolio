import {
  HomePageIntro,
  HomePageAboutMe,
  HomePageJobExperience,
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
              'min-h-[var(--editor-body-content-height)]',
            )}
          />

          <HomePageAboutMe />

          <HomePageJobExperience />
        </div>
      );
    };
  },
});
