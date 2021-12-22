# react-html-renderer [![build](https://github.com/smikhalevski/react-html-renderer/actions/workflows/master.yml/badge.svg?branch=master&event=push)](https://github.com/smikhalevski/react-html-renderer/actions/workflows/master.yml)

Renders HTML source as React nodes using customizable element renderer.

```shell
npm install --save-prod @smikhalevski/react-html-renderer
```

This library is build on top of [TagSoup 🍜](https://github.com/smikhalevski/tag-soup), the fastest and the tiniest
XML/HTML parser.

The size of this package
is [just 7 kB gzipped](https://bundlephobia.com/package/@smikhalevski/react-html-renderer), including all dependencies.

# Usage

Render an HTML as React nodes.

```tsx
import {HtmlRenderer} from '@smikhalevski/react-html-renderer';

const MyComponent = () => (
    <HtmlRenderer value={'<b>Hello</b>, world'}/>
);
// → <><b>Hello</b>, world</>
```

Use the custom element renderer.

```tsx
import {ElementRenderer, HtmlRenderer} from '@smikhalevski/react-html-renderer';

const elementRenderer: ElementRenderer = (tagName) => {
  // Tag names are lower cased
  if (tagName === 'bear') {
    return <strong>{'Bonjour'}</strong>;
  }
  // Forest tag is ignored
};

const MyComponent = () => (
    <HtmlRenderer
        value={'<Bear><Forest>'}
        elementRenderer={elementRenderer}
    />
);
// → <strong>Bonjour</strong>
```

Use customized DOM parser.

In this example we are going to initialize a parser that recognizes custom HTML entities.

Have a look at [TagSoup 🍜](https://github.com/smikhalevski/tag-soup)
and [speedy-entities](https://github.com/smikhalevski/speedy-entities) for more details on configuration.

```tsx
import {DomParserContext, ElementRenderer, HtmlRenderer} from '@smikhalevski/react-html-renderer';
import {createEntityDecoder, createEntityManager} from 'speedy-entities';
import {createHtmlDomParser, domHandler} from 'tag-soup';

const entityManager = createEntityManager();

entityManager.set('wtfisthis', 'This is Sparta');

const parser = createHtmlDomParser(domHandler, {
  decodeText: createEntityDecoder(entityManager),
});

const MyComponent = () => (
    <DomParserContext.Provider value={parser}>
      <HtmlRenderer value={'&wtfisthis;'}/>
    </DomParserContext.Provider>
);
// → <>This is Sparta</>
```
