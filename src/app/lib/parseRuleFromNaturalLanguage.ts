export function parseRuleFromNaturalLanguage(input: string) {
  const simpleConditionRegex = /(\w+)\s*(=|>|<|>=|<=)\s*(\w+)/g;
  const matches = [...input.matchAll(simpleConditionRegex)];

  if (matches.length === 0) {
    return null; // no rule detected
  }

  // For simplicity, take the first match as the main rule
  const [ , field, operator, value ] = matches[0];

  return {
    field,
    operator,
    value,
  };
}
