import { Nameday, on } from "namedays"

interface Params {
  params: {
    month: string
    day: string
  }
}

interface Data {
  status: number
  body: Nameday[]
}

export async function get({ params }: Params): Promise<Data> {
  const month = parseInt(params.month, 10)
  const day = parseInt(params.day, 10)
  const body = on({ month, day })
  return {
    status: 200,
    body,
  }
}
