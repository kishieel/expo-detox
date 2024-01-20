import { useCallback, useState } from 'react';

const baseUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export const useRequest = <T, R = unknown>(method: 'GET' | 'POST', path: string) => {
    const [response, setResponse] = useState<R | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const controller = new AbortController();

    const run = useCallback(async (data: T): Promise<R | Error> => {
        setLoading(true);
        let result: R | Error;

        try {
            const response = await fetch(baseUrl + path, {
                method,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                signal: controller.signal,
            });
            result = (await response.json()) as R;

            setResponse(result);
        } catch (error) {
            result = error instanceof Error ? error : new Error('Unknown error');
            setError(result);
        } finally {
            setLoading(false);
        }

        return result;
    }, []);

    const abort = useCallback(() => {
        controller.abort();
    }, []);

    return { response, loading, error, run, abort };
};
