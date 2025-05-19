export type IStatusKey = 'default' | 'invalid' | 'success' | 'failure';

export const statusMessages: Record<IStatusKey, string | null> = {
  default: null,
  invalid: 'Please check your details and try again.',
  success: 'Thanks! Your message was sent.',
  failure: 'Sorry, we couldn’t send your message. Please try again later.',
};
