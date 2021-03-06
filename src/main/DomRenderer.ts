import {useMemo, VFC} from 'react';
import {useDomParser} from './useDomParser';
import {renderDomNodes} from './renderDomNodes';
import {DomPreprocessor, ElementRenderer} from './renderer-types';

export interface IDomRendererProps {

  /**
   * The HTML value to render.
   */
  value: string;

  /**
   * The element factory.
   *
   * **Note:** wrap this callback in `React.useCallback` to prevent excessive parsings.
   *
   * @default {@link htmlElementRenderer}
   */
  elementRenderer?: ElementRenderer;

  /**
   * The callback that receives the parsed DOM nodes and can optionally alter them.
   *
   * **Note:** wrap this callback in `React.useCallback` to prevent excessive renders.
   */
  domPreprocessor?: DomPreprocessor;
}

/**
 * Renders HTML source as React nodes using customizable element renderer.
 */
export const DomRenderer: VFC<IDomRendererProps> = (props) => {
  const {value, elementRenderer, domPreprocessor} = props;
  const parser = useDomParser();
  const nodes = useMemo(() => parser.parse(value), [value]);

  return useMemo(() => renderDomNodes(domPreprocessor?.(nodes) || nodes, elementRenderer), [nodes, elementRenderer, domPreprocessor]);
};

DomRenderer.displayName = 'DomRenderer';
