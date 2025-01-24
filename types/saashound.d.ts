interface SaasHoundConfig {
    /**
     * Api Key
     * your saashound api key,
     * get it from: https://app.saashound.co/settings/api-keys
     */
    token: string;
    /**
     * Project Name
     * example: "Total events hosted" || "Tickets" || "Users" || "Active Users"
     */
    project: string;
    /**
     * Track Page Views
     * if set to true, saashound will track page views
     */
    trackPageViews?: boolean;
}

/**
 * Identify Params for publishing a identify to SaasHound
 * @see https://docs.saashound.co/docs/identifys
**/
interface IdentifyParams {
    /**
     * Project Name
     * example: "my-project"
     */
    project?: string;
    /**
     * User Id
     * A unique identifier for the user
     * example: "123" || "user-123" || "xyz-123"
     */
    userId: string;
    /**
     * Properties
     * Additional properties to be stored with the identified user
     * example: { "city": "San Francisco", "state": "CA" }
     */
    properties?: Record<string, any>;
    /**
     * Type
     * The type of the identified entity
     * example: "user" || "group"
     */
    type: 'user' | 'group';
}

/**
 * Capture Params for publishing an event to SaasHound
 * @see https://docs.saashound.co/docs/capture
 */
interface CaptureParams {
    /**
     * Event name
     * example: "Yay First Live Event!"
     */
    title: string;
    /**
     * Event description or long description
     * example: "Bushido Brown went live with their first event"
     */
    message?: string;
    /**
     * Event icon (emoji)
     * it has to be a single emoji
     * example: "🎈"
     */
    icon?: string;
    /**
     * Icon background color
     * example: ""
     */
    color?: string;
    /**
     * Project name
     * example: "indieprojector"
     */
    project?: string;
    /**
     * Project name
     * example: "indieprojector"
     */
    userId?: string;
    /**
     * Channel name
     * example: "user-activity"
     */
    channel?: string;
    /**
     * Event tags
     * example: { username: "@thaghenghen" }
     */
    tags?: Record<string, string | number | boolean>;
    /**
     * Send push notifications
     */
    notify?: boolean | 'all' | 'email' | 'sms' | 'push';
    /**
     * Event is a milestone event
     * example: true
     **/
    milestone?: boolean;
}

/**
 * Metric Params for publishing a metric to SaasHound
 * @see https://docs.saashound.co/docs/metrics
**/
interface MetricParams {
    /**
     * Metric title
     * example: "Total events hosted" || "Tickets" || "Users" || "Active Users"
     */
    project?: string;
    /**
     * Metric title
     * example: "Total events hosted" || "Tickets" || "Users" || "Active Users"
     */
    title: string;
    /**
     * Metric value
     * example: "11" || "true" || "false" || "1.2"
     * If increment_by is set, value will be ignored.
     * If it is the first time the metric is created and increment_by is set, the initial value of the metric will be 0 and the increment_by value will be used as the first value of the metric.
     */
    value?: string | boolean | number;
    /**
     * Metric icon
     * should be one or two emojis
     * example: "🎟️" || "🎭"
     */
    icon?: string;
    /**
     * Metric symbol
     * Apart from the icon, you can also add a symbol to the metric.
     * the symbol can be any of the following: https://www.compart.com/en/unicode/block/U+20A0
     * these can be used to represent currencies, units of measurement, etc.
     * example: "≳" || "$" || "£" || "€" || "¥" || "₹" || "₽" || "₿" || "฿" || "₵" || "₡" || "₫" || "₮" || "₩" || "₲" || "₴" || "₭" || "₦" || "₱" || "₨" || "₪" || "₸" || "₺"
     */
    symbol?: string;
    /**
     * Increment metric by value
     * can be positive or negative
     * if increment_by is set alongside value, value will be ignored
     * example: 11 || -1
     */
    increment_by?: number;
}

interface PageTrackingPayload {
    path: string;
    title: string;
    userAgent: string;
    viewportWidth?: number;
    viewportHeight?: number;
    referrer?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    sessionId: string;
    userId?: string;
    timestamp: string;
    project: string;
    url: string;
}
declare class SaasHound {
    private token;
    private project;
    private trackPageViews?;
    private userId?;
    private sessionId;
    private heartbeatIntervalId?;
    private heartbeatFrequency;
    private sessionTimeout;
    private lastActivity;
    constructor(config: SaasHoundConfig);
    setUserId(userId: string): void;
    clearUserId(): void;
    private createHeaders;
    private initSession;
    private generateSessionId;
    private getSessionId;
    private setSessionCookie;
    private refreshSession;
    private startHeartbeat;
    private endSession;
    private sendHeartbeat;
    private getUTMParam;
    trackPageView(): void;
    listenToPageViews(): void;
    private saveToLocalStorage;
    sendPageData(payload: PageTrackingPayload): Promise<void>;
    private processOfflineData;
    private getUTMSource;
    private getUTMParameter;
    private getReferrer;
    logEvent(eventData: CaptureParams): Promise<void>;
    sendMetric(metricData: MetricParams): Promise<void>;
    identify(identifyData: IdentifyParams): Promise<void>;
    trackClickEvent(element: HTMLElement): void;
    listenToClickEvents(): void;
    trackFormEvent(formElement: HTMLFormElement): void;
    listenToFormEvents(): void;
    private formatToKebabCase;
    private filterUndefinedTags;
}
declare global {
    interface Window {
        initSaasHound: (config: SaasHoundConfig) => SaasHound | null;
        saasHound: SaasHound | null;
    }
}

export { SaasHound };
