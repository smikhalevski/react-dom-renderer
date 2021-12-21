import {ReactNode} from 'react';

/**
 * Renders an element by `tagName`.
 *
 * @param tagName The name of the tag to render.
 * @param attributes The element attributes.
 * @param children The element children varargs.
 * @returns The rendered element.
 */
export type ElementRenderer = (tagName: string, attributes?: Record<string, string | null | undefined> | null, ...children: ReactNode[]) => ReactNode;
