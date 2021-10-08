/**
 * @returns string[] - Array of ID-Like numbers.
 */
export const idRegex = /[0-9]{10,30}/g;

/**
 * @returns string[] - Array of urls.
 */
export const urlRegex = /https{0,1}:\/\/[\w]+\.[a-z]+\/{0,1}[\w]*/gi;

/**
 * @returns string[] - Array of image urls.
 */
export const imgRegex = /https{0,1}:\/\/[\w]+\.[a-z]+\/(?:[\w/]+)?[\w]+\.(png|jpg|jpeg|gif)/g;
