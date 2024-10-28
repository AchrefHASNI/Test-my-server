export type TestResult = {
    passed: boolean;
    message: string;
  };
  
  export type TestFunction = () => Promise<TestResult>;