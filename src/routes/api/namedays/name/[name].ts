import { Nameday, when } from "namedays"

interface Params {
  params: {
    name: string
  }
}

interface Data {
  status: number
  body: Nameday
}

export async function get({ params }: Params): Promise<Data> {
  const name = params.name
  const body = when(name)
  return {
    status: 200,
    body,
  }
}
