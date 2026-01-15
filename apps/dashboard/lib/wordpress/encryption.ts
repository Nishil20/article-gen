/**
 * WordPress Password Encryption Utilities
 * Handles encryption and decryption of WordPress application passwords
 */

import CryptoJS from 'crypto-js'

/**
 * Get encryption key from environment variable
 * This should be a secure random string stored in .env
 */
function getEncryptionKey(): string {
  const key = process.env.WORDPRESS_ENCRYPTION_KEY

  if (!key) {
    throw new Error(
      'WORDPRESS_ENCRYPTION_KEY is not defined in environment variables. ' +
      'Please add it to your .env.local file.'
    )
  }

  return key
}

/**
 * Encrypt a WordPress application password
 * Uses AES encryption with the secret key from environment
 *
 * @param password - Plain text WordPress application password
 * @returns Encrypted password string
 */
export function encryptPassword(password: string): string {
  try {
    const key = getEncryptionKey()
    const encrypted = CryptoJS.AES.encrypt(password, key).toString()
    return encrypted
  } catch (error) {
    console.error('Password encryption failed:', error)
    throw new Error('Failed to encrypt password')
  }
}

/**
 * Decrypt a WordPress application password
 * Decrypts AES encrypted password using the secret key
 *
 * @param encryptedPassword - Encrypted password string from database
 * @returns Decrypted plain text password
 */
export function decryptPassword(encryptedPassword: string): string {
  try {
    const key = getEncryptionKey()
    const decrypted = CryptoJS.AES.decrypt(encryptedPassword, key)
    const password = decrypted.toString(CryptoJS.enc.Utf8)

    if (!password) {
      throw new Error('Decryption resulted in empty string')
    }

    return password
  } catch (error) {
    console.error('Password decryption failed:', error)
    throw new Error('Failed to decrypt password')
  }
}

/**
 * Validate encryption key exists and is properly configured
 * Should be called at application startup or before first encryption
 *
 * @returns true if encryption is properly configured
 */
export function validateEncryptionSetup(): boolean {
  try {
    const key = getEncryptionKey()

    // Key should be at least 32 characters for good security
    if (key.length < 32) {
      console.warn(
        'WORDPRESS_ENCRYPTION_KEY is shorter than recommended (32 characters). ' +
        'Consider using a longer key for better security.'
      )
      return false
    }

    return true
  } catch (error) {
    console.error('Encryption setup validation failed:', error)
    return false
  }
}

/**
 * Generate a random encryption key
 * Use this to generate a secure key for WORDPRESS_ENCRYPTION_KEY
 * Should only be used during initial setup
 *
 * @param length - Length of the key (default: 64 characters)
 * @returns Random encryption key
 */
export function generateEncryptionKey(length: number = 64): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
  let key = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length)
    key += charset[randomIndex]
  }

  return key
}
