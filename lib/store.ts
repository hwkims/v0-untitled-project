import { create } from "zustand"
import { persist } from "zustand/middleware"

export type AssetType = "stock" | "crypto"

export interface Asset {
  id: string
  code: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap: number
  sector?: string
  symbol?: string
  supply?: number
  maxSupply?: number | null
  type: AssetType
  logo?: string
}

export interface PortfolioAsset {
  assetId: string
  code: string
  name: string
  price: number
  quantity: number
  totalValue: number
  type: AssetType
}

export interface GameState {
  cash: number
  assets: PortfolioAsset[]
  gameTime: number
  isGameRunning: boolean
}

export interface ClickGameState {
  coins: number
  clickPower: number
  autoClickRate: number
  upgrades: {
    id: number
    name: string
    cost: number
    power: number
    level: number
  }[]
}

interface AppState {
  // Current selected asset
  currentAsset: Asset | null
  setCurrentAsset: (asset: Asset) => void

  // Watchlist
  watchlist: string[]
  addToWatchlist: (assetId: string) => void
  removeFromWatchlist: (assetId: string) => void

  // Active tab
  activeTab: AssetType
  setActiveTab: (tab: AssetType) => void

  // Time frame
  timeFrame: string
  setTimeFrame: (timeFrame: string) => void

  // Game state
  gameState: GameState
  updateGameState: (state: Partial<GameState>) => void
  buyAsset: (asset: Asset, quantity: number) => void
  sellAsset: (assetId: string, quantity: number) => void

  // Click game state
  clickGameState: ClickGameState
  updateClickGameState: (state: Partial<ClickGameState>) => void
  addCoins: (amount: number) => void
  buyUpgrade: (upgradeId: number) => void
  resetClickGame: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Current selected asset
      currentAsset: null,
      setCurrentAsset: (asset) => set({ currentAsset: asset }),

      // Watchlist
      watchlist: [],
      addToWatchlist: (assetId) =>
        set((state) => ({
          watchlist: state.watchlist.includes(assetId) ? state.watchlist : [...state.watchlist, assetId],
        })),
      removeFromWatchlist: (assetId) =>
        set((state) => ({
          watchlist: state.watchlist.filter((id) => id !== assetId),
        })),

      // Active tab
      activeTab: "stock",
      setActiveTab: (tab) => set({ activeTab: tab }),

      // Time frame
      timeFrame: "1D",
      setTimeFrame: (timeFrame) => set({ timeFrame }),

      // Game state
      gameState: {
        cash: 10000000,
        assets: [],
        gameTime: 0,
        isGameRunning: false,
      },
      updateGameState: (state) =>
        set((prev) => ({
          gameState: { ...prev.gameState, ...state },
        })),
      buyAsset: (asset, quantity) =>
        set((state) => {
          const totalCost = asset.price * quantity
          if (totalCost > state.gameState.cash) return state

          const existingAssetIndex = state.gameState.assets.findIndex((a) => a.assetId === asset.id)
          let updatedAssets

          if (existingAssetIndex >= 0) {
            updatedAssets = [...state.gameState.assets]
            updatedAssets[existingAssetIndex] = {
              ...updatedAssets[existingAssetIndex],
              quantity: updatedAssets[existingAssetIndex].quantity + quantity,
              totalValue: (updatedAssets[existingAssetIndex].quantity + quantity) * asset.price,
            }
          } else {
            updatedAssets = [
              ...state.gameState.assets,
              {
                assetId: asset.id,
                code: asset.code,
                name: asset.name,
                price: asset.price,
                quantity,
                totalValue: asset.price * quantity,
                type: asset.type,
              },
            ]
          }

          return {
            gameState: {
              ...state.gameState,
              cash: state.gameState.cash - totalCost,
              assets: updatedAssets,
            },
          }
        }),
      sellAsset: (assetId, quantity) =>
        set((state) => {
          const assetIndex = state.gameState.assets.findIndex((a) => a.assetId === assetId)
          if (assetIndex === -1) return state

          const asset = state.gameState.assets[assetIndex]
          if (quantity > asset.quantity) return state

          const saleValue = asset.price * quantity
          let updatedAssets

          if (quantity === asset.quantity) {
            updatedAssets = state.gameState.assets.filter((a) => a.assetId !== assetId)
          } else {
            updatedAssets = [...state.gameState.assets]
            updatedAssets[assetIndex] = {
              ...asset,
              quantity: asset.quantity - quantity,
              totalValue: asset.price * (asset.quantity - quantity),
            }
          }

          return {
            gameState: {
              ...state.gameState,
              cash: state.gameState.cash + saleValue,
              assets: updatedAssets,
            },
          }
        }),

