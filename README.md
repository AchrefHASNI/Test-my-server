# TestMyServer

TestMyServer testing library for Node.js applications. It provides a set of tools to test your application for common vulnerabilities, including stress testing, XSS injection, and data encryption..

## Installation
```bash
npm install test-my-server
```
## Usage 

* With Express.js example

```javascript
const express = require('express');
const { VulnProbe, StressTest, XSSInjectionTest, DataEncryptionTest } = require('vulnprobe');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  
  // Run vulnerability tests
  const probe = new VulnProbe();
  
  probe.registerTest('stress', () => StressTest.test(`http://localhost:${port}`, 10, 5000));
  probe.registerTest('xss', () => XSSInjectionTest.test(`http://localhost:${port}/submit`));
  probe.registerTest('encryption', () => DataEncryptionTest.test(`http://localhost:${port}`));
  
  probe.runAllTests().then((results) => {
    for (const [name, result] of results) {
      console.log(`${name}: ${result.passed ? 'PASSED' : 'FAILED'} - ${result.message}`);
    }
  });
});

```

* With Fastify example

```javascript
const fastify = require('fastify')({ logger: true });
const { VulnProbe, StressTest, XSSInjectionTest, DataEncryptionTest } = require('vulnprobe');

fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

const start = async () => {
  try {
    await fastify.listen(3000);
    
    // Run vulnerability tests
    const probe = new VulnProbe();
    
    probe.registerTest('stress', () => StressTest.test('http://localhost:3000', 10, 5000));
    probe.registerTest('xss', () => XSSInjectionTest.test('http://localhost:3000/submit'));
    probe.registerTest('encryption', () => DataEncryptionTest.test('http://localhost:3000'));
    
    const results = await probe.runAllTests();
    for (const [name, result] of results) {
      console.log(`${name}: ${result.passed ? 'PASSED' : 'FAILED'} - ${result.message}`);
    }
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

## 💻 Built with

Technologies used in the project:

*   Typescript
## APIand Features

### VulnProbe

- `registerTest(name: string, testFn: TestFunction): void`: Register a new test
- `runAllTests(): Promise<Map<string, TestResult>>`: Run all registered tests
- `runTest(name: string): Promise<TestResult | null>`: Run a specific test


### StressTest

- `static test(url: string, concurrency: number, duration: number): Promise<TestResult>`: Run a stress test


### XSSInjectionTest

- `static test(url: string): Promise<TestResult>`: Run an XSS injection test


### DataEncryptionTest

- `static test(url: string): Promise<TestResult>`: Run a data encryption test

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💻 Technologies used in the project:
![Static Badge](https://img.shields.io/badge/Javascript-JS-yellow)

![Static Badge](https://img.shields.io/badge/Typescript-TS-blue)

## 🛡️ License: 
MIT