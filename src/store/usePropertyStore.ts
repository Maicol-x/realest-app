import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Property, Filters, PropertyType, PropertyStatus } from '@/types/property';
import { properties as allProperties } from '@/data/properties';

interface PropertyStore {
  properties: Property[];
  favorites: string[];
  compareList: string[];
  filters: Filters;
  isDark: boolean;

  // Actions
  toggleFavorite: (id: string) => void;
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  resetFilters: () => void;
  toggleDarkMode: () => void;
  getFilteredProperties: () => Property[];
  getFavoriteProperties: () => Property[];
  getCompareProperties: () => Property[];
  getPropertyById: (id: string) => Property | undefined;
}

const defaultFilters: Filters = {
  search: '',
  minPrice: 0,
  maxPrice: 10000000,
  bedrooms: null,
  bathrooms: null,
  type: null,
  minArea: 0,
  maxArea: 10000,
  status: null,
};

export const usePropertyStore = create<PropertyStore>()(
  persist(
    (set, get) => ({
      properties: allProperties,
      favorites: [],
      compareList: [],
      filters: defaultFilters,
      isDark: false,

      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((f) => f !== id)
            : [...state.favorites, id],
        })),

      addToCompare: (id) =>
        set((state) => {
          if (state.compareList.length >= 4 || state.compareList.includes(id)) return state;
          return { compareList: [...state.compareList, id] };
        }),

      removeFromCompare: (id) =>
        set((state) => ({
          compareList: state.compareList.filter((c) => c !== id),
        })),

      clearCompare: () => set({ compareList: [] }),

      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),

      resetFilters: () => set({ filters: defaultFilters }),

      toggleDarkMode: () =>
        set((state) => {
          const newDark = !state.isDark;
          if (newDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { isDark: newDark };
        }),

      getFilteredProperties: () => {
        const { properties, filters } = get();
        return properties.filter((p) => {
          if (filters.search) {
            const s = filters.search.toLowerCase();
            if (
              !p.title.toLowerCase().includes(s) &&
              !p.city.toLowerCase().includes(s) &&
              !p.state.toLowerCase().includes(s) &&
              !p.address.toLowerCase().includes(s)
            )
              return false;
          }
          if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
          if (filters.bedrooms && p.bedrooms < filters.bedrooms) return false;
          if (filters.bathrooms && p.bathrooms < filters.bathrooms) return false;
          if (filters.type && p.type !== filters.type) return false;
          if (p.area < filters.minArea || p.area > filters.maxArea) return false;
          if (filters.status && p.status !== filters.status) return false;
          return true;
        });
      },

      getFavoriteProperties: () => {
        const { properties, favorites } = get();
        return properties.filter((p) => favorites.includes(p.id));
      },

      getCompareProperties: () => {
        const { properties, compareList } = get();
        return properties.filter((p) => compareList.includes(p.id));
      },

      getPropertyById: (id) => {
        return get().properties.find((p) => p.id === id);
      },
    }),
    {
      name: 'luxestate-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        isDark: state.isDark,
      }),
    }
  )
);
