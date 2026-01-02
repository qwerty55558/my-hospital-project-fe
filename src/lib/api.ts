import { z } from 'zod';

/**
 * API 요청 클라이언트 (기본)
 */
export const fetchClient = async (path: string, options?: RequestInit) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, '') || '';
  const url = `${baseUrl}${path}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return await response.text();
  } catch (error) {
    console.error('API Request Failed:', error);
    throw error;
  }
};

/**
 * Zod 스키마 검증이 적용된 API 클라이언트
 * @param path - API 경로
 * @param schema - Zod 스키마
 * @param options - fetch 옵션
 */
export async function fetchWithValidation<T>(
  path: string,
  schema: z.ZodType<T>,
  options?: RequestInit
): Promise<T> {
  const data = await fetchClient(path, options);
  
  const result = schema.safeParse(data);
  
  if (!result.success) {
    console.error('API Response Validation Failed:', {
      path,
      errors: result.error.flatten(),
      receivedData: data,
    });
    throw new Error(`API Response Validation Failed: ${result.error.message}`);
  }
  
  return result.data;
}

/**
 * SWR용 Zod 검증 fetcher 생성기
 * @param schema - Zod 스키마
 */
export function createValidatedFetcher<T>(schema: z.ZodType<T>) {
  return async (path: string): Promise<T> => {
    return fetchWithValidation(path, schema);
  };
}
