import {DomParserContext, DomPreprocessor, DomRenderer, ElementRenderer} from '../main';
import {render} from '@testing-library/react';
import {createEntityDecoder, createEntityManager} from 'speedy-entities';
import {createHtmlDomParser, domHandler, NodeType} from 'tag-soup';

describe('DomRenderer', () => {

  test('renders markup', () => {
    const result = render(<DomRenderer value={'<b></b>'}/>);

    expect(result.baseElement.innerHTML).toBe('<div><b></b></div>');
  });

  test('renders tag soup', () => {
    const result = render(<DomRenderer value={'<br><a>'}/>);

    expect(result.baseElement.innerHTML).toBe('<div><br><a></a></div>');
  });

  test('renders nested elements', () => {
    const result = render(<DomRenderer value={'<b><a><br></a></b>'}/>);

    expect(result.baseElement.innerHTML).toBe('<div><b><a><br></a></b></div>');
  });

  test('renders paragraphs', () => {
    const result = render(<DomRenderer value={'<p><p>'}/>);

    expect(result.baseElement.innerHTML).toBe('<div><p></p><p></p></div>');
  });

  test('renders aria attributes', () => {
    const result = render(<DomRenderer value={'<input aria-valuenow=75>'}/>);

    expect(result.baseElement.innerHTML).toBe('<div><input aria-valuenow="75"></div>');
  });

  test('renders data attributes', () => {
    const result = render(<DomRenderer value={'<a data-foo-bar=aaa>'}/>);

    expect(result.baseElement.innerHTML).toBe('<div><a data-foo-bar="aaa"></a></div>');
  });

  test('renders style attribute', () => {
    const result = render(<DomRenderer value={'<a style="color:red">'}/>);

    expect(result.baseElement.innerHTML).toBe('<div><a style="color: red;"></a></div>');
  });

  test('renders style attribute with snake keys', () => {
    const result = render(<DomRenderer value={'<a style="animation-delay:1">'}/>);

    expect(result.baseElement.innerHTML).toBe('<div><a style="animation-delay: 1;"></a></div>');
  });

  test('uses custom element renderer', () => {
    const elementRenderer: ElementRenderer = (tagName) => {
      // Tag name is lower cased
      if (tagName === 'bear') {
        return <strong>{'Bonjour'}</strong>;
      }
      // Forest is ignored
    };
    const result = render(<DomRenderer value={'<Bear><Forest>'} elementRenderer={elementRenderer}/>);

    expect(result.baseElement.innerHTML).toBe('<div><strong>Bonjour</strong></div>');
  });

  test('uses custom DOM preprocessor', () => {
    const domPreprocessor: DomPreprocessor = (nodes) => {
      const node = nodes[0];

      if (nodes.length === 1 && node.nodeType === NodeType.ELEMENT && node.tagName === 'p') {
        return node.children;
      }
    };
    const result = render(<DomRenderer value={'<p>foo'} domPreprocessor={domPreprocessor}/>);

    expect(result.baseElement.innerHTML).toBe('<div>foo</div>');

    result.rerender(<DomRenderer value={'<p>foo<p>bar'} domPreprocessor={domPreprocessor}/>);

    expect(result.baseElement.innerHTML).toBe('<div><p>foo</p><p>bar</p></div>');
  });

  test('uses custom DOM parser', () => {
    const entityManager = createEntityManager();

    entityManager.set('wtfisthis', 'This is Sparta');

    const parser = createHtmlDomParser(domHandler, {
      decodeText: createEntityDecoder(entityManager),
    });

    const result = render(<DomParserContext.Provider value={parser}>
      <DomRenderer value={'&wtfisthis;'}/>
    </DomParserContext.Provider>);

    expect(result.baseElement.innerHTML).toBe('<div>This is Sparta</div>');
  });
});
