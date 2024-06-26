import crypto from 'crypto'

export function encrypt(text: string, key: Uint8Array): string {
  try {
    if (key.length !== 32) {
      throw new Error(
        'Invalid session key length. Must be 32 bytes for AES-256.'
      )
    }

    const iv = crypto.randomBytes(12)
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)

    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    const tag = cipher.getAuthTag()

    return iv.toString('hex') + '.' + encrypted + '.' + tag.toString('hex')
  } catch (error) {
    console.error('Encryption error:', error)
    throw new Error('Encryption failed')
  }
}

export function decrypt(encryptedString: string, key: Uint8Array): string {
  try {
    if (key.length !== 32) {
      throw new Error(
        'Invalid session key length. Must be 32 bytes for AES-256.'
      )
    }

    const parts = encryptedString.split('.')
    if (parts.length !== 3) {
      throw new Error('Invalid encrypted string format')
    }
    const iv = Buffer.from(parts[0], 'hex')
    const encryptedData = parts[1]
    const authTag = Buffer.from(parts[2], 'hex')

    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
    decipher.setAuthTag(authTag)

    let decrypted = decipher.update(encryptedData, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
  } catch (error) {
    console.error('Decryption error:', error)
    throw new Error('Decryption failed')
  }
}
