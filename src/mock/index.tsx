export const mockRetrieveData = {
  id: '6357a30a1708ec36bd90564d',
  method: 'GET',
  endpoint: 'http://qingkong.rico.org.cn/api/cov/calendar/{{id}}',
  preRequestScript: null,
  testScript:
    '\n// Check status code is 200\narex.test("Status code is 200", ()=> {\n    arex.expect(arex.response.status).toBe(300);\n});\n',
  body: {
    contentType: 'application/json',
    body: '{}',
  },
  headers: [
    {
      key: 'token',
      value: '123',
      active: true,
    },
    {
      key: 'cookie',
      value: 'aaaa=123',
      active: true,
    },
  ],
  params: [
    {
      key: 'name',
      value: 'zt',
      active: true,
    },
    {
      key: 'age',
      value: '18',
      active: true,
    },
  ],
  auth: null,
};
export const mockEnvironmentData = {
  envName: 'dev',
  keyValues: [
    {
      key: 'id',
      value: '45',
    },
  ],
};
