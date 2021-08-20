import type { Nameday } from "$lib/namedays"
import { namedays } from "$lib/namedays"

export async function get(): Promise<{ status: number; body: Nameday[] }> {
  return {
    status: 200,
    body: namedays,
  }
}
