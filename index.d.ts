// declare type Buffer = any;

declare module "ilert" {

    export interface ILertConfig {
        baseURL:? String;
        tenant?: String;
        username?: String;
        password?: String;
        apiKey?: String;
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

    export interface ILertImage {
        src:? String;
        href:? String;
        alt:? String;
    }

    export interface ILertLink {
        href:? String;
        text:? String;
    }

    export interface ILertEventCreateOptions {
        details:? String;
        incidentKey?: String;
        priority:? ILertPriorityType;
        images:? ILertImage[];
        links:? ILertLink[];
        customDetails:? any;
    }

    export class Event {
        constructor(ilert: ILert);
        create(apiKey: String, eventType: ILertEventType, summary: String, optional:? ILertEventCreateOptions): Promise<ILertResponse>;
    }

    export class User {
        constructor(ilert: ILert);
        current(): Promise<ILertResponse>;
    }

    export interface ILertCheckParams {
        host:? String;
        port:? number;
        url:? String;
    }

    export class UptimeMonitor {
        constructor(ilert: ILert);
        get(id?: String): Promise<ILertResponse>;
        create(name: String, region: ILertRegionType, checkType: ILertCheckType, escalationPolicyId: number, checkParams: ILertCheckParams, optional: any): Promise<ILertResponse>;
        update(id: String, uptimeMonitor: any): Promise<ILertResponse>;
        delete(id: String): Promise<ILertResponse>;
        count(): Promise<ILertResponse>;
    }

    export class ILert {
        constructor(config: ILertConfig);
        call(method: String, body:? String, url: String): Promise<ILertResponse>;
        event(): Event;
        user(): User;
        uptimeMonitor(): UptimeMonitor;
    }
}