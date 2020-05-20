const requests = require('./requests');

const projectKey = process.env.PROJECT_KEY;
const testCycleName = process.env.TEST_CYCLE_NAME;

module.exports = function () {
    return {
        noColors: true,
        
        async reportTaskStart (startTime, userAgents, testCount) {
            this.startTime = startTime;
            this.browsers = userAgents;
            this.testCount = testCount;
            // create or get test cycle here
            const resp = await requests.createTestCycle(testCycleName, projectKey, this.browsers[0], 'in progress');

            this.testCycleKey = resp.key;
        },

        reportFixtureStart (name, path, meta) {
            this.fixtureName = name;
            this.fixturePath = path;
            this.fixtureMeta = meta;
        },

        reportTestStart (/* name, testMeta */) {
            // NOTE: This method is optional.
        },

        reportTestDone (name, testRunInfo, meta) {
            const duration = testRunInfo.durationMs;
            var comment = name;

            const hasErr = !!testRunInfo.errs.length;
            var status;

            status = hasErr ? 'fail' : 'pass';
            // implement test report here
            if (!testRunInfo.skipped && 'testcase' in meta && meta.testcase.length > 0)
                requests.createTestExecution(projectKey, this.testCycleKey, meta.testcase, status, duration, comment);
        },

        reportTaskDone (endTime, passed, warnings) {
            this.endTime = endTime;
            this.passed = passed;
            this.warnings = warnings;
            // do something here
        }
    };
};
