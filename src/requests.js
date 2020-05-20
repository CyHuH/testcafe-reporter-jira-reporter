'use strict';

const req = require('request-promise');

const baseUrl = process.env.BASE_URL ? process.env.BASE_URL : 'https://api.adaptavist.io/tm4j/v2';
const token = `Bearer ${process.env.JIRA_TOKEN}`;

function createTestExecution (projectKey, testCycleKey, testCaseKey, status, executionTime, comment = '') {

    const headers = {
        'Authorization': token,
        'Content-Type':  ['application/json', 'text/plain']
    };
    const reqBody = {
        'projectKey':    projectKey,
        'statusName':    status,
        'testCaseKey':   testCaseKey,
        'testCycleKey':  testCycleKey,
        'executionTime': executionTime,
        'comment':       comment
    };

    var options = {
        method:  'POST',
        uri:     `${baseUrl}/testexecutions`,
        headers: headers,
        json:    reqBody
    };

    return req(options, function (error, response) { 
        if (error) throw new Error(error);
        console.log('request', options);
        console.log('response', response.body);
    });
}

async function createTestCycle (name, projectKey, description, status, ownerId = '') {
    const headers = {
        'Authorization': token,
        'Content-Type':  ['application/json', 'text/plain']
    };
    const reqBody = {
        'name':        name,
        'projectKey':  projectKey,
        'description': description,
        'statusName':  status,
        'ownerId':     ownerId
    };

    var options = {
        method:  'POST',
        uri:     `${baseUrl}/testcycles`,
        headers: headers,
        json:    reqBody
    };

    const resp = await req(options);

    return resp;
}

module.exports = { createTestExecution, createTestCycle };
