import { GraphQLClient, gql } from "graphql-request"
const AUTH_TOKEN = "__auth_token"

export function getAuthToken() {
  if (typeof localStorage === "undefined") return null
  return localStorage.getItem(AUTH_TOKEN)
}

export function setAuthToken(token: string) {
  if (typeof localStorage === "undefined") return null
  if (token === null || token === undefined)
    return localStorage.removeItem(AUTH_TOKEN)
  return localStorage.setItem(AUTH_TOKEN, token)
}

export function deleteAuthToken() {
  if (typeof localStorage === "undefined") return null
  return localStorage.removeItem(AUTH_TOKEN)
}

function client(url: string) {
  const client = new GraphQLClient(url, {
    mode: "cors",
  })
  const token = getAuthToken()
  if (token) {
    client.setHeader("Authorization", token)
  }
  client.setHeader("Content-Type", "application/json")
  return client
}

export default function makeClient(url: string) {
  const query = async (query: string, variables?: object) => {
    const instance = client(url)

    if (process.env.GRAPHQL_DEBUG) {
      console.log("QUERY")
      console.log(query)
      console.log(JSON.stringify(variables, null, 2))
    }

    return new Promise(async (resolve, reject) => {
      try {
        const res = await instance.request(
          gql`
            ${query}
          `,
          variables
        )
        resolve(res)
      } catch (err) {
        const { data, errors, status } = err.response
        if (status === 401) {
          deleteAuthToken()
        } else {
          console.error(JSON.stringify(err, undefined, 2))
          reject(errors)
        }
      }
    })
  }

  const mutation = async (mutation: string, variables?: object) => {
    const instance = client(url)

    if (process.env.GRAPHQL_DEBUG) {
      console.log("MUTATION")
      console.log(mutation)
      console.log(JSON.stringify(variables, null, 2))
    }

    return new Promise(async (resolve, reject) => {
      try {
        const res = await instance.request(
          gql`
            ${mutation}
          `,
          variables
        )

        resolve(res)
      } catch (err) {
        const { data, errors, status } = err.response
        if (status === 401) {
          deleteAuthToken()
        } else {
          console.error(JSON.stringify(err, undefined, 2))
          reject(errors)
        }
      }
    })
  }

  return {
    query,
    mutation,
  }
}
