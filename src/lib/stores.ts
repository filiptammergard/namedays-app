import { API_URL } from "$lib/env"
import { writable } from "svelte/store"
import type { Nameday } from "./namedays"

export const savedNamedays = writable<Nameday[]>([])

export const namedays = writable<Nameday[]>([])

const fetchNamedays = async () => {
  const url = `${API_URL}/namedays`
  const response = await fetch(url)
  const data: Nameday[] = await response.json()
  namedays.set(data)
}
fetchNamedays()

export const namedaysToday = writable<string[]>([])

const fetchNamedaysToday = async () => {
  const today = {
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  }
  const url = `${API_URL}/namedays/date/${today.month}/${today.day}`
  const response = await fetch(url)
  const data: Nameday[] = await response.json()
  const names = data.map((nameday) => nameday.name)
  namedaysToday.set(names)
}
fetchNamedaysToday()
