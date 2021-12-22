import parseCssStyle from 'style-to-object';

/**
 * Converts HTML/SVG attributes to React-compatible props.
 */
export function toReactProps(attributes: Record<string, string | null | undefined> | null | undefined): Record<string, unknown> | null {
  let props: Record<string, unknown> | undefined;

  if (!attributes) {
    return null;
  }

  const names = Object.keys(attributes);

  for (let i = 0; i < names.length; ++i) {
    const name = names[i];
    const reactName = toReactPropName(name);

    if (!props) {
      if (name === reactName && reactName !== 'style') {
        continue;
      }
      props = {};

      for (let j = 0; j < i; ++j) {
        const name = names[j];
        props[name] = attributes[name];
      }
    }
    const value = attributes[name];
    props[reactName] = reactName === 'style' ? toReactStyle(value) : value;
  }
  return props || attributes;
}

export function toReactStyle(value: string | null | undefined): object | undefined {
  if (value == null) {
    return;
  }
  const style = parseCssStyle(value);
  if (!style) {
    return {};
  }
  let reactStyle: Record<string, string | number> | undefined = {};

  const names = Object.keys(style);

  for (let i = 0; i < names.length; ++i) {
    const name = names[i];
    // if (!reactStyle && name.indexOf('-') !== -1) {
    //   reactStyle = {};
    //   for (let j = 0; j < i; ++j) {
    //     const name = names[j];
    //     reactStyle[name] = style[name];
    //   }
    // }
    reactStyle[camelCase(name)] = style[name];
  }

  return reactStyle || style;
}

/**
 * Converts HTML attribute name to React element property name.
 *
 * @param name The HTML attribute name to convert.
 * @returns React element property name.
 * @see {@link https://reactjs.org/docs/dom-elements.html DOM Elements}
 */
export function toReactPropName(name: string): string {
  name = name.toLowerCase();

  if (name.indexOf('data-') === 0 || name.indexOf('aria-') === 0) {
    return name;
  }
  if (name.indexOf('-') !== -1) {
    return camelCase(name);
  }
  return reactAltMap.get(name) || reactCaseMap.get(name) || name;
}

const camelCase = (str: string) => str.replace(/-./g, snakeCaseReplacer);

const snakeCaseReplacer = (str: string) => str.substr(1, 1).toUpperCase();

const reactAltMap = new Map([
  ['class', 'className'],
  ['action', 'formAction'],
  ['enctype', 'formEncType'],
  ['method', 'formMethod'],
  ['novalidate', 'formNoValidate'],
  ['target', 'formTarget'],
  ['for', 'htmlFor'],
]);

const reactCaseMap = new Map([
  // 'accept',
  'acceptCharset',
  'accessKey',
  // 'action',
  'allowFullScreen',
  // 'alt',
  // 'async',
  'autoComplete',
  'autoFocus',
  'autoPlay',
  // 'capture',
  'cellPadding',
  'cellSpacing',
  // 'challenge',
  'charSet',
  // 'checked',
  // 'cite',
  'classID',
  // 'className', // class
  'colSpan',
  // 'cols',
  // 'content',
  'contentEditable',
  'contextMenu',
  // 'controls',
  'controlsList',
  // 'coords',
  'crossOrigin',
  // 'data',
  'dateTime',
  // 'default',
  // 'defer',
  // 'dir',
  // 'disabled',
  // 'download',
  // 'draggable',
  'encType',
  // 'form',
  // 'formAction', // action
  // 'formEncType', // enctype
  // 'formMethod', // method
  // 'formNoValidate', // novalidate
  // 'formTarget', // target
  'frameBorder',
  // 'headers',
  // 'height',
  // 'hidden',
  // 'high',
  // 'href',
  'hrefLang',
  // 'htmlFor', // for
  'httpEquiv',
  // 'icon',
  // 'id',
  'inputMode',
  // 'integrity',
  // 'is',
  'keyParams',
  'keyType',
  // 'kind',
  // 'label',
  // 'lang',
  // 'list',
  // 'loop',
  // 'low',
  // 'manifest',
  'marginHeight',
  'marginWidth',
  // 'max',
  'maxLength',
  // 'media',
  'mediaGroup',
  // 'method',
  // 'min',
  'minLength',
  'multiple',
  // 'muted',
  // 'name',
  'noValidate',
  // 'nonce',
  // 'open',
  // 'optimum',
  // 'pattern',
  // 'placeholder',
  // 'poster',
  // 'preload',
  // 'profile',
  'radioGroup',
  'readOnly',
  // 'rel',
  // 'required',
  // 'reversed',
  // 'role',
  'rowSpan',
  // 'rows',
  // 'sandbox',
  // 'scope',
  // 'scoped',
  // 'scrolling',
  // 'seamless',
  // 'selected',
  // 'shape',
  // 'size',
  // 'sizes',
  // 'span',
  'spellCheck',
  // 'src',
  'srcDoc',
  'srcLang',
  'srcSet',
  // 'start',
  // 'step',
  // 'style',
  // 'summary',
  'tabIndex',
  // 'target',
  // 'title',
  // 'type',
  'useMap',
  // 'value',
  // 'width',
  // 'wmode',
  // 'wrap',
].map((name) => [name.toLowerCase(), name]));
