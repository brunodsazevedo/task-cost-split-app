import { Platform } from 'react-native'
import axios, { AxiosInstance } from 'axios'

function getBaseUrl() {
  return Platform.select({
    ios: 'http://localhost:8080/api/v1',
    android: 'http://192.168.1.80:8080/api/v1',
  })
}

export const baseURL = getBaseUrl()

export class TaskCostSplitApiClient {
  private instance: AxiosInstance
  private isRefreshing: boolean = false

  constructor() {
    this.instance = axios.create({
      baseURL,
    })
  }

  getInstance() {
    return this.instance
  }
}

export const taskCostSplitApiClient = new TaskCostSplitApiClient().getInstance()
