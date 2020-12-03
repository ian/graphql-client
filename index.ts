import { GraphQLClient, gql } from "graphql-request"
const AUTH_TOKEN = "__auth_token"

export function getAuthToken() {
  if (typeof localStorage === "undefined") return null
  return localStorage.getItem(AUTH_TOKEN)
}

export function setAuthToken(token) {
  if (typeof localStorage === "undefined") return null
  if (token === null || token === undefined)
    return localStorage.removeItem(AUTH_TOKEN)
  return localStorage.setItem(AUTH_TOKEN, token)
}

function client(url) {
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

export default function makeClient(url) {
  const query = async (query, variables?) => {
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
          setAuthToken(null)
        } else {
          console.error(JSON.stringify(err, undefined, 2))
          reject(errors)
        }
      }
    })
  }

  const mutation = async (mutation, variables = {}) => {
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
          setAuthToken(null)
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
