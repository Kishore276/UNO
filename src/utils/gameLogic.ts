import { Card, CardColor, CardType, Player, GameState } from '../types/game';

export function createDeck(): Card[] {
  const deck: Card[] = [];
  const colors: CardColor[] = ['red', 'blue', 'green', 'yellow'];
  
  // Number cards (0-9)
  colors.forEach(color => {
    // One 0 card per color
    deck.push({
      id: `${color}-0-${Math.random()}`,
      color,
      type: 'number',
      value: 0,
      symbol: '0'
    });
    
    // Two of each number 1-9 per color
    for (let i = 1; i <= 9; i++) {
      for (let j = 0; j < 2; j++) {
        deck.push({
          id: `${color}-${i}-${j}-${Math.random()}`,
          color,
          type: 'number',
          value: i,
          symbol: i.toString()
        });
      }
    }
    
    // Action cards (2 of each per color)
    const actionCards: { type: CardType; symbol: string }[] = [
      { type: 'skip', symbol: '⊘' },
      { type: 'reverse', symbol: '⇄' },
      { type: 'draw2', symbol: '+2' }
    ];
    
    actionCards.forEach(({ type, symbol }) => {
      for (let i = 0; i < 2; i++) {
        deck.push({
          id: `${color}-${type}-${i}-${Math.random()}`,
          color,
          type,
          symbol
        });
      }
    });
  });
  
  // Wild cards (4 of each)
  for (let i = 0; i < 4; i++) {
    deck.push({
      id: `wild-${i}-${Math.random()}`,
      color: 'wild',
      type: 'wild',
      symbol: '🌈'
    });
    
    deck.push({
      id: `wild4-${i}-${Math.random()}`,
      color: 'wild',
      type: 'wild4',
      symbol: '+4'
    });
  }
  
  return shuffleDeck(deck);
}

export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function dealCards(deck: Card[], players: Player[], cardsPerPlayer: number = 7): Card[] {
  let currentDeck = [...deck];
  
  players.forEach(player => {
    player.cards = currentDeck.splice(0, cardsPerPlayer);
  });
  
  return currentDeck;
}

export function canPlayCard(card: Card, lastCard: Card, currentColor?: CardColor): boolean {
  // Wild cards can always be played
  if (card.type === 'wild' || card.type === 'wild4') {
    return true;
  }
  
  // If there's a current color (from wild card), match that
  if (currentColor) {
    return card.color === currentColor;
  }
  
  // Match color or symbol/value
  if (card.color === lastCard.color) {
    return true;
  }
  
  if (card.type === 'number' && lastCard.type === 'number') {
    return card.value === lastCard.value;
  }
  
  if (card.type === lastCard.type && card.type !== 'number') {
    return true;
  }
  
  return false;
}

export function getNextPlayer(currentPlayerIndex: number, direction: 1 | -1, players: Player[]): number {
  const nextIndex = currentPlayerIndex + direction;
  
  if (nextIndex >= players.length) {
    return 0;
  }
  
  if (nextIndex < 0) {
    return players.length - 1;
  }
  
  return nextIndex;
}

export function calculateScore(player: Player): number {
  return player.cards.reduce((total, card) => {
    if (card.type === 'number') {
      return total + (card.value || 0);
    }
    if (card.type === 'skip' || card.type === 'reverse' || card.type === 'draw2') {
      return total + 20;
    }
    if (card.type === 'wild' || card.type === 'wild4') {
      return total + 50;
    }
    return total;
  }, 0);
}

export function getCardColorClass(color: CardColor): string {
  const colorMap = {
    red: 'bg-red-500 border-red-600',
    blue: 'bg-blue-500 border-blue-600',
    green: 'bg-green-500 border-green-600',
    yellow: 'bg-yellow-400 border-yellow-500',
    wild: 'bg-gradient-to-br from-red-400 via-yellow-400 via-green-400 to-blue-400 border-purple-600'
  };
  
  return colorMap[color] || 'bg-gray-300 border-gray-400';
}

export function getCardPattern(color: CardColor): string {
  // Patterns for colorblind accessibility
  const patternMap = {
    red: '●●●',
    blue: '■■■',
    green: '▲▲▲',
    yellow: '♦♦♦',
    wild: '★★★'
  };
  
  return patternMap[color] || '';
}

export function generateMockPlayers(count: number): Player[] {
  const names = [
    'Alex', 'Jordan', 'Casey', 'Riley', 'Avery', 'Morgan', 'Quinn', 'Sage',
    'River', 'Phoenix', 'Rowan', 'Skyler', 'Cameron', 'Dakota', 'Emery'
  ];
  
  const avatars = [
    '🎯', '🎮', '🎪', '🎨', '🎭', '🎸', '🎺', '🎲', '🎳', '🎊', '🎉', '🎈', '🎁', '🎀', '🎂'
  ];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `player-${i}`,
    name: names[i % names.length] + (i > names.length - 1 ? ` ${Math.floor(i / names.length) + 1}` : ''),
    avatar: avatars[i % avatars.length],
    cards: [],
    isReady: Math.random() > 0.3,
    isHost: i === 0,
    coins: Math.floor(Math.random() * 10000) + 1000,
    level: Math.floor(Math.random() * 50) + 1,
    wins: Math.floor(Math.random() * 100),
    gamesPlayed: Math.floor(Math.random() * 200) + 50,
    isPremium: Math.random() > 0.7,
    theme: 'default'
  }));
}