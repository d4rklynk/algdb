import type { Request } from "express";
import type { JomqlQuery } from "jomql";

export type PusherEnv = {
  readonly app_id: string;
  readonly key: string;
  readonly secret: string;
  readonly cluster: string;
};

export type MysqlEnv = {
  readonly database: string;
  readonly user: string;
  readonly password: string;
  readonly socketpath?: string;
  readonly host?: string;
  readonly port?: string;
};

export type SqlWhereObject = {
  connective?: string;
  fields: (SqlWhereObject | SqlWhereFieldObject)[];
};

export type SqlJoinFieldObject = {
  table: string;
  field: string;
  foreignField: string;
};

export type SqlSelectFieldObject = SqlFieldObject & {
  field: string;
};

export type SqlWhereFieldObject = SqlFieldObject & {
  field: string;
  value: any;
  operator?: SqlWhereFieldOperator;
};

export type SqlWhereFieldOperator =
  | "eq"
  | "neq"
  | "in"
  | "nin"
  | "regex"
  | "like"
  | "gt"
  | "lt";

export type SqlSortFieldObject = SqlFieldObject & {
  field: string;
  desc?: boolean;
};

export type SqlGroupFieldObject = SqlFieldObject & {
  field: string;
};

export type SqlFieldObject = {
  joinFields?: SqlJoinFieldObject[];
};

export type SqlQueryObject = SqlParams & {
  select: SqlQuerySelectObject[];
  from: string;
};

export type SqlQuerySelectObject = {
  field: string;
  as?: string;
  getter?: Function;
};

export type SqlParams = {
  rawSelect?: SqlQuerySelectObject[];
  where?: SqlWhereObject;
  limit?: number;
  groupBy?: SqlGroupFieldObject[];
  orderBy?: SqlSortFieldObject[];
};

export type SqlSelectQueryOutput = null | {
  [x: string]: any;
};

export type ObjectTypeDefsqlOptions = {
  joinInfo?: {
    type: string;
    foreignKey?: string;
  };
  getter?: (value: string) => string;
  setter?: (value: string) => string;
  parseValue?: (value: unknown) => unknown; // performed before inserts/updates
  joinHidden?: boolean;
  sqlDefinition: any;
};

export type ExternalQuery = {
  [x: string]: any;
};

export type ServiceFunctionInputs = {
  req: Request;
  fieldPath: string[];
  args: any;
  query?: JomqlQuery;
  data?: any;
  isAdmin?: boolean;
};

export type ContextUser = {
  id: number;
  role: string | null;
  permissions: string[];
};

export type AccessControlMap = {
  [x: string]: AccessControlFunction;
};

export type AccessControlFunction = (
  inputs: ServiceFunctionInputs
) => boolean | Promise<boolean>;

export type DataloaderFunctionInput = {
  req: Request;
  fieldPath: string[];
  args: any;
  query: JomqlQuery;
  currentObject: any;
  data: any;
};

export type DataloaderFunction = (input: DataloaderFunctionInput) => any;
