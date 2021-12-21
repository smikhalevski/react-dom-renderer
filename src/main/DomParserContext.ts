import {createContext} from 'react';
import {createHtmlDomParser, IParser, Node} from 'tag-soup';

/**
 * The context that provides an instance of the DOM parser.
 */
export const DomParserContext = createContext<IParser<Array<Node>>>(createHtmlDomParser());

DomParserContext.displayName = 'DomParserContext';
