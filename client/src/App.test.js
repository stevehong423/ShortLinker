import { render, screen } from '@testing-library/react';
import App from './App';
import { getUrls } from './api';

//GET API Test
describe('API Get Reqest', () => {
  test('Responds with an array of objects', async () => {
    const response = await getUrls()
    expect(response[0].length).not.toBe(0)
    expect(typeof response).toEqual('object')
    expect(typeof response[0].id).toEqual('string')
  })
})
