export interface Product {
  type: 'Savings' | 'Checking' | 'Business';
  title: string;
  subtitle: string;
  benefits: string[];
}

export const PRODUCTS: Product[] = [
  {
    type: 'Savings',
    title: 'SmartSaver Account',
    subtitle: 'Earn more as you save',
    benefits: [
      'Attractive tiered interest rates',
      'No minimum balance fees',
      '24/7 online & mobile access',
      'Free ATM withdrawals at 50,000+ locations',
      'Auto-save round-up feature for effortless saving',
    ],
  },
  {
    type: 'Checking',
    title: 'Everyday Checking',
    subtitle: 'Bank the way you live',
    benefits: [
      'Unlimited free transfers & bill payments',
      'Contactless debit card included',
      'Real-time spending alerts',
      'Overdraft protection available',
      'Mobile check deposit with instant funds availability',
    ],
  },
  {
    type: 'Business',
    title: 'BizGrowth Account',
    subtitle: 'Power up your business',
    benefits: [
      'Multi-user access & permissions',
      'Seamless payroll & invoicing tools',
      'Preferential FX rates',
      'Dedicated business relationship manager',
      'Customizable reporting and analytics dashboard',
    ],
  },
];
