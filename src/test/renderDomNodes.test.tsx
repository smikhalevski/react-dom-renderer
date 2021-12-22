import {domElementRenderer} from '../main';

describe('domElementRenderer', () => {

  test('parses style attribute', () => {
    expect(domElementRenderer('a', {style: 'color:red'})).toEqual(<a style={{color: 'red'}}/>);
    expect(domElementRenderer('a', {style: '-moz-animation-delay:1'})).toEqual(<a style={{MozAnimationDelay: '1'}}/>);
    expect(domElementRenderer('a', {style: ''})).toEqual(<a style={{}}/>);
    expect(domElementRenderer('a', {style: undefined})).toEqual(<a/>);
    expect(domElementRenderer('a', {style: null})).toEqual(<a/>);
  });

  test('renames attributes', () => {
    expect(domElementRenderer('a', {class: 'foo'})).toEqual(<a className="foo"/>);
    expect(domElementRenderer('a', {class: ''})).toEqual(<a className=""/>);
  });

  test('preserves data and aria attributes', () => {
    expect(domElementRenderer('a', {'data-foo-bar': 'aaa'})).toEqual(<a data-foo-bar="aaa"/>);
    expect(domElementRenderer('a', {'aria-autocomplete': 'none'})).toEqual(<a aria-autocomplete="none"/>);
  });
});
