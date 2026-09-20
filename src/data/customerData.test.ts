import { beforeEach, describe, expect, it } from 'vitest';
import { savePaidOrder } from './cartStore';
import {
  DEFAULT_CUSTOMER,
  DEMO_CUSTOMERS,
  DEMO_PRESCRIPTIONS,
  DEMO_REFILL_REMINDERS,
  getCustomerOrders,
} from './customerData';

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

describe('customerData', () => {
  beforeEach(() => {
    storage.clear();
  });

  describe('demo profiles', () => {
    it('provides valid default customer and customer list', () => {
      expect(DEMO_CUSTOMERS.length).toBeGreaterThan(0);
      expect(DEFAULT_CUSTOMER.id).toBe('cust-budi');
      expect(DEFAULT_CUSTOMER.name).toContain('Budi Santoso');
    });

    it('contains prescriptions and refill reminders', () => {
      expect(DEMO_PRESCRIPTIONS.length).toBeGreaterThan(0);
      expect(DEMO_REFILL_REMINDERS.length).toBeGreaterThan(0);
    });
  });

  describe(getCustomerOrders, () => {
    it('returns seeded initial orders for customer', () => {
      const orders = getCustomerOrders('cust-budi');
      expect(orders.length).toBeGreaterThan(0);
      expect(orders.every((ord) => ord.customerId === 'cust-budi')).toBeTruthy();
    });

    it('merges live paid orders from session storage', () => {
      const saved = savePaidOrder({
        items: [
          {
            medicationId: 'med-01',
            name: 'Amoxicillin 500mg',
            quantity: 2,
            price: 24_000,
            unit: 'Strip (10 Kapsul)',
          },
        ],
        subtotal: 48_000,
        packagingFee: 5000,
        totalAmount: 53_000,
        paymentMethod: 'QRIS',
        shippingAddress: 'Alamat Pengujian',
        customerName: 'Budi Santoso',
        customerPhone: '08123456789',
      });

      const orders = getCustomerOrders('cust-budi');
      expect(orders[0]?.orderNumber).toBe(saved.orderNumber);
      expect(orders[0]?.totalAmount).toBe(53_000);
      expect(orders[0]?.status).toBe('processing');
    });
  });
});
