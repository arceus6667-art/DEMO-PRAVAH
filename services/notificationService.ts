import { NotificationItem, NotificationEventType } from '../types/platform';

export class NotificationService {
  /**
   * Dispatches an event onto the notification stream while preventing duplicate triggers.
   */
  public static dispatchEvent(
    existingNotifications: NotificationItem[],
    event: {
      eventType: NotificationEventType;
      title: string;
      message: string;
      severity: NotificationItem['severity'];
      entityType: NotificationItem['entityType'];
      entityId: string;
      actionURL?: string;
    }
  ): NotificationItem[] {
    // Check for exact duplicate within existing list
    const isDuplicate = existingNotifications.some(
      (n) => n.eventType === event.eventType && n.entityId === event.entityId
    );

    if (isDuplicate) {
      return existingNotifications;
    }

    const newItem: NotificationItem = {
      id: `NOTIF-${Date.now().toString(36)}`,
      eventType: event.eventType,
      title: event.title,
      message: event.message,
      severity: event.severity,
      entityType: event.entityType,
      entityId: event.entityId,
      createdAt: 'Just now',
      read: false,
      actionURL: event.actionURL
    };

    return [newItem, ...existingNotifications];
  }
}
