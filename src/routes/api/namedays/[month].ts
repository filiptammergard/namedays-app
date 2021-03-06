import { Nameday, on } from "namedays"

interface Params {
  params: {
    month: string
  }
}

interface Data {
  status: number
  body: Nameday[]
}

export async function get({ params }: Params): Promise<Data> {
  const month = parseInt(params.month, 10)
  const body = on({ month })
  return {
    status: 200,
    body,
  }
}
