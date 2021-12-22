import {toReactPropName, toReactProps} from '../main';

describe('toReactProps', () => {

  test('returns null', () => {
    expect(toReactProps(null)).toBe(null);
    expect(toReactProps(undefined)).toBe(null);
  });

  test('returns attributes as is if attributes names match React names', () => {
    const attributes = {capture: 'user', cellPadding: '2'};
    expect(toReactProps(attributes)).toBe(attributes);
  });

  test('returns the new object if attributes names don\'t match React names', () => {
    const attributes = {capture: 'user', cellpadding: '2', disabled: ''};
    expect(toReactProps(attributes)).not.toBe(attributes);
    expect(toReactProps(attributes)).toEqual({capture: 'user', cellPadding: '2', disabled: ''});
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
  });

  test('preserves data and area attributes', () => {
    expect(toReactPropName('data-Foo-Bar')).toBe('data-foo-bar');
    expect(toReactPropName('aria-Foo-Bar')).toBe('aria-foo-bar');
  });
});
