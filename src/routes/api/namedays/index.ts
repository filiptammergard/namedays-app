import { Nameday, namedays } from "namedays"

export async function get(): Promise<{ status: number; body: Nameday[] }> {
  const body = namedays
  return {
    status: 200,
    body,
  }
}
