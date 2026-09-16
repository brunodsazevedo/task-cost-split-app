import { Platform } from 'react-native'
import axios, { AxiosInstance } from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

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

    this.setupInterceptors()
  }

  getInstance() {
    return this.instance
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      async (config) => {
        const userData = await AsyncStorage.getItem('taskCostSplit-user')

        if (userData) {
          const {
            state: { token },
          } = JSON.parse(userData)

          if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
          }
        }

        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )
  }
}

export const taskCostSplitApiClient = new TaskCostSplitApiClient().getInstance()
