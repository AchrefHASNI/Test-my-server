import { TestResult } from '../types';
import fetch from 'node-fetch';

export default class StressTest {
  static async test(url: string, concurrency: number, duration: number): Promise<TestResult> {
    const start = Date.now();
    let requestCount = 0;
    let errorCount = 0;

    const makeRequest = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) errorCount++;
      } catch {
        errorCount++;
      }
      requestCount++;
    };

    const runConcurrentRequests = () => {
      return Promise.all(Array(concurrency).fill(null).map(() => makeRequest()));
    };

    while (Date.now() - start < duration) {
      await runConcurrentRequests();
    }

    const successRate = (requestCount - errorCount) / requestCount;
    const passed = successRate > 0.95; // 95% success rate threshold

    return {
      passed,
      message: `Stress test ${passed ? 'passed' : 'failed'}. Success rate: ${(successRate * 100).toFixed(2)}%`
    };
  }
}