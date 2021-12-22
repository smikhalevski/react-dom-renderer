import {htmlElementRenderer} from '../main';

describe('htmlElementRenderer', () => {

  test('parses style attribute', () => {
    expect(htmlElementRenderer('a', {style: 'color:red'})).toEqual(<a style={{color: 'red'}}/>);
    expect(htmlElementRenderer('a', {style: '-moz-animation-delay:1'})).toEqual(<a style={{MozAnimationDelay: '1'}}/>);
    expect(htmlElementRenderer('a', {style: ''})).toEqual(<a style={{}}/>);
    expect(htmlElementRenderer('a', {style: undefined})).toEqual(<a/>);
    expect(htmlElementRenderer('a', {style: null})).toEqual(<a/>);
  });

  test('renames attributes', () => {
    expect(htmlElementRenderer('a', {class: 'foo'})).toEqual(<a className="foo"/>);
    expect(htmlElementRenderer('a', {class: ''})).toEqual(<a className=""/>);
  });

  test('preserves data and aria attributes', () => {
    expect(htmlElementRenderer('a', {'data-foo-bar': 'aaa'})).toEqual(<a data-foo-bar="aaa"/>);
    expect(htmlElementRenderer('a', {'aria-autocomplete': 'none'})).toEqual(<a aria-autocomplete="none"/>);
  });
});
