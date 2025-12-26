export type ConsentChoice = "accept" | "reject";

export interface ConsentState {
  choice: ConsentChoice;
  at: string;
}

export const CONSENT_STORAGE_KEY = "siteConsentV1";
