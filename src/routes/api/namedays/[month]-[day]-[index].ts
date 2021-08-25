import { Nameday, who } from "namedays"

interface Params {
  params: {
    month: string
    day: string
    index: string
  }
}

interface Data {
  status: number
  body: Nameday
}

export async function get({ params }: Params): Promise<Data> {
  const month = parseInt(params.month, 10)
  const day = parseInt(params.day, 10)
  const index = parseInt(params.index, 10)
  const id = `${month}-${day}-${index}`
  const body = who(id)
  return {
    status: 200,
    body,
  }
}
