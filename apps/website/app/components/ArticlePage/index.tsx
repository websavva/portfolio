import {
  Container,
  ArticlePageHead,
  ArticlePageDetails,
  ArticlePageLinks,
  ArticlePageImage,
  ArticlePageOverview,
  ArticlePageTechnologies,
} from '#components';

export default defineComponent({
  name: 'ArticlePage',

  props: {
    class: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    return () => {
      return (
        <div class={cn('py-20 max-lg:py-10', props.class)}>
          <Container class="max-w-5xl max-lg:max-w-4xl">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              inViewOptions={{
                margin: '0px 0px -150px',
                once: true,
              }}
              class={cn('mb-12')}
            >
              <ArticlePageHead />
            </motion.div>

            {/* Project Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              inViewOptions={{
                margin: '0px 0px -150px',
                once: true,
              }}
              class={cn('mb-12')}
            >
              <ArticlePageDetails />
            </motion.div>

            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              inViewOptions={{
                margin: '0px 0px -150px',
                once: true,
              }}
              transition={{ duration: 0.5 }}
              class={cn('mb-12')}
            >
              <ArticlePageImage />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              inViewOptions={{
                margin: '0px 0px -150px',
                once: true,
              }}
              transition={{ duration: 0.5 }}
              class={cn('mt-12')}
            >
              <ArticlePageOverview />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              inViewOptions={{
                margin: '0px 0px -150px',
                once: true,
              }}
              transition={{ duration: 0.5 }}
              class={cn('mt-12')}
            >
              <ArticlePageTechnologies />
            </motion.div>

            {/* Project Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              inViewOptions={{
                margin: '0px 0px -150px',
                once: true,
              }}
              transition={{ duration: 0.5 }}
              class={cn('mb-12 mt-15')}
            >
              <ArticlePageLinks />
            </motion.div>
          </Container>
        </div>
      );
    };
  },
});
