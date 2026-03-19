import { cn } from '../lib/utils';

describe('cn – className utility', () => {
  it('joins multiple class names with a space', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('ignores falsy values (false, undefined, null)', () => {
    expect(cn('foo', false && 'bar', undefined, null)).toBe('foo');
  });

  it('merges conflicting Tailwind classes (last one wins)', () => {
    // tailwind-merge: text-blue-500 should override text-red-500
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('returns an empty string when called with no valid classes', () => {
    expect(cn(false, undefined)).toBe('');
  });

  it('handles conditional class objects', () => {
    const isActive = true;
    const isDisabled = false;
    const result = cn({ 'bg-blue-500': isActive, 'opacity-50': isDisabled });
    expect(result).toBe('bg-blue-500');
  });
});