      // Click game state
      clickGameState: {
        coins: 0,
        clickPower: 1,
        autoClickRate: 0,
        upgrades: [
          { id: 1, name: "더 강한 클릭", cost: 10, power: 1, level: 0 },
          { id: 2, name: "자동 클릭", cost: 50, power: 1, level: 0 },
          { id: 3, name: "클릭 부스터", cost: 200, power: 5, level: 0 },
          { id: 4, name: "자동화 시스템", cost: 500, power: 5, level: 0 },
          { id: 5, name: "클릭 공장", cost: 2000, power: 25, level: 0 },
          { id: 6, name: "암호화폐 채굴", cost: 5000, power: 50, level: 0 },
          { id: 7, name: "양자 클릭", cost: 20000, power: 200, level: 0 },
          { id: 8, name: "AI 클릭 봇", cost: 100000, power: 1000, level: 0 },
        ],
      },
      updateClickGameState: (state) =>
        set((prev) => ({
          clickGameState: { ...prev.clickGameState, ...state },
        })),
      addCoins: (amount) =>
        set((state) => {
          // 클릭 코인을 추가하고 동시에 투자 현금도 추가
          return {
            clickGameState: {
              ...state.clickGameState,
              coins: state.clickGameState.coins + amount,
            },
            gameState: {
              ...state.gameState,
              cash: state.gameState.cash + amount,
            },
          }
        }),
      buyUpgrade: (upgradeId) =>
        set((state) => {
          const upgradeIndex = state.clickGameState.upgrades.findIndex((u) => u.id === upgradeId)
          if (upgradeIndex === -1) return state

          const upgrade = state.clickGameState.upgrades[upgradeIndex]
          const cost = Math.floor(upgrade.cost * Math.pow(1.5, upgrade.level))

          if (state.clickGameState.coins < cost) return state

          const updatedUpgrades = [...state.clickGameState.upgrades]
          updatedUpgrades[upgradeIndex] = {
            ...upgrade,
            level: upgrade.level + 1,
          }

          let updatedClickPower = state.clickGameState.clickPower
          let updatedAutoClickRate = state.clickGameState.autoClickRate

          if (upgradeId % 2 === 1) {
            updatedClickPower += upgrade.power
          } else {
            updatedAutoClickRate += upgrade.power
          }

          return {
            clickGameState: {
              ...state.clickGameState,
              coins: state.clickGameState.coins - cost,
              clickPower: updatedClickPower,
              autoClickRate: updatedAutoClickRate,
              upgrades: updatedUpgrades,
            },
          }
        }),
      resetClickGame: () =>
        set({
          clickGameState: {
            coins: 0,
            clickPower: 1,
            autoClickRate: 0,
            upgrades: [
              { id: 1, name: "더 강한 클릭", cost: 10, power: 1, level: 0 },
              { id: 2, name: "자동 클릭", cost: 50, power: 1, level: 0 },
              { id: 3, name: "클릭 부스터", cost: 200, power: 5, level: 0 },
              { id: 4, name: "자동화 시스템", cost: 500, power: 5, level: 0 },
              { id: 5, name: "클릭 공장", cost: 2000, power: 25, level: 0 },
              { id: 6, name: "암호화폐 채굴", cost: 5000, power: 50, level: 0 },
              { id: 7, name: "양자 클릭", cost: 20000, power: 200, level: 0 },
              { id: 8, name: "AI 클릭 봇", cost: 100000, power: 1000, level: 0 },
            ],
          },
          gameState: {
            cash: 10000000,
            assets: [],
            gameTime: 0,
            isGameRunning: false,
          },
        }),
    }),
    {
      name: "invest-app-storage",
    },
  ),
)
