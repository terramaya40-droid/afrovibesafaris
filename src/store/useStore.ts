import { create } from 'zustand';

export type UserType = 'Resident' | 'Citizen' | 'Non-Resident';

interface AppState {
  userType: UserType;
  setUserType: (type: UserType) => void;
  isQuoteModalOpen: boolean;
  quoteContext: Partial<QuoteContext>; // Allows pre-filling the quote modal
  openQuoteModal: (context?: Partial<QuoteContext>) => void;
  closeQuoteModal: () => void;
}

interface QuoteContext {
  destination: string;
  package: string;
  safariType: string;
}

export const useStore = create<AppState>((set) => ({
  userType: 'Non-Resident', // Default
  setUserType: (type) => set({ userType: type }),
  isQuoteModalOpen: false,
  quoteContext: {},
  openQuoteModal: (context = {}) => set({ isQuoteModalOpen: true, quoteContext: context }),
  closeQuoteModal: () => set({ isQuoteModalOpen: false, quoteContext: {} })
}));
