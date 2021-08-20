import { writable } from "svelte/store"
import type { Nameday } from "./namedays"

export const savedNamedays = writable<Nameday[]>([])
