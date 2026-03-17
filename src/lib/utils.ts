import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function camelToKebab(value: string): string {
  return value.replaceAll(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
