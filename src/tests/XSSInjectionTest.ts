import { TestResult } from '../types';
import fetch from 'node-fetch';

export default class XSSInjectionTest {
  static async test(url: string): Promise<TestResult> {
    const payload = "<script>alert('XSS')</script>";
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: payload })
      });

      const responseText = await response.text();
      const isVulnerable = responseText.includes(payload);

      return {
        passed: !isVulnerable,
        message: isVulnerable ? 'XSS vulnerability detected' : 'No XSS vulnerability detected'
      };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
              passed: false,
              message: `Error during XSS test: ${error.message}`,
            };
          }
          return {
            passed: false,
            message: 'Unknown error occurred during XSS test.',
          };
        
    }
  }
}