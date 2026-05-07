/**
 * SauceDemo test users.
 *
 * SauceDemo intentionally exposes a set of users with different behaviors —
 * perfect for demonstrating data-driven and exploratory testing.
 *
 * See docs/BUGS-DISCOVERED.md for the quirks each user surfaces.
 */
export interface SauceUser {
  username: string;
  password: string;
  description: string;
  shouldLoginSucceed: boolean;
  expectedError?: string;
}

export const PASSWORD = 'secret_sauce';

export const USERS: Record<string, SauceUser> = {
  standard: {
    username: 'standard_user',
    password: PASSWORD,
    description: 'Happy-path user — everything should work normally.',
    shouldLoginSucceed: true,
  },
  lockedOut: {
    username: 'locked_out_user',
    password: PASSWORD,
    description: 'Returns a 403-equivalent locked-out error.',
    shouldLoginSucceed: false,
    expectedError: 'Sorry, this user has been locked out',
  },
  problem: {
    username: 'problem_user',
    password: PASSWORD,
    description: 'Renders broken UI — wrong product images, broken sort, etc.',
    shouldLoginSucceed: true,
  },
  performanceGlitch: {
    username: 'performance_glitch_user',
    password: PASSWORD,
    description: 'Login is artificially slow (~5s) to simulate a perf bug.',
    shouldLoginSucceed: true,
  },
  errorUser: {
    username: 'error_user',
    password: PASSWORD,
    description: 'Triggers errors during checkout flow.',
    shouldLoginSucceed: true,
  },
  visualUser: {
    username: 'visual_user',
    password: PASSWORD,
    description: 'Visual regressions — UI looks subtly broken.',
    shouldLoginSucceed: true,
  },
};

export const INVALID_LOGINS = [
  {
    username: '',
    password: PASSWORD,
    expectedError: 'Username is required',
    case: 'empty username',
  },
  {
    username: 'standard_user',
    password: '',
    expectedError: 'Password is required',
    case: 'empty password',
  },
  {
    username: 'standard_user',
    password: 'wrong_password',
    expectedError: 'Username and password do not match',
    case: 'wrong password',
  },
  {
    username: 'ghost_user',
    password: PASSWORD,
    expectedError: 'Username and password do not match',
    case: 'non-existent user',
  },
];

export const SHIPPING_INFO = {
  firstName: 'JM',
  lastName: 'Dionisio',
  postalCode: '1100',
};

export const PRODUCTS = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltShirt: 'Sauce Labs Bolt T-Shirt',
  fleece: 'Sauce Labs Fleece Jacket',
  onesie: 'Sauce Labs Onesie',
  redShirt: 'Test.allTheThings() T-Shirt (Red)',
} as const;
