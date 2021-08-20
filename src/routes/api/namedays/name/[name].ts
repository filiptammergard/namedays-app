import type { Nameday } from "$lib/namedays"
import { namedays } from "$lib/namedays"

interface Params {
  params: {
    name: string
  }
}

interface Data {
  status: number
  body: Nameday[]
}

export async function get({ params }: Params): Promise<Data> {
  const name = params.name
  const result = namedays.filter(
    (nameday) => nameday.name.toLowerCase() === name.toLowerCase(),
  )
  return {
    status: 200,
    body: result,
  }
}
