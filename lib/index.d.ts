declare type GQLResponse = {
    [key: string]: any;
};
declare type Opts = {
    debug?: boolean;
    logger?: (any: any) => void;
};
export default function makeClient(url: string, opts?: Opts): {
    query: (query: string, variables?: object | undefined) => Promise<GQLResponse>;
    mutation: (mutation: string, variables?: object | undefined) => Promise<GQLResponse>;
    setAuth: (a: string) => void;
    clearAuth: () => void;
};
export {};
