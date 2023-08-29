export type errorProps = {
  response?: {
    data?: {
      message?: string
    }
  }
  message?: string
}

const getError = (error: errorProps) =>
  error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message

export { getError }
