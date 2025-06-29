import { create } from 'zustand';
import { Player, GameRoom, GameState, ChatMessage, Tournament, Club, Achievement } from '../types/game';

interface GameStore {
  // User state
  currentUser: Player | null;
  showUsernameModal: boolean;
  setCurrentUser: (user: Player) => void;
  setShowUsernameModal: (show: boolean) => void;
  
  // Room state
  currentRoom: GameRoom | null;
  availableRooms: GameRoom[];
  showJoinRoomModal: boolean;
  setCurrentRoom: (room: GameRoom | null) => void;
  setAvailableRooms: (rooms: GameRoom[]) => void;
  setShowJoinRoomModal: (show: boolean) => void;
  
  // Game state
  gameState: GameState | null;
  setGameState: (state: GameState) => void;
  
  // Chat state
  chatMessages: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
  clearChat: () => void;
  
  // UI state
  selectedCards: string[];
  showRules: boolean;
  showLeaderboard: boolean;
  showProfile: boolean;
  showFriends: boolean;
  showTournaments: boolean;
  showClubs: boolean;
  showShop: boolean;
  showDemo: boolean;
  toggleSelectedCard: (cardId: string) => void;
  setShowRules: (show: boolean) => void;
  setShowLeaderboard: (show: boolean) => void;
  setShowProfile: (show: boolean) => void;
  setShowFriends: (show: boolean) => void;
  setShowTournaments: (show: boolean) => void;
  setShowClubs: (show: boolean) => void;
  setShowShop: (show: boolean) => void;
  setShowDemo: (show: boolean) => void;
  
  // Social features
  friends: Player[];
  tournaments: Tournament[];
  clubs: Club[];
  achievements: Achievement[];
  leaderboard: Player[];
  setFriends: (friends: Player[]) => void;
  setTournaments: (tournaments: Tournament[]) => void;
  setClubs: (clubs: Club[]) => void;
  setAchievements: (achievements: Achievement[]) => void;
  setLeaderboard: (leaderboard: Player[]) => void;
  
  // Game actions
  playCard: (cardId: string) => void;
  drawCard: () => void;
  sayUno: () => void;
  challengePlayer: (playerId: string) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  // User state
  currentUser: null,
  showUsernameModal: true,
  setCurrentUser: (user) => set({ currentUser: user }),
  setShowUsernameModal: (show) => set({ showUsernameModal: show }),
  
  // Room state
  currentRoom: null,
  availableRooms: [],
  showJoinRoomModal: false,
  setCurrentRoom: (room) => set({ currentRoom: room }),
  setAvailableRooms: (rooms) => set({ availableRooms: rooms }),
  setShowJoinRoomModal: (show) => set({ showJoinRoomModal: show }),
  
  // Game state
  gameState: null,
  setGameState: (state) => set({ gameState: state }),
  
  // Chat state
  chatMessages: [],
  addChatMessage: (message) => 
    set((state) => ({ 
      chatMessages: [...state.chatMessages, message].slice(-100) // Keep last 100 messages
    })),
  clearChat: () => set({ chatMessages: [] }),
  
  // UI state
  selectedCards: [],
  showRules: false,
  showLeaderboard: false,
  showProfile: false,
  showFriends: false,
  showTournaments: false,
  showClubs: false,
  showShop: false,
  showDemo: false,
  toggleSelectedCard: (cardId) => 
    set((state) => ({
      selectedCards: state.selectedCards.includes(cardId)
        ? state.selectedCards.filter(id => id !== cardId)
        : [...state.selectedCards, cardId]
    })),
  setShowRules: (show) => set({ showRules: show }),
  setShowLeaderboard: (show) => set({ showLeaderboard: show }),
  setShowProfile: (show) => set({ showProfile: show }),
  setShowFriends: (show) => set({ showFriends: show }),
  setShowTournaments: (show) => set({ showTournaments: show }),
  setShowClubs: (show) => set({ showClubs: show }),
  setShowShop: (show) => set({ showShop: show }),
  setShowDemo: (show) => set({ showDemo: show }),
  
  // Social features
  friends: [],
  tournaments: [],
  clubs: [],
  achievements: [],
  leaderboard: [],
  setFriends: (friends) => set({ friends }),
  setTournaments: (tournaments) => set({ tournaments }),
  setClubs: (clubs) => set({ clubs }),
  setAchievements: (achievements) => set({ achievements }),
  setLeaderboard: (leaderboard) => set({ leaderboard }),
  
  // Game actions
  playCard: (cardId) => {
    // This would normally send to server
    console.log('Playing card:', cardId);
  },
  drawCard: () => {
    // This would normally send to server
    console.log('Drawing card');
  },
  sayUno: () => {
    // This would normally send to server
    console.log('Saying UNO!');
  },
  challengePlayer: (playerId) => {
    // This would normally send to server
    console.log('Challenging player:', playerId);
  },
}));