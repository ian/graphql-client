import { GraphQLClient, gql } from "graphql-request"

type MakeRequestOpts = {
  auth?: string | null
  onError?: (err: any) => void
}

async function makeRequest(
  url: string,
  body: string,
  variables?: object,
  opts: MakeRequestOpts = {}
): Promise<GQLResponse> {
  const { auth, onError } = opts

  return new Promise(async (resolve, reject) => {
    try {
      const client = new GraphQLClient(url, {
        mode: "cors",
      })

      if (auth) client.setHeader("Authorization", auth)

      const res = await client.request(
        gql`
          ${body}
        `,
        variables
      )

      resolve(res)
    } catch (err) {
      if (onError) {
        onError(err)
      }
      reject(err.response)
    }
  })
}

type GQLResponse = {
  [key: string]: any
}

type MakeClientOpts = {
  debug?: boolean
  logger?: (any: any) => void
  onError?: (err: any) => void
}

export default function makeClient(url: string, opts: MakeClientOpts = {}) {
  const { debug, logger, onError } = opts

  let auth: string | null = null

  const setAuth = (a: string) => {
    auth = a
  }

  const clearAuth = () => {
    auth = null
  }

  const query = async (
    query: string,
    variables?: object
  ): Promise<GQLResponse> => {
    if (debug) {
      if (logger) {
        logger("QUERY")
        logger(query)
        logger(JSON.stringify(variables, null, 2))
      }
    }

    return makeRequest(url, query, variables, { auth, onError })
  }

  const mutation = async (
    mutation: string,
    variables?: object
  ): Promise<GQLResponse> => {
    if (debug) {
      if (logger) {
        logger("MUTATION")
        logger(mutation)
        logger(JSON.stringify(variables, null, 2))
      }
    }

    return makeRequest(url, mutation, variables, { auth, onError })
  }

  return {
    query,
    mutation,
    setAuth,
    clearAuth,
  }
}
