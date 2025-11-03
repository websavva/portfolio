export interface ContentItem {
  tag: string;
  attrs?: Record<string, any>;
  children?: Array<ContentItem | string>;
}

const ArticlePageOverviewRenderer = defineComponent({
  name: 'ArticlePageOverviewRenderer',

  props: {
    content: {
      type: Array as PropType<Array<ContentItem | string>>,
      required: true,
    },

    isRoot: {
      type: Boolean,
      default: true,
    },
  },

  setup(props) {
    return () => {
      const renderedVnodes = props.content.map((item) => {
        if (typeof item === 'string') {
          return item;
        } else {
          return (
            <item.tag {...item.attrs}>
              {item.children?.length && (
                <ArticlePageOverviewRenderer
                  isRoot={false}
                  content={item.children}
                />
              )}
            </item.tag>
          );
        }
      });

      return props.isRoot ? (
        <div class={cn('article-page-overview')}>
          {renderedVnodes}
        </div>
      ) : (
        renderedVnodes
      );
    };
  },
});

export default ArticlePageOverviewRenderer;
