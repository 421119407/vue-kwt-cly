export default {
  name: 'render',
  functional: true,
  props: {
    node: Object,
    template: Function
  },
  render(h, ctx) {
    let titleClass = ctx.props.node.selected ? 'node-title node-selected' : 'node-title'
    return ctx.props.template ? ctx.props.template(ctx.props.node, ctx)
      : <span domPropsInnerHTML={ctx.props.node.name} title={ctx.props.node.name}
        class={titleClass}
        onMouseover={() => ctx.parent.nodeMouseOver(ctx.props.node)}
        style='user-select: none'
        onClick={() => ctx.parent.nodeSelected(ctx.props.node)}>
      </span>
  }
}
