import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe("random関数のテスト", () => {
  test("0~1でランダムに数値を生成するテスト", () => {
    const app = new App({})
    for (let i = 0; i < 100; i++) {
      const randValue = app.rand(0, 100)
      expect(randValue).toBeGreaterThanOrEqual(0)
      expect(randValue).toBeLessThanOrEqual(100)
    }
  })
})
