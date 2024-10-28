import { TestResult, TestFunction } from './types';

export default class TestMyServer {
  private tests: Map<string, TestFunction> = new Map();

  registerTest(name: string, testFn: TestFunction): void {
    this.tests.set(name, testFn);
  }

  async runAllTests(): Promise<Map<string, TestResult>> {
    const results = new Map<string, TestResult>();
    for (const [name, test] of this.tests) {
      results.set(name, await test());
    }
    return results;
  }

  async runTest(name: string): Promise<TestResult | null> {
    const test = this.tests.get(name);
    if (!test) return null;
    return await test();
  }
}