import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("ko-KR").format(value)
}

export const formatChange = (value: number): string => {
  return value > 0 ? `+${value.toFixed(2)}%` : `${value.toFixed(2)}%`
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
