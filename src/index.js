const stylelint = require('stylelint')
const { calcBlankLines, hasEndNewLine, calcCommentLines, hasSpecifiedValue } = require('./utils')

const ruleName = 'plugin/file-max-lines'
const messages = stylelint.utils.ruleMessages(ruleName, {
  expected: (maxLines, currentLines) =>
    `File has too many lines (${currentLines}). Maximum allowed is ${maxLines}`,
})

/**
 * @type {stylelint.RuleBase<number>}
 */
const ruleFunction = (primaryOption, secondaryOptionObject) => {
  return (postcssRoot, postcssResult) => {
    const isValidate = (option) => stylelint.utils.validateOptions(postcssResult, ruleName, option)

    // verify the first option
    if (
      !isValidate({
        actual: primaryOption,
        possible: Number.isInteger,
      })
    ) {
      return
    }

    // if the second option exists, verify it
    if (
      secondaryOptionObject &&
      !isValidate({
        actual: secondaryOptionObject,
        possible: {
          ignore: ['comments', 'blankLines'],
        },
      })
    ) {
      return
    }

    const sourceArray = postcssRoot.source.input.css.split(/\r\n|\n/)
    let currentLines = sourceArray.length

    // handle newline at the end of file
    if (hasEndNewLine(sourceArray)) {
      currentLines--
    }

    if (secondaryOptionObject) {
      if (hasSpecifiedValue(secondaryOptionObject.ignore, 'blankLines')) {
        currentLines -= calcBlankLines(sourceArray)
      }

      if (hasSpecifiedValue(secondaryOptionObject.ignore, 'comments')) {
        currentLines -= calcCommentLines(postcssRoot)
      }
    }

    if (currentLines <= primaryOption) {
      return
    }

    return stylelint.utils.report({
      message: messages.expected(primaryOption, currentLines),
      node: postcssRoot,
      result: postcssResult,
      ruleName,
    })
  }
}

ruleFunction.ruleName = ruleName
ruleFunction.messages = messages

module.exports = stylelint.createPlugin(ruleName, ruleFunction)
