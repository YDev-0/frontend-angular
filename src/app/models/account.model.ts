export interface AccountDetails {
  type:              string;
  balance:           number;
  status:            AccountStatus;
  currentPage:       number;
  totalPages:        number;
  pageSize:          number;
  accountOperations: AccountOperation[];
}

export interface AccountOperation {
  id:            number;
  operationDate: Date;
  amount:        number;
  type:          Type;
  description:   string;
}

export enum Type {
  Credit = "CREDIT",
  Debit = "DEBIT",
}

export enum AccountStatus {
  Created = "CREATED",
  Suspended = "SUSPENDED",
  Activated = "ACTIVATED"
}
