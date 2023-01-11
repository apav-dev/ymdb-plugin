export type ActorDetails = {
  biography: string;
  birthday: string;
  id: number;
  name: string;
  place_of_birth: string;
  profile_path: string;
};

type Actor = "API" | "USER" | "YEXT_SYSTEM";
type EventType = "ENTITY_CREATED" | "ENTITY_UPDATED" | "ENTITY_DELETED";

export type WebhookPayload = {
  meta: {
    eventType: EventType;
    actor: Actor;
    uuid: string;
    timestamp: string;
    accountId: string;
    appSpecificAccountId: string;
  };
  entityId: string;
  primaryProfile: {
    meta: {
      id: string;
      uid: string;
    };
    name: string;
  };
  changedFields: {
    fieldNames: string[];
  };
};
