import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      enabled: true, 
      provider: 'v8', 
      reporter: ['text', 'json', 'html'], 
      

      thresholds: {
        lines: 80,       
        statements: 80, 
        functions: 80,   
        branches: 80,    
      },
    },
  },
});
