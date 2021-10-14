import { writable } from "svelte/store";
import { supabase } from "./supabase";

export interface Stay {
    id: string | number,
    startDate: string,
    endDate: string,
    user: string,
};


export const stays = writable([] as Stay[]);

export const staysSubscribe = supabase
    .from('stays')
    .on('INSERT', payload => {
        stays.update(stays => {
            return [...stays, payload.new as Stay];
        });
    })
    .on('DELETE', payload => {
        stays.update(stays => {
            return stays.filter(stay => stay.id !== payload.old.id);
        });
    })
    .on('UPDATE', payload => {
        stays.update(stays => {
            const idx = stays.findIndex(stay => stay.id === payload.new.id);
            if(idx !== -1) {
                if(payload.new.endDate !== null) stays = stays.filter(stay => stay.id !== payload.new.id);
                else stays[idx] = payload.new as Stay;
            }
            return stays;
        })
    });