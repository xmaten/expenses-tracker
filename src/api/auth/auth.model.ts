export type RegisterFormaData = {
  username: string
  email: string
  password: string
}

export type LoginFormData = {
  email: string
  password: string
}

export type LoginResponse = {
  data: {
    response: {
      email: string
      id: number
      token: string
      username: string
    }
    status: number
  }
}
