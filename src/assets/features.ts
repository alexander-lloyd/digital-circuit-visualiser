// Features:
export const RENDER_UNIT_SQUARE = 'RENDER_UNIT_SQUARE';

export type FEATURES_KEYS = typeof RENDER_UNIT_SQUARE;

// (Id, Name)

type Feature = [FEATURES_KEYS, string];

export type Features = Feature[];
export const FEATURES: Features = [['RENDER_UNIT_SQUARE', 'Render Unit Squares']];
