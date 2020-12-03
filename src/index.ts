import { GraphQLClient, gql } from "graphql-request"

let auth: string | null = null

async function makeRequest(
  url: string,
  body: string,
  variables?: object,
  auth?: string | null
): Promise<GQLResponse> {
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
      reject(err.response)
    }
  })
}

type GQLResponse = {
  status: number
  data: object
  errors?: object[]
}

export default function makeClient(url: string, opts = {}) {
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
    if (process.env.GRAPHQL_DEBUG) {
      console.log("QUERY")
      console.log(query)
      console.log(JSON.stringify(variables, null, 2))
    }

    return makeRequest(url, query, variables, auth)
  }

  const mutation = async (
    mutation: string,
    variables?: object
  ): Promise<GQLResponse> => {
    if (process.env.GRAPHQL_DEBUG) {
      console.log("MUTATION")
      console.log(mutation)
      console.log(JSON.stringify(variables, null, 2))
    }

    return makeRequest(url, mutation, variables)
  }

  return {
    query,
    mutation,
    setAuth,
    clearAuth,
  }
}
