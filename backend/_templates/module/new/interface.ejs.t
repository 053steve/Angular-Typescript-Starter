---
to: lib/modules/<%=name%>/<%=name%>.interface.ts
---



import {FormatResponse} from "../../common/interfaces";
import {Base} from "../../common/interfaces/base";

export interface I<%= h.capitalize(name) %> extends Base {
  title: string;
}

export type ISafe<%= h.capitalize(name) %> = Pick<I<%= h.capitalize(name) %>, "title" | "createdAt" | "updatedAt">;

export type <%= h.capitalize(name) %>Req = Pick<I<%= h.capitalize(name) %>,"title">;

export interface <%= h.capitalize(name) %>Payload {
  <%=name%>?: ISafe<%= h.capitalize(name) %>;
  <%=name%>s?: ISafe<%= h.capitalize(name) %>[];
  listLength?: number;
}

export interface <%= h.capitalize(name) %>Response extends FormatResponse {
  payload? : <%= h.capitalize(name) %>Payload
}