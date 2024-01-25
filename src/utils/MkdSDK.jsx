export default function MkdSDK() {
  this._baseurl = "https://reacttask.mkdlabs.com"
  this._project_id = "reacttask"
  this._secret = "d9hedycyv6p7zw8xi34t9bmtsjsigy5t7"
  this._table = ""
  this._custom = ""
  this._method = ""

  const raw = this._project_id + ":" + this._secret
  let base64Encode = btoa(raw)

  this.setTable = function (table) {
    this._table = table
  }

  this.login = async (email, password, role) => {
    const url = `${this._baseurl}/v2/api/lambda/login`

    const headers = new Headers()
    headers.append("Authorization", `${base64Encode}`)
    headers.append("Content-Type", "application/json")
    headers.append("x-project", `${base64Encode}`)
    const body = JSON.stringify({
      email: email,
      password: password,
      role: "admin",
    })

    const options = {
      method: "POST",
      headers: headers,
      body: body,
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok) {
        localStorage.setItem("token", data?.token)
        return data
      } else {
        console.error("Login failed:", data)
      }
    } catch (error) {
      console.error("Error during login:", error)
    }
  }

  this.getHeader = function () {
    return {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "x-project": base64Encode,
    }
  }

  this.baseUrl = function () {
    return this._baseurl
  }

  this.callRestAPI = async function (payload, method) {
    const header = {
      "Content-Type": "application/json",
      "x-project": base64Encode,
      Authorization: "Bearer " + localStorage.getItem("token"),
    }

    switch (method) {
      case "GET":
        const getResult = await fetch(
          this._baseurl + `/v1/api/rest/video${this._table}/GET`,
          {
            method: "post",
            headers: header,
            body: JSON.stringify(payload),
          }
        )
        const jsonGet = await getResult.json()

        if (getResult.status === 401) {
          throw new Error(jsonGet.message)
        }

        if (getResult.status === 403) {
          throw new Error(jsonGet.message)
        }
        return jsonGet

      case "PAGINATE":
        if (!payload.page) {
          payload.page = 1
        }
        if (!payload.limit) {
          payload.limit = 10
        }
        const paginateResult = await fetch(
          this._baseurl + `/v1/api/rest/video${this._table}/${method}`,
          {
            method: "post",
            headers: header,
            body: JSON.stringify(payload),
          }
        )
        const jsonPaginate = await paginateResult.json()

        if (paginateResult.status === 401) {
          throw new Error(jsonPaginate.message)
        }

        if (paginateResult.status === 403) {
          throw new Error(jsonPaginate.message)
        }
        return jsonPaginate
      default:
        break
    }
  }

  this.check = async function (role) {
    const url = "https://reacttask.mkdlabs.com/v2/api/lambda/check"
    const checkUrl = `${url}?role=${role}`

    const headers = new Headers()
    headers.append("Authorization", `${base64Encode}`)
    headers.append("x-project", `${base64Encode}`)
    headers.append("Content-Type", "application/json")

    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        role: role,
      }),
    }

    try {
      const response = await fetch(checkUrl, options)
      if (response.ok) {
        console.log("Token is valid")
      } else {
        console.error("Token is not valid")
      }
    } catch (error) {
      console.error("Error during token check:", error)
    }
  }
  return this
}
