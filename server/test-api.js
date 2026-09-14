// Automated API test script
const http = require('http');

const request = (options, postData) => {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        let parsed = null;
        try {
          parsed = JSON.parse(data);
        } catch {
          parsed = data;
        }
        resolve({ status: res.statusCode, headers: res.headers, body: parsed });
      });
    });

    req.on('error', (e) => reject(e));

    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
};

async function runTests() {
  console.log('--- Starting API Verification Tests ---');

  // 1. Health check
  const r1 = await request({ host: 'localhost', port: 5000, path: '/', method: 'GET' });
  console.log('1. GET / -> Status:', r1.status, JSON.stringify(r1.body));

  // 2. GET /api/projects
  const r2 = await request({ host: 'localhost', port: 5000, path: '/api/projects', method: 'GET' });
  console.log('2. GET /api/projects -> Status:', r2.status, 'Count:', r2.body.length);

  // 3. GET /api/projects/dqms
  const r3 = await request({ host: 'localhost', port: 5000, path: '/api/projects/dqms', method: 'GET' });
  console.log('3. GET /api/projects/dqms -> Status:', r3.status, 'Title:', r3.body.title);

  // 4. GET /api/projects/999999 (404)
  const r4 = await request({ host: 'localhost', port: 5000, path: '/api/projects/999999', method: 'GET' });
  console.log('4. GET /api/projects/999999 -> Status:', r4.status, JSON.stringify(r4.body));

  // 5. POST /api/contact - missing name
  const r5 = await request({
    host: 'localhost',
    port: 5000,
    path: '/api/contact',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { email: 'john@example.com', message: 'Hello' });
  console.log('5. POST /api/contact (missing name) -> Status:', r5.status, JSON.stringify(r5.body));

  // 6. POST /api/contact - missing email
  const r6 = await request({
    host: 'localhost',
    port: 5000,
    path: '/api/contact',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { name: 'John Doe', message: 'Hello' });
  console.log('6. POST /api/contact (missing email) -> Status:', r6.status, JSON.stringify(r6.body));

  // 7. POST /api/contact - invalid email
  const r7 = await request({
    host: 'localhost',
    port: 5000,
    path: '/api/contact',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { name: 'John Doe', email: 'not-an-email', message: 'Hello' });
  console.log('7. POST /api/contact (invalid email) -> Status:', r7.status, JSON.stringify(r7.body));

  // 8. POST /api/contact - missing message
  const r8 = await request({
    host: 'localhost',
    port: 5000,
    path: '/api/contact',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { name: 'John Doe', email: 'john@example.com' });
  console.log('8. POST /api/contact (missing message) -> Status:', r8.status, JSON.stringify(r8.body));

  // 9. POST /api/contact - valid submission
  const r9 = await request({
    host: 'localhost',
    port: 5000,
    path: '/api/contact',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { name: 'John Doe', email: 'john@example.com', message: 'Hello from test suite!' });
  console.log('9. POST /api/contact (valid) -> Status:', r9.status, JSON.stringify(r9.body));

  // 10. GET /api/contact
  const r10 = await request({ host: 'localhost', port: 5000, path: '/api/contact', method: 'GET' });
  console.log('10. GET /api/contact -> Status:', r10.status, 'Submissions count:', r10.body.length);

  // 11. GET /api/doesnotexist (404 catch-all)
  const r11 = await request({ host: 'localhost', port: 5000, path: '/api/doesnotexist', method: 'GET' });
  console.log('11. GET /api/doesnotexist -> Status:', r11.status, JSON.stringify(r11.body));

  // 12. Malformed JSON
  const r12 = await request({
    host: 'localhost',
    port: 5000,
    path: '/api/contact',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, '{ bad json: true');
  console.log('12. Malformed JSON -> Status:', r12.status, JSON.stringify(r12.body));

  console.log('--- All Backend Tests Finished ---');
}

runTests().catch(console.error);
