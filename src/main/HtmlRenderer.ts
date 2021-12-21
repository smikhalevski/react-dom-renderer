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

export const HtmlRenderer: VFC<IHtmlRendererProps> = (props) => {
  const {value, elementRenderer} = props;
  const parser = useDomParser();

  const nodes = useMemo(() => parser.parse(value), [value]);

  return renderDomNodes(nodes, elementRenderer);
};

HtmlRenderer.displayName = 'HtmlRenderer';
