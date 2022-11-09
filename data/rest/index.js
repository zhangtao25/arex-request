export * from './content-types';
export * from './HoppRESTAuth';
export const RESTReqSchemaVersion = '1';
export function makeRESTRequest(x) {
    return {
        ...x,
        v: RESTReqSchemaVersion,
    };
}
export function isHoppRESTRequest(x) {
    return x && typeof x === 'object' && 'v' in x;
}
function parseRequestBody(x) {
    if (x.contentType === 'application/json') {
        return {
            contentType: 'application/json',
            body: x.rawParams,
        };
    }
    return {
        contentType: 'application/json',
        body: '',
    };
}
export function translateToNewRequest(x) {
    if (isHoppRESTRequest(x)) {
        return x;
    }
    else {
        // Old format
        const endpoint = `${x?.url ?? ''}${x?.path ?? ''}`;
        const headers = x?.headers ?? [];
        // Remove old keys from params
        const params = (x?.params ?? []).map(({ key, value, active }) => ({
            key,
            value,
            active,
        }));
        const name = x?.name ?? 'Untitled request';
        const method = x?.method ?? '';
        const preRequestScript = x?.preRequestScript ?? '';
        const testScript = x?.testScript ?? '';
        const body = parseRequestBody(x);
        const auth = parseOldAuth(x);
        const result = {
            name,
            endpoint,
            headers,
            params,
            method,
            preRequestScript,
            testScript,
            body,
            auth,
            v: RESTReqSchemaVersion,
        };
        if (x.id)
            result.id = x.id;
        return result;
    }
}
export function parseOldAuth(x) {
    if (!x.auth || x.auth === 'None')
        return {
            authType: 'none',
            authActive: true,
        };
    if (x.auth === 'Basic Auth')
        return {
            authType: 'basic',
            authActive: true,
            username: x.httpUser,
            password: x.httpPassword,
        };
    if (x.auth === 'Bearer Token')
        return {
            authType: 'bearer',
            authActive: true,
            token: x.bearerToken,
        };
    return { authType: 'none', authActive: true };
}
