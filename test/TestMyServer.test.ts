// src/TestMyServer.test.ts
import { TestMyServer, StressTest, XSSInjectionTest, DataEncryptionTest } from '../src';
import { TestResult } from '../src/types';

describe('TestMyServer', () => {
  let testMyServer: TestMyServer; // Add semicolon here

  beforeEach(() => {
    testMyServer = new TestMyServer();
  });

  test('should register tests', () => {
    const mockTestFunction = jest.fn(async () => ({ passed: true, message: 'Test passed' }));
    testMyServer.registerTest('mockTest', mockTestFunction);

    expect(testMyServer['tests'].has('mockTest')).toBe(true);
  });

  test('should run all tests and return results', async () => {
    // Registering tests
    testMyServer.registerTest('Data Encryption Test', () => DataEncryptionTest.test('http://example.com'));
    testMyServer.registerTest('XSS Injection Test', () => XSSInjectionTest.test('http://example.com'));
    testMyServer.registerTest('Stress Test', () => StressTest.test('http://example.com', 10, 1000));

    // Running all tests
    const results = await testMyServer.runAllTests();

    expect(results.size).toBe(3);
    results.forEach(result => {
      expect(result).toHaveProperty('passed');
      expect(result).toHaveProperty('message');
    });
  });

  test('should run a specific test by name', async () => {
    testMyServer.registerTest('Data Encryption Test', () => DataEncryptionTest.test('http://example.com'));

    const result: TestResult | null = await testMyServer.runTest('Data Encryption Test');

    expect(result).toHaveProperty('passed');
    expect(result).toHaveProperty('message');
  });

  test('should return null for unregistered test', async () => {
    const result: TestResult | null = await testMyServer.runTest('Unregistered Test');
    expect(result).toBeNull();
  });
  
  // Test for DataEncryptionTest
  test('Data Encryption Test should return encrypted status', async () => {
    const result = await DataEncryptionTest.test('http://example.com'); // Replace with a test URL
    expect(result).toHaveProperty('passed');
    expect(result).toHaveProperty('message');
  });

  // Test for XSSInjectionTest
  test('XSS Injection Test should check for vulnerability', async () => {
    const result = await XSSInjectionTest.test('http://example.com'); // Replace with a test URL
    expect(result).toHaveProperty('passed');
    expect(result).toHaveProperty('message');
  });

  // Test for StressTest
  test('Stress Test should measure success rate', async () => {
    const result = await StressTest.test('http://example.com', 10, 1000); // Replace with a test URL
    expect(result).toHaveProperty('passed');
    expect(result).toHaveProperty('message');
  });
});
