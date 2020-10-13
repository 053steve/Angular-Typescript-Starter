export const TICKETSTATUS = {
    PENDING_CONFIRM: 'PENDING',
    COMPLETE: 'COMPLETE',
    CONFIRM: 'CONFIRM',
    REJECT: 'REJECT',
    CANCEL: 'CANCEL'
};

export enum USER_TYPE {
    ADMIN = 'ADMIN',
    STAFF = 'STAFF'
}

export enum TICKET_TYPE {
    REQUEST= 'REQUEST',
    ISSUE = 'ISSUE'
}

export type TICKETTYPE = 'REQUEST' | 'ISSUE';

export const TICKETTYPE = {
    REQUEST: 'REQUEST' as TICKETTYPE,
    ISSUE: 'ISSUE' as TICKETTYPE
};