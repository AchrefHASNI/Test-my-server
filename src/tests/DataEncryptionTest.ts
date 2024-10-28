import { TestResult } from '../types';
import fetch from 'node-fetch';

export default class DataEncryptionTest {
  static async test(url: string): Promise<TestResult> {
    try {
      const response = await fetch(url);
      const isEncrypted = response.headers.get('Content-Encoding') === 'gzip' || 
                          response.headers.get('X-Content-Encoding') === 'gzip';

      return {
        passed: isEncrypted,
        message: isEncrypted ? 'Data is encrypted (GZIP encoding detected)' : 'Data is not encrypted (No GZIP encoding detected)'
      };
    } catch (error:any) {
      return {
        passed: false,
        message: `Error during encryption test: ${error.message}`
      };
    }
  }
}