/**
 * Format strings to create string template
 */

export const fieldIsEmpty = (field: string) => `${field} is empty`
export const invalidMonth = () => `Month must be between 1-12 inclusive`
export const invalidDay = () => `Day should be between 1-31 inclusive`
export const notValidObjectIdFormat = (field: string) => `${field} is not of valid ObjectId format`
