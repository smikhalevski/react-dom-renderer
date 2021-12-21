import {useMemo, VFC} from 'react';
import {useDomParser} from './useDomParser';
import {renderDomNodes} from './renderDomNodes';
import {ElementRenderer} from './renderer-types';

export interface IHtmlRendererProps {

  /**
   * The HTML value to render.
   */
  value: string;

  /**
   * The element factory.
   *
   * @default React.createElement
   */
  elementRenderer?: ElementRenderer;
}

/**
 * Renders HTML source as React nodes using customizable element renderer.
 */
export const HtmlRenderer: VFC<IHtmlRendererProps> = (props) => {
  const {value, elementRenderer} = props;
  const parser = useDomParser();
  const nodes = useMemo(() => parser.parse(value), [value]);

  return useMemo(() => renderDomNodes(nodes, elementRenderer), [nodes, elementRenderer]);
};

HtmlRenderer.displayName = 'HtmlRenderer';
