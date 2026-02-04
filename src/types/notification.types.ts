export interface NotificationItem {
  id: string;
  mentor_id: string;
  title: string;
  body: string;
  updated_at: string;
  type?: string;
  is_read: boolean;
}
