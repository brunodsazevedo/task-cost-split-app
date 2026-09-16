export interface CreateUpdateActivityRequestParams {
  queryParams?: {
    activityId: string
  }

  data: {
    title: string
    activityDate: string
  }
}
