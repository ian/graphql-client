declare type GQLResponse = {
    [key: string]: any;
};
declare type MakeClientOpts = {
    debug?: boolean;
    logger?: (any: any) => void;
    onError?: (err: any) => void;
};
export default function makeClient(url: string, opts?: MakeClientOpts): {
    query: (query: string, variables?: object | undefined) => Promise<GQLResponse>;
    mutation: (mutation: string, variables?: object | undefined) => Promise<GQLResponse>;
    setAuth: (a: string) => void;
    clearAuth: () => void;
};
export {};
