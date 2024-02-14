export function parseCode(input: string) {
  const string = input.split('-');

  const result = {
    one: string[1],
    two: string[3],
  };

  return result;
}
