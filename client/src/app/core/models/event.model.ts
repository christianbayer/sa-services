export interface Event {
  id: number;
  name: string;
  description: string;
  starts_at: string;
  ends_at: string;
  category: {
    id: number;
    name: string;
  };
}
