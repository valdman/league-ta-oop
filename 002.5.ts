// Card desk

type CardColor = "spades" | "hearts" | "diamonds" | "clubs";
type CardValue = 6 | 7 | 8 | 9 | 10 | "jack" | "queen" | "king" | "ace";

interface Card {
  color: CardColor;
  value: CardValue;
}

export const cards: Card[] = [
  { color: "spades", value: 6 },
  { color: "diamonds", value: 7 },
  { color: "hearts", value: 8 },
  { color: "clubs", value: "ace" },
];

// Someone else
enum SomeEnumForCards {
  Spades = "spades",
  Hearts = "hearts",
  Diamonds = "diamonds",
  Clubs = "clubs",
}

cards.push({ color: SomeEnumForCards.Spades, value: 6 });

function getCardPower(card: Card) {
  if (card.value === "jack") return 11;
  if (card.value === "queen") return 12;
  if (card.value === "king") return 13;
  if (card.value === "ace") return 14;
  return card.value;
}

function getCardPowerForMygame(card: Card) {
  const colorPower = {
    spades: 4,
    hearts: 3,
    diamonds: 2,
    clubs: 1,
  };

  return getCardPower(card) * colorPower[card.color];
}

function getRandomCardPower() {
  return Math.floor(Math.random() * 100);
}

function get42() {
  return 42;
}

interface EvaluateCardFunction {
  (card: Card): number;
}
// type EvaluateCardFunctionType = (card: Card) => number;

function evaluateHand(cards: Card[], evaluateCard: EvaluateCardFunction) {
  function aggregator(
    acc: { sum: number; min: number; max: number },
    card: Card
  ) {
    const power = evaluateCard(card);

    acc.sum += power;
    if (power < acc.min) acc.min = power;
    if (power > acc.max) acc.max = power;

    return acc;
  }

  const stat = cards.reduce(aggregator, {
    sum: 0,
    min: Number.POSITIVE_INFINITY,
    max: Number.NEGATIVE_INFINITY,
  });

  return stat;
}

console.log({
  esteemRegular: evaluateHand(cards, getCardPower),
  esteemSpecial: evaluateHand(cards, getCardPowerForMygame),
  esteemRandom: evaluateHand(cards, getRandomCardPower),
  esteem42: evaluateHand(cards, get42),
  cards,
});
