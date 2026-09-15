export class AppError<TData = unknown> {
  message: string
  data?: TData

  constructor(message: string, data?: TData) {
    this.message = message

    if (data) {
      this.data = data
    }
  }
}
