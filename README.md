# testcafe-reporter-jira-reporter
[![Build Status](https://travis-ci.org/CyHuH/testcafe-reporter-jira-reporter.svg)](https://travis-ci.org/CyHuH/testcafe-reporter-jira-reporter)

This is the **jira-reporter** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

<p align="center">
    <img src="https://raw.github.com/CyHuH/testcafe-reporter-jira-reporter/master/media/preview.png" alt="preview" />
</p>

## Install

```
npm install testcafe-reporter-jira-reporter
```

## Usage

When you run tests from the command line, specify the reporter name by using the `--reporter` option:

```
testcafe chrome 'path/to/test/file.js' --reporter jira-reporter
```

## How does it work?

1. Creates a test cycle on task start
2. Creates test execution for each test case after it's done

Test cases ids should be stored in `meta` with name `testscase` 
e.g. `test.meta({ category: 'smoketest', testcase: 'WEB-T111' })`

Environment options:

`BASE_URL` - adaptavist url (optional, default is https://api.adaptavist.io/tm4j/v2)
`JIRA_TOKEN` - token for jira
`PROJECT_KEY` - project key
`TEST_CYCLE_NAME` - name for new test run



When you use API, pass the reporter name to the `reporter()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('chrome')
    .reporter('jira-reporter') // <-
    .run();
```

## Author
Andrey Malykh 
