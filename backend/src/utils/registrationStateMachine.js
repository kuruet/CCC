/**
 * Registration State Machine
 * ---------------------------------------
 * This file defines the ONLY valid lifecycle
 * for a workshop registration.
 *
 * IMPORTANT:
 * - This file does NOT perform updates.
 * - This file does NOT talk to DB.
 * - This file does NOT trigger emails or seats.
 *
 * It only answers:
 * "Is this state transition allowed?"
 *
 * Production safety rule:
 * If it's not defined here, it MUST NOT happen.
 */

/**
 * All possible registration states
 */
export const REGISTRATION_STATES = Object.freeze({
  CREATED: "CREATED",          // Registration document created
  PAYMENT_INIT: "PAYMENT_INIT",// Razorpay order created / payment started
  PAID: "PAID",                // Payment confirmed by Razorpay (webhook)
  CONFIRMED: "CONFIRMED",      // Seat locked + email sent
  FAILED: "FAILED",            // Payment failed / expired
});

/**
 * Allowed state transitions
 * Key   -> current state
 * Value -> array of allowed next states
 */
const ALLOWED_TRANSITIONS = Object.freeze({
  [REGISTRATION_STATES.CREATED]: [
    REGISTRATION_STATES.PAYMENT_INIT,
    REGISTRATION_STATES.FAILED,
  ],

  [REGISTRATION_STATES.PAYMENT_INIT]: [
    REGISTRATION_STATES.PAID,
    REGISTRATION_STATES.FAILED,
  ],

  [REGISTRATION_STATES.PAID]: [
    REGISTRATION_STATES.CONFIRMED,
  ],

  [REGISTRATION_STATES.CONFIRMED]: [
    // Terminal state — no transitions allowed
  ],

  [REGISTRATION_STATES.FAILED]: [
    // Terminal state — no transitions allowed
  ],
});

/**
 * Check whether a transition is valid
 *
 * @param {string} fromState - current registration state
 * @param {string} toState   - desired next state
 * @returns {boolean}
 */
export function isValidTransition(fromState, toState) {
  if (!fromState || !toState) return false;

  const allowedNextStates = ALLOWED_TRANSITIONS[fromState];
  if (!Array.isArray(allowedNextStates)) return false;

  return allowedNextStates.includes(toState);
}

/**
 * Assert transition validity (strict)
 * Throws error if invalid — useful for controllers/services
 *
 * @param {string} fromState
 * @param {string} toState
 */
export function assertValidTransition(fromState, toState) {
  const valid = isValidTransition(fromState, toState);

  if (!valid) {
    throw new Error(
      `Invalid registration state transition: ${fromState} → ${toState}`
    );
  }
}

/**
 * Utility: Check if state is terminal
 * Terminal states cannot change further.
 *
 * @param {string} state
 * @returns {boolean}
 */
export function isTerminalState(state) {
  return (
    state === REGISTRATION_STATES.CONFIRMED ||
    state === REGISTRATION_STATES.FAILED
  );
}
