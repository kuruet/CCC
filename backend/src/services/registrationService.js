/**
 * Registration Service
 * --------------------
 * Centralized business logic for creating and progressing
 * a registration through its lifecycle.
 *
 * IMPORTANT GUARANTEES:
 * - No emails are sent here
 * - No seats are locked here
 * - No frontend assumptions
 * - Safe to call multiple times (idempotent-friendly)
 *
 * Controllers orchestrate.
 * Services enforce rules.
 */

import Registration from "../models/Registration.js";
import { REGISTRATION_STATES } from "../utils/registrationStateMachine.js";
import { assertValidTransition } from "../utils/registrationStateMachine.js";

/**
 * Create a registration in a safe initial state.
 * This should be called BEFORE payment is initiated.
 *
 * @param {Object} payload
 * @returns {Promise<Registration>}
 */
export async function createRegistration(payload) {
  /**
   * Expected payload:
   * - userId
   * - workshopId
   * - slot
   * - name
   * - email
   * - phone
   */

  // Defensive: check if registration already exists
const existing = await Registration.findOne({
  userId: payload.userId,
  workshopId: payload.workshopId,
  status: { $ne: REGISTRATION_STATES.FAILED },
});

if (existing) {
  return existing;
}


  const registration = await Registration.create({
    ...payload,
    status: REGISTRATION_STATES.CREATED,
    lastStateTransitionAt: new Date(),
  });

  return registration;
}

/**
 * Transition registration state safely.
 * Enforces state machine rules.
 *
 * @param {ObjectId} registrationId
 * @param {string} nextState
 * @returns {Promise<Registration>}
 */
export async function transitionRegistrationState(
  registrationId,
  nextState
) {
  const registration = await Registration.findById(registrationId);

  if (!registration) {
    throw new Error("Registration not found");
  }

  const currentState = registration.status;

  // Validate transition strictly
// Idempotency: already in desired state
if (currentState === nextState) {
  return registration;
}

// Validate transition strictly
assertValidTransition(currentState, nextState);

registration.status = nextState;
registration.lastStateTransitionAt = new Date();

await registration.save();


  return registration;
}

/**
 * Attach a payment record to a registration.
 * Safe to call multiple times.
 *
 * @param {ObjectId} registrationId
 * @param {ObjectId} paymentId
 * @returns {Promise<Registration>}
 */
export async function attachPaymentToRegistration(
  registrationId,
  paymentId
) {
  const registration = await Registration.findById(registrationId);

  if (!registration) {
    throw new Error("Registration not found");
  }

  // Idempotent attach
  if (
    registration.paymentId &&
    registration.paymentId.toString() === paymentId.toString()
  ) {
    return registration;
  }

  registration.paymentId = paymentId;
  await registration.save();

  return registration;
}
