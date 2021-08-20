import type { Nameday } from "$lib/namedays"
import { namedays } from "$lib/namedays"

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
  const result = namedays.filter((nameday) => nameday.date.month === month)
  return {
    status: 200,
    body: result,
  }
}
