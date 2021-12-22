import {toReactPropName, toReactProps} from '../main';

describe('toReactProps', () => {

  test('returns undefined', () => {
    expect(toReactProps(null)).toBe(undefined);
    expect(toReactProps(undefined)).toBe(undefined);
  });

  test('returns the new object with React prop names', () => {
    expect(toReactProps({cellpadding: '2'})).toEqual({cellPadding: '2'});
  });

  test('supports boolean values', () => {
    expect(toReactProps({disabled: undefined})).toEqual({disabled: true});
  });

  test('supports style', () => {
    expect(toReactProps({style: ''})).toEqual({style: {}});
    expect(toReactProps({style: null})).toEqual({style: undefined});
    expect(toReactProps({style: undefined})).toEqual({style: undefined});
    expect(toReactProps({style: 'color:red'})).toEqual({style: {color: 'red'}});
    expect(toReactProps({style: 'animation-delay:1'})).toEqual({style: {animationDelay: '1'}});
  });
});

describe('toReactPropName', () => {

  test('rewrites names', () => {
    expect(toReactPropName('class')).toBe('className');
  });

  test('re-cases names', () => {
    expect(toReactPropName('contextmenu')).toBe('contextMenu');
  });

  test('converts snake case to camel case', () => {
    expect(toReactPropName('horiz-origin-x')).toBe('horizOriginX');
    expect(toReactPropName('foo-bar')).toBe('fooBar');
    expect(toReactPropName('foo--bar')).toBe('fooBar');
    expect(toReactPropName('-foo-bar')).toBe('FooBar');
    expect(toReactPropName('--foo-bar')).toBe('FooBar');
  });

  test('preserves data and area attributes', () => {
    expect(toReactPropName('data-Foo-Bar')).toBe('data-foo-bar');
    expect(toReactPropName('aria-Foo-Bar')).toBe('aria-foo-bar');
  });
});
