export type Site = {
  id: string;
  code: string;
  site_name: string | null;
  url: string | null;
  client_id: string | null;
  status: "pending" | "processing" | "success" | "failed";
  created_at: Date;
  updated_at: Date | null;
}

export type Tran = {
  id: string;
  amount: number;
  payment_method: string | null;
  site_id: string | null;
  status: "pending" | "processing" | "success" | "failed";
  created_at: Date;
  updated_at: Date | null;
}

export type Invoice = {
  id: string;
  access_log: string;
  total: number;
  site_id: string;
  tax: number;
  storage_fee: number;
  status: "pending" | "processing" | "success" | "failed";
  created_at: Date;
  updated_at: Date | null;
}

export type User = {
  id: string;
  // user_id: string;
  username: string;
  client_id: string;
  email: string;
  // password: string;
  role: string;
  cognito_id: string;
  status: 'pending' | 'processing' | 'success' | 'failed';
  created_at: Date;
  updated_at: Date | null;
}



export type Status =  "pending" | "processing" | "success" | "failed";

export const statusValues: Status[] = ["pending" , "processing" , "success" , "failed"];