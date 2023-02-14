import { calcBlankLines, hasSpecifiedValue } from '../src/utils'
import { test, expect } from 'vitest'

test('hasSpecifiedValue', () => {
  expect(hasSpecifiedValue(['comments', 'blankLines'], 'comments')).toBe(true)
  expect(hasSpecifiedValue(['comments', 'blankLines'], '')).toBe(false)
})

test('calcBlankLines', async () => {
  const splitReg = /\r\n|\n/
  const codeWithEndLine = `* {
    padding: 0;

    box-sizing: border-box;
  }
`
  expect(calcBlankLines(codeWithEndLine.split(splitReg))).toBe(1)

  const codeWithOutEndLine = `* {
    padding: 0;

    box-sizing: border-box;
  }`
  expect(calcBlankLines(codeWithEndLine.split(splitReg))).toBe(1)
})
