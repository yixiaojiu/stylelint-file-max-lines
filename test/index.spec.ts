import stylelint, { Config } from 'stylelint'
import { test, expect } from 'vitest'
import { join } from 'path'

function resolve(dir: string) {
  return join(__dirname, dir)
}

test('only max lines lint', async () => {
  const config: Config = {
    plugins: [resolve('../dist/index.js')],
    rules: {
      'plugin/file-max-lines': 5,
    },
  }
  const { results: normalResults } = await stylelint.lint({
    config,
    files: resolve('./css/normal.css'),
  })
  expect(normalResults[0].warnings.length).toBe(0)

  const { results: errorResults } = await stylelint.lint({
    config,
    files: resolve('./css/error.css'),
  })

  expect(errorResults[0].warnings.length).toBe(1)
  expect(errorResults[0].warnings[0].text).toBe(
    'File has too many lines (6). Maximum allowed is 5 (plugin/file-max-lines)'
  )
})

test('ignore comments', async () => {
  const config: Config = {
    plugins: [resolve('../dist/index.js')],
    rules: {
      'plugin/file-max-lines': [5, { ignore: 'comments' }],
    },
  }
  const { results: normalResults } = await stylelint.lint({
    config,
    files: resolve('./css/normal-with-coments.css'),
  })
  expect(normalResults[0].warnings.length).toBe(0)

  const { results: errorResults } = await stylelint.lint({
    config,
    files: resolve('./css/error-with-coments.css'),
  })
  expect(errorResults[0].warnings[0].text).toBe(
    'File has too many lines (6). Maximum allowed is 5 (plugin/file-max-lines)'
  )
})

test('ignore blankLines', async () => {
  const config: Config = {
    plugins: [resolve('../dist/index.js')],
    rules: {
      'plugin/file-max-lines': [5, { ignore: 'blankLines' }],
    },
  }
  const { results: normalResults } = await stylelint.lint({
    config,
    files: resolve('./css/normal-with-blankLines.css'),
  })
  expect(normalResults[0].warnings.length).toBe(0)

  const { results: errorResults } = await stylelint.lint({
    config,
    files: resolve('./css/error-with-blankLines.css'),
  })
  expect(errorResults[0].warnings[0].text).toBe(
    'File has too many lines (6). Maximum allowed is 5 (plugin/file-max-lines)'
  )
})
