import { Injectable } from '@angular/core';

export interface BadgeItem {
    type: string;
    value: string;
}
export interface Saperator {
    name: string;
    type?: string;
}
export interface SubChildren {
    state: string;
    name: string;
    type?: string;
}
export interface ChildrenItems {
    state: string;
    name: string;
    type?: string;
    child?: SubChildren[];
    subchildren?: any;
}

export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string;
    badge?: BadgeItem[];
    saperator?: Saperator[];
    children?: ChildrenItems[];
}

const MENUITEMSFORADMIN = [
    {
        state: '',
        name: 'สมาชิก',
        type: 'saperator',
        icon: 'av_timer'
    },
    {
        state: 'user',
        name: 'รายชื่อสมาชิก',
        type: 'link',
        icon: 'perm_contact_calendar'
    }
];

@Injectable()
export class MenuItems {
    getMenuitemForAdmin(): Menu[] {
        return MENUITEMSFORADMIN;
    }
}
