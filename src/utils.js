/**
 *
 * @param {any[]} arr
 * @param {any} value
 * @returns {boolean}
 */
const hasSpecifiedValue = (arr, value) => arr.includes(value)

/**
 *
 * @param {string} lineStr
 * @returns {boolean}
 */
const isBlankLine = (lineStr) => {
  for (const char of lineStr) {
    if (char !== ' ') {
      return false
    }
  }
  return true
}

/**
 *
 * @param {string[]} sourceArray
 * @returns {boolean}
 */
const hasEndNewLine = (sourceArray) => {
  if (sourceArray.length && sourceArray[sourceArray.length - 1] === '') {
    return true
  } else {
    return false
  }
}

/**
 *
 * @param {string[]} sourceArray
 * @returns {number}
 */
const calcBlankLines = (sourceArray) => {
  let blankLines = 0
  for (const line of sourceArray) {
    if (isBlankLine(line)) {
      blankLines++
    }
  }
  if (hasEndNewLine(sourceArray)) {
    blankLines > 0 && blankLines--
  }
  return blankLines
}

/**
 * @returns {number}
 */
const calcCommentLines = (postcssRoot) => {
  let commentLines = 0
  postcssRoot.walkComments((comments) => {
    commentLines += comments.source.end.line - comments.source.start.line + 1
  })
  return commentLines
}

module.exports = {
  hasSpecifiedValue,
  hasEndNewLine,
  calcBlankLines,
  calcCommentLines,
}
