import { APIRequestContext, APIResponse } from '@playwright/test';
import { BASE_URL } from './env';

export async function getJson(request: APIRequestContext, url: string, options = {}): Promise<APIResponse> {
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
  return request.get(fullUrl, { ...options });
}

export async function postJson(request: APIRequestContext, url: string, data: any): Promise<APIResponse> {
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
  return request.post(fullUrl, {
    data,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function putJson(request: APIRequestContext, url: string, data: any): Promise<APIResponse> {
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
  return request.put(fullUrl, {
    data,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function deleteJson(request: APIRequestContext, url: string, data: any = {}, options = {}): Promise<APIResponse> {
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
  return request.delete(fullUrl, {
    data,
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
}
