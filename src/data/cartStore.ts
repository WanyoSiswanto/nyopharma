'use client';

import type { MedicationItem, PaidOrder } from './medicationsData';

export type CartItem = {
  product: MedicationItem;
  quantity: number;
};

const CART_STORAGE_KEY = 'nyo_cart_items';
const ORDERS_STORAGE_KEY = 'nyo_paid_orders';
const CART_EVENT_NAME = 'nyo_cart_updated';
const ORDERS_EVENT_NAME = 'nyo_orders_updated';

function isCartItemArray(val: unknown): val is CartItem[] {
  return Array.isArray(val);
}

function isPaidOrderArray(val: unknown): val is PaidOrder[] {
  return Array.isArray(val);
}

// Read current cart items from localStorage
export function getStoredCart(): CartItem[] {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed: unknown = JSON.parse(raw);
    return isCartItemArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function notifyCartUpdated(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CART_EVENT_NAME));
  }
}

function notifyOrdersUpdated(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(ORDERS_EVENT_NAME));
  }
}

// Add a medication to cart or increase quantity
export function addToCart(product: MedicationItem, quantity = 1): CartItem[] {
  const currentCart = getStoredCart();
  const existingIndex = currentCart.findIndex((item) => item.product.id === product.id);

  let updated: CartItem[];
  if (existingIndex === -1) {
    updated = [...currentCart, { product, quantity }];
  } else {
    const existing = currentCart[existingIndex];
    if (existing) {
      existing.quantity += quantity;
    }
    updated = [...currentCart];
  }

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage quota errors
  }
  notifyCartUpdated();
  return updated;
}

// Remove an item from cart
export function removeFromCart(productId: string): CartItem[] {
  const currentCart = getStoredCart();
  const updated = currentCart.filter((item) => item.product.id !== productId);

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage quota errors
  }
  notifyCartUpdated();
  return updated;
}

// Update quantity of a specific item in cart
export function updateCartQuantity(productId: string, quantity: number): CartItem[] {
  if (quantity <= 0) {
    return removeFromCart(productId);
  }

  const currentCart = getStoredCart();
  const updated = currentCart.map((item) => {
    if (item.product.id === productId) {
      return { ...item, quantity };
    }
    return item;
  });

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage quota errors
  }
  notifyCartUpdated();
  return updated;
}

// Clear all items from cart
export function clearCart(): void {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch {
    // Ignore storage quota errors
  }
  notifyCartUpdated();
}

// Calculate totals for current cart
export function calculateCartSummary(cartItems: CartItem[]): {
  totalCount: number;
  subtotal: number;
  packagingFee: number;
  totalAmount: number;
  hasPrescriptionMedication: boolean;
} {
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  // Free CDOB tamper-evident packaging above Rp 50.000, otherwise Rp 2.500
  const packagingFee = subtotal > 50_000 || subtotal === 0 ? 0 : 2500;
  const totalAmount = subtotal + packagingFee;
  const hasPrescriptionMedication = cartItems.some((item) => item.product.isPrescriptionRequired);

  return {
    totalCount,
    subtotal,
    packagingFee,
    totalAmount,
    hasPrescriptionMedication,
  };
}

// Get all verified paid orders (used by Pharmacy Dashboard)
export function getStoredPaidOrders(): PaidOrder[] {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed: unknown = JSON.parse(raw);
    return isPaidOrderArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Save a newly verified paid order into database / localStorage
export function savePaidOrder(
  order: Omit<PaidOrder, 'id' | 'orderNumber' | 'paidAt' | 'paymentStatus' | 'fulfillmentStatus'>,
): PaidOrder {
  const currentOrders = getStoredPaidOrders();
  const now = new Date();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const orderNumber = `NYO-ORD-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}-${randomSuffix}`;

  const newOrder: PaidOrder = {
    ...order,
    id: `ord-${Date.now()}`,
    orderNumber,
    paidAt: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    paymentStatus: 'paid',
    fulfillmentStatus: 'processing',
  };

  const updatedOrders = [newOrder, ...currentOrders];
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));
  } catch {
    // Ignore storage errors
  }
  notifyOrdersUpdated();
  return newOrder;
}

// Update order fulfillment state by Pharmacist
export function updateOrderFulfillment(
  orderId: string,
  status: 'processing' | 'ready_to_ship' | 'delivered',
): PaidOrder[] {
  const currentOrders = getStoredPaidOrders();
  const updated = currentOrders.map((ord) => {
    if (ord.id === orderId) {
      return { ...ord, fulfillmentStatus: status };
    }
    return ord;
  });

  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage errors
  }
  notifyOrdersUpdated();
  return updated;
}
