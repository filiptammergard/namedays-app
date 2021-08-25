import type { Nameday } from "namedays"
import { namedays as allNamedays } from "namedays"
import { writable } from "svelte/store"

export const savedNamedays = writable<Nameday[]>([])

export const namedays = writable<Nameday[]>(allNamedays)
