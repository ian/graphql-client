declare type GQLResponse = {
    status: number;
    data: object;
    errors?: object[];
};
export default function makeClient(url: string, opts?: {}): {
    query: (query: string, variables?: object | undefined) => Promise<GQLResponse>;
    mutation: (mutation: string, variables?: object | undefined) => Promise<GQLResponse>;
    setAuth: (a: string) => void;
    clearAuth: () => void;
};
export {};
