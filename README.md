# react-dom-renderer [![build](https://github.com/smikhalevski/react-dom-renderer/actions/workflows/master.yml/badge.svg?branch=master&event=push)](https://github.com/smikhalevski/react-dom-renderer/actions/workflows/master.yml)

Renders XML/HTML/SVG source as React nodes using customizable element renderer.

```shell
npm install --save-prod react-dom-renderer
```

This library is build on top of [TagSoup 🍜](https://github.com/smikhalevski/tag-soup), the fastest and the tiniest
XML/HTML parser.

The size of this package is [just 8 kB gzipped](https://bundlephobia.com/package/react-dom-renderer), including all
dependencies.

# Usage

Render an HTML as React nodes.

```tsx
import {DomRenderer} from 'react-dom-renderer';

const MyComponent = () => (
    <DomRenderer value={'<b>Hello</b>, world'}/>
);
// → <><b>Hello</b>, world</>
```

Use the custom element renderer.

```tsx
import {useCallback} from 'react';
import {ElementRenderer, DomRenderer} from 'react-dom-renderer';

const MyComponent = () => {

  // Prevent excessive parsings by useCallback
  const elementRenderer = useCallback<ElementRenderer>((tagName) => {
    // Tag names are lower cased
    if (tagName === 'bear') {
      return <strong>{'Bonjour'}</strong>;
    }
    // Other tags aren't rendered
  });

  return (
      <DomRenderer
          value={'<Bear><Forest>'}
          elementRenderer={elementRenderer}
      />
  );
};
// → <strong>Bonjour</strong>
```

Use the DOM pre-processor to alter the node tree before rendering.

In this example we are going to unwrap root `p` element if it's the only one.

```tsx
import {useCallback} from 'react';
import {DomPreprocessor, DomRenderer} from 'react-dom-renderer';
import {NodeType} from 'tag-soup';

const MyComponent = () => {

  // Prevent excessive parsings by useCallback
  const domPreprocessor = useCallback<DomPreprocessor>((nodes) => {
    const node = nodes[0];

    if (nodes.length === 1 && node.nodeType === NodeType.ELEMENT && node.tagName === 'p') {
      return node.children;
    }
    // If undefined is returned then original nodes are rendered
    // return nodes;
  });

  return (
      <DomRenderer
          value={'<p>No paragraphs'}
          domPreprocessor={domPreprocessor}
      />
  );
};
// → <>No paragraphs</>
```

Use customized DOM parser.

In this example we are going to initialize a parser that recognizes custom HTML entities.

Have a look at [TagSoup 🍜](https://github.com/smikhalevski/tag-soup)
and [speedy-entities](https://github.com/smikhalevski/speedy-entities) for more details on configuration.

```tsx
import {DomParserContext, ElementRenderer, DomRenderer} from 'react-dom-renderer';
import {createEntityDecoder, createEntityManager} from 'speedy-entities';
import {createHtmlDomParser, domHandler} from 'tag-soup';

const entityManager = createEntityManager();

entityManager.set('wtfisthis', 'This is Sparta');

const parser = createHtmlDomParser(domHandler, {
  decodeText: createEntityDecoder(entityManager),
});

const MyComponent = () => (
    <DomParserContext.Provider value={parser}>
      <DomRenderer value={'&wtfisthis;'}/>
    </DomParserContext.Provider>
);
// → <>This is Sparta</>
```
