import type { NuxtError } from '#app';
import { ErrorPageContent, TheApp } from '#components';

export default defineComponent({
  name: 'ErrorPage',

  props: {
    class: {
      type: String,
      default: '',
    },

    error: {
      type: Object as PropType<Pick<NuxtError, 'statusCode' | 'statusMessage' | 'message' | 'stack'>>,
      required: true,
    },
  },

  setup(props) {
    return () => {
      return (
        <TheApp class={props.class}>
          <ErrorPageContent error={props.error} />
        </TheApp>
      );
    };
  },
});
