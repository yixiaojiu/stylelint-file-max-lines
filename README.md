# stylelint-file-max-lines

[![NPM version](https://img.shields.io/npm/v/stylelint-z-index-value-constraint.svg)](https://img.shields.io/npm/v/stylelint-file-max-lines.svg)
[![Build Status](https://github.com/yixiaojiu/stylelint-file-max-lines/workflows/CI/badge.svg)](https://github.com/yixiaojiu/stylelint-file-max-lines/actions)

Stylelint rule for limiting a maximum number of lines per file.

Please note that most editors show an additional empty line at the end if the file ends with a line break. This plugin does not count that extra line.

---

This plugin is inspired by [eslint max-lines](https://eslint.org/docs/latest/rules/max-lines) and is an enhancement to [dkrnl/stylelint-max-lines](https://github.com/dkrnl/stylelint-max-lines)

## install

```sh
npm i stylelint-file-max-lines -D
```

## Usage

Add this config to your `.stylelintrc`:

```json
{
  "plugins": ["stylelint-file-max-lines"],
  "rules": {
    "plugin/file-max-lines": 300
  }
}
```

## Options

`int`: maximum number of lines per file

For example, with `5`:

```json
{
  "plugins": ["stylelint-file-max-lines"],
  "rules": {
    "plugin/file-max-lines": 5
  }
}
```

The following css file will get an error: `'File has too many lines (6). Maximum allowed is 5 (plugin/file-max-lines)`

```css
body {
  border: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

## Optional secondary options

`ignore: "comments" | "blankLines"`

### Ignore comments

```json
{
  "plugins": ["stylelint-file-max-lines"],
  "rules": {
    "plugin/file-max-lines": [5, { "ignore": "comments" }]
  }
}
```

The following css file are not considered problems

```css
body {
  /* border: none; */
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

### Ignore blankLines

```json
{
  "plugins": ["stylelint-file-max-lines"],
  "rules": {
    "plugin/file-max-lines": [5, { "ignore": "blankLines" }]
  }
}
```

The following css file are not considered problems

```css
body {
  margin: 0;
  padding: 0;

  box-sizing: border-box;
}
```
