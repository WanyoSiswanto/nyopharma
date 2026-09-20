import { beforeEach, describe, expect, it } from 'vitest';
import {
  addToCart,
  calculateCartSummary,
  clearCart,
  getStoredCart,
  getStoredPaidOrders,
  removeFromCart,
  savePaidOrder,
  updateCartQuantity,
  updateOrderFulfillment,
} from './cartStore';
import { MEDICATIONS_DATA } from './medicationsData';

const storage = new Map<string, string>();
const localStorageMock = {
  getItem: (key: string) => storage.get(key) ?? null,
  setItem: (key: string, value: string) => {
    storage.set(key, value);
  },
  removeItem: (key: string) => {
    storage.delete(key);
  },
  clear: () => {
    storage.clear();
  },
};

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

Object.defineProperty(globalThis, 'window', {
  value: {
    dispatchEvent: () => true,
    localStorage: localStorageMock,
  },
  writable: true,
});

describe('cartStore', () => {
  beforeEach(() => {
    storage.clear();
  });

  describe('cart operations', () => {
    it('adds medication to cart and updates count', () => {
      const [paracetamol] = MEDICATIONS_DATA;
      if (!paracetamol) {
        throw new Error('Paracetamol not found');
      }

      const cart = addToCart(paracetamol, 2);
      expect(cart).toHaveLength(1);
      expect(cart[0]?.quantity).toBe(2);

      const stored = getStoredCart();
      expect(stored).toHaveLength(1);
      expect(stored[0]?.product.id).toBe(paracetamol.id);
    });

    it('updates quantity of existing cart item', () => {
      const [paracetamol] = MEDICATIONS_DATA;
      if (!paracetamol) {
        throw new Error('Paracetamol not found');
      }

      addToCart(paracetamol, 1);
      const updated = updateCartQuantity(paracetamol.id, 5);
      expect(updated[0]?.quantity).toBe(5);
    });

    it('removes item when quantity is reduced to zero', () => {
      const [paracetamol] = MEDICATIONS_DATA;
      if (!paracetamol) {
        throw new Error('Paracetamol not found');
      }

      addToCart(paracetamol, 2);
      const updated = updateCartQuantity(paracetamol.id, 0);
      expect(updated).toHaveLength(0);
    });

    it('removes specific product from cart', () => {
      const [paracetamol] = MEDICATIONS_DATA;
      if (!paracetamol) {
        throw new Error('Paracetamol not found');
      }

      addToCart(paracetamol, 2);
      const remaining = removeFromCart(paracetamol.id);
      expect(remaining).toHaveLength(0);
    });

    it('clears all items in cart', () => {
      const [paracetamol] = MEDICATIONS_DATA;
      if (!paracetamol) {
        throw new Error('Paracetamol not found');
      }

      addToCart(paracetamol, 2);
      clearCart();
      expect(getStoredCart()).toHaveLength(0);
    });
  });

  describe('cart summary calculations', () => {
    it('applies CDOB packaging fee for orders under 50.000', () => {
      const [paracetamol] = MEDICATIONS_DATA;
      if (!paracetamol) {
        throw new Error('Paracetamol not found');
      }

      const summary = calculateCartSummary([{ product: paracetamol, quantity: 2 }]);
      expect(summary.totalCount).toBe(2);
      expect(summary.subtotal).toBe(17_000);
      expect(summary.packagingFee).toBe(2500);
      expect(summary.totalAmount).toBe(19_500);
    });

    it('waives CDOB packaging fee for orders exceeding 50.000', () => {
      const esterC = MEDICATIONS_DATA.find((m) => m.id === 'med-03');
      if (!esterC) {
        throw new Error('Ester-C not found');
      }

      const summary = calculateCartSummary([{ product: esterC, quantity: 2 }]);
      expect(summary.subtotal).toBe(96_000);
      expect(summary.packagingFee).toBe(0);
      expect(summary.totalAmount).toBe(96_000);
    });
  });

  describe('paid order fulfillment', () => {
    it('persists verified paid order with processing fulfillment status', () => {
      const newOrder = savePaidOrder({
        customerName: 'Budi Santoso',
        customerPhone: '081234567890',
        shippingAddress: 'Jl. Senopati No. 88, Jakarta',
        items: [
          {
            medicationId: 'med-01',
            name: 'Paracetamol 500 mg Kaplet',
            quantity: 2,
            price: 8500,
            unit: 'Strip @ 10 Kaplet',
          },
        ],
        subtotal: 17_000,
        packagingFee: 2500,
        totalAmount: 19_500,
        paymentMethod: 'QRIS Instan',
      });

      expect(newOrder.orderNumber).toMatch(/^NYO-ORD-\d{6}-\d{4}$/u);
      expect(newOrder.paymentStatus).toBe('paid');
      expect(newOrder.fulfillmentStatus).toBe('processing');

      const allOrders = getStoredPaidOrders();
      expect(allOrders).toHaveLength(1);
      expect(allOrders[0]?.id).toBe(newOrder.id);
    });

    it('updates fulfillment status to ready_to_ship and delivered', () => {
      const created = savePaidOrder({
        customerName: 'Dewi Sartika',
        customerPhone: '081298765432',
        shippingAddress: 'Jl. Cikini Raya No. 45, Jakarta',
        items: [],
        subtotal: 50_000,
        packagingFee: 0,
        totalAmount: 50_000,
        paymentMethod: 'BCA Virtual Account',
      });

      const step1 = updateOrderFulfillment(created.id, 'ready_to_ship');
      expect(step1[0]?.fulfillmentStatus).toBe('ready_to_ship');

      const step2 = updateOrderFulfillment(created.id, 'delivered');
      expect(step2[0]?.fulfillmentStatus).toBe('delivered');
    });
  });
});
