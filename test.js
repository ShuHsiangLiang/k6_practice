import http from 'k6/http';
import { Rate } from 'k6/metrics';

const myFailRate = new Rate('failed requests');

export const options = {
  thresholds: {
    'failed requests': ['rate<0.1'], // threshold on a custom metric
    'http_req_duration': ['p(95)<500'], // threshold on a standard metric
  },
};

export default function () {
  const res = http.get('https://test-api.k6.io/public/crocodiles/1/');
  myFailRate.add(res.status !== 200);
}