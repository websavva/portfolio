import {
  cloneVNode,
  Comment,
  defineComponent,
  mergeProps,
} from 'vue';
import type { VNode } from 'vue';
import { Fragment } from 'vue';

function renderSlotFragments(children?: VNode[]): VNode[] {
  if (!children) return [];
  return children.flatMap((child) => {
    if (child.type === Fragment)
      return renderSlotFragments(child.children as VNode[]);

    return [child];
  });
}

export default defineComponent({
  name: 'PrimitiveSlot',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => {
      if (!slots.default) return null;

      const children = renderSlotFragments(slots.default());
      const firstNonCommentChildrenIndex =
        children.findIndex(
          (child) => child.type !== Comment,
        );
      if (firstNonCommentChildrenIndex === -1)
        return children;

      const firstNonCommentChildren =
        children[firstNonCommentChildrenIndex];

      delete firstNonCommentChildren.props?.ref;

      const mergedProps = firstNonCommentChildren.props
        ? mergeProps(attrs, firstNonCommentChildren.props)
        : attrs;
      const cloned = cloneVNode(
        { ...firstNonCommentChildren, props: {} },
        mergedProps,
      );

      if (children.length === 1) return cloned;

      children[firstNonCommentChildrenIndex] = cloned;
      return children;
    };
  },
});
