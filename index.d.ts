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

    export class ILert {
        constructor(config: ILertConfig);
        call(method: String, body:? String, url: String): Promise<ILertResponse>;
        createEvent(apiKey: String, eventType: ILertEventType, summary: String, optional:? ILertEventCreateOptions): Promise<ILertResponse>;
        currentUser(): Promise<ILertResponse>;
    }
}