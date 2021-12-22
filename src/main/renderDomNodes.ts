import {Node, NodeType} from 'tag-soup';
import {createElement, Fragment, isValidElement, ReactElement, ReactNode} from 'react';
import {ElementRenderer} from './renderer-types';
import {toReactProps} from './react-html-utils';

/**
 * The element renderer that converts HTML/SVG attribute names to React property names and parses inline styles.
 */
export const htmlElementRenderer: ElementRenderer = (tagName, attributes, ...children) => {
  return createElement(tagName, toReactProps(attributes), ...children);
};

/**
 * Renders DOM tree as a React node.
 *
 * @param nodes The list of DOM nodes to render.
 * @param elementRenderer The element factory.
 *
 * @see {@link htmlElementRenderer}
 */
export function renderDomNodes(nodes: Node[], elementRenderer: ElementRenderer = htmlElementRenderer): ReactElement | null {

  if (nodes.length === 0) {
    return null;
  }

  const nodeRenderer = (node: Node): ReactNode => {
    if (node.nodeType === NodeType.ELEMENT) {
      return elementRenderer(node.tagName, node.attributes, ...node.children.map(nodeRenderer));
    }
    if (node.nodeType === NodeType.TEXT) {
      return node.data;
    }
    return null;
  };

  if (nodes.length === 1) {
    const reactNode = nodeRenderer(nodes[0]);
    return isValidElement(reactNode) ? reactNode : createElement(Fragment, null, reactNode);
  }

  return createElement(Fragment, null, ...nodes.map(nodeRenderer));
}
