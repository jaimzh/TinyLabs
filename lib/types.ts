export type Status = "draft" | "active" | "completed" | "abandoned";

export interface Log {
  id: number;
  date: string;
  done: boolean;
  note: string;
}

export interface Experiment {
  id: string;
  status: Status;
  createdAt: string;

  observation?: string;
  hypothesis?: string;

  action?: string;
  duration?: string;

  logs: Log[];

  results?: string;
  reflection?: string;
  nextStep?: string;
}
