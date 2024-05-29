interface Token {
  id: string;
  amount: string;
}

interface Value {
  owner: string;
  reason: string;
  tokens: Token[];
  jurisdiction: string;
}

export interface TokenMessage {
  value: Value;
}

// Function to aggregate the total amount of tokens
export function aggregateTokensAmount(data: TokenMessage[]): number {
  return data.reduce((total, item) => {
    const tokenAmount = item.value.tokens.reduce((tokenTotal, token) => {
      return tokenTotal + parseFloat(token.amount);
    }, 0);
    return total + tokenAmount;
  }, 0);
}
