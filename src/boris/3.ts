import { type Card, cards, CardColor } from "./2_1";

const INITIAL_VALUE: CardColor[] = [];

const cardColors = cards
  .map(getCardColor)
  .reduce(reduceUniqueColors, INITIAL_VALUE);

console.log({cardColors})

function getCardColor(card: Card) {
  return card.color;
}

function reduceUniqueColors(
  acc: CardColor[],
  currentColor: CardColor
): CardColor[] {
  if (!acc.includes(currentColor)) acc.push(currentColor);

  return acc;
}
