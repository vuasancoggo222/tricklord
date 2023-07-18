export const useFoo = (string : string) => {
    return useState('foo', () => string)
  }