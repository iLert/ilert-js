// declare type Buffer = any;

declare module "ilert" {

    export interface ILertConfig {
        baseURL:? string;
        tenant?: string;
        username?: string;
        password?: string;
        apiKey?: string;
        timeoutMs?: number;
    }

    export interface ILertResponse {
        status: number;
        headers: any;
        data: any;
    }

    export enum ILertEventType {
        ALERT,
        ACCEPT,
        RESOLVE
    }

    export enum ILertPriorityType {
        HIGH,
        LOW
    }

    export enum ILertRegionType {
        EU,
        US
    }

    export enum ILertCheckType {
        http,
        tcp,
        udp,
        ping
    }

    export enum ILertIncidentStates {
        PENDING,
        ACCEPTED,
        RESOLVED
    }

    export interface ILertImage {
        src:? string;
        href:? string;
        alt:? string;
    }

    export interface ILertLink {
        href:? string;
        text:? string;
    }

    export interface ILertEventCreateOptions {
        details:? string;
        incidentKey?: string;
        priority:? ILertPriorityType;
        images:? ILertImage[];
        links:? ILertLink[];
        customDetails:? any;
    }

    export class Event {
        constructor(ilert: ILert);
        create(apiKey: string, eventType: ILertEventType, summary: string,
            optional:? ILertEventCreateOptions): Promise<ILertResponse>;
    }

    export class User {
        constructor(ilert: ILert);
        current(): Promise<ILertResponse>;
    }

    export interface ILertCheckParams {
        host:? string;
        port:? number;
        url:? string;
    }

    export class UptimeMonitor {
        constructor(ilert: ILert);
        get(): Promise<ILertResponse>;
        create(name: string, region: ILertRegionType, checkType: ILertCheckType,
            escalationPolicyId: number, checkParams: ILertCheckParams, optional: any): Promise<ILertResponse>;
        count(): Promise<ILertResponse>;
    }

    export class UptimeMonitorItem {
        constructor(ilert: ILert, id: string);
        get(): Promise<ILertResponse>;
        update(uptimeMonitor: any): Promise<ILertResponse>;
        delete(): Promise<ILertResponse>;
    }

    export class Incident {
        constructor(ilert: ILert);
        get(state:? ILertIncidentStates, offset:? number, limit:? number): Promise<ILertResponse>;
        count(): Promise<ILertResponse>;
    }

    export class IncidentItem {
        constructor(ilert: ILert, id: number);
        get(): Promise<ILertResponse>;
        notifications(): Promise<ILertResponse>;
        logEntries(): Promise<ILertResponse>;
        assign(userId: number | string): Promise<ILertResponse>;
        accept(): Promise<ILertResponse>;
        resolve(): Promise<ILertResponse>;
    }

    export class ILert {
        constructor(config: ILertConfig);
        call(method: string, body:? string, url: string, query:? any): Promise<ILertResponse>;
        event(): Event;
        user(): User;
        uptimeMonitor(id?: string): UptimeMonitor | UptimeMonitorItem;
        incident(id?: number): Incident | IncidentItem;
    }
}