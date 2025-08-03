export interface SearchRequest {
  terms: string[];
  linkedInUrl: string;
}

export interface SearchResponse {
  normal_url: string;
  ttl?: number;
  opportunities: Opportunity[];
}

export interface SearchV2Response {
  data: {
    exact: AffinityMatch[];
    fuzzy: AffinityMatch[];
  };
}

export interface Opportunity {
  opportunityId: number;
  name: string;
  stage?: string;
  priority?: string;
  mainSector?: string;
  comment1?: string;
  comment2?: string;
  lastTouch?: string;
  owners?: string;
}

export interface AffinityMatch {
  id: number;
  name: string;
  stage?: string;
  priority?: string;
  mainSector?: string;
  comment1?: string;
  comment2?: string;
  lastTouch?: string;
  owners?: string;
}

export interface AddOpportunityRequest {
  url: string;
  opportunityId: number;
  name: string;
}

export interface GoogleSheetsRequest {
  data: string[];
}

export interface UserDetails {
  sheetId: string;
  apikey: string;
}

export interface SaveOpportunityRequest {
  data: {
    url: string;
    [key: string]: any;
  };
}

export interface ChatRequest {
  [key: string]: any;
  "First Name": string;
  "Last Name": string;
  "Company Name": string;
  "Current experience summary": string;
  "Company Industry": string;
  "Title": string;
  "Company Location": string;
  "Started On": string;
  "Tenure At Position": string;
  "Geo Region": string;
  "Summary": string;
  "yourname": string;
}

export interface ChatResponse {
  response: string;
}

export interface AnalyticsRequest {
  startDate: string;
  endDate: string;
  groupBy?: string;
}

export interface UserActivityStats {
  userName: string;
  recordsAddedToSheet: number;
  checkInAffinity: number;
  save: number;
  totalActions: number;
  activeDays: number;
}

export interface DashboardResponse {
  dateRange: {
    from: string;
    to: string;
  };
  totalUsers: number;
  userActivity: UserActivityStats[];
  summary: {
    totalRecordsAddedToSheet: number;
    totalChecksInAffinity: number;
    totalSavesInAffinity: number;
    totalGenAIMessages: number;
  };
}

export interface CacheItem {
  normal_url: string;
  opportunities: Opportunity[];
  ttl?: number;
  cacheType?: 'exact' | 'fuzzy';
  newCache?: boolean;
}

export interface UserConfig {
  sheetId: string;
  apikey: string;
}

export interface EmailToSpreadsheetMap {
  [email: string]: UserConfig;
}

export interface ActivityData {
  userEmail: string;
  actionType: string;
  timestamp: string;
  metadata?: any;
}

export interface ErrorResponse {
  error: string;
  details?: string;
} 

export interface JobConfig {
  JobTitle: string[];
}