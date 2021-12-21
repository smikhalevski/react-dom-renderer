import {useContext} from 'react';
import {DomParserContext} from './DomParserContext';
import {IParser, Node} from 'tag-soup';

/**
 * Returns an instance of the DOM parser.
 */
export function useDomParser(): IParser<Array<Node>> {
  return useContext(DomParserContext);
}
