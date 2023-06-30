export interface Account {
  id:        string;
  type:      string;
  balance:   number;
  createdAt: Date;
  status:    AccountStatus;
}

export interface CurrentAccount extends Account {
  overDraft: number;
}

export interface SavingAccount extends Account {
  interestRate: number;
}

export interface CustomerDetails {
  id:        number;
  name:      string;
  email:     string;
  currentAccounts?: CurrentAccount[];
  savingAccounts?: SavingAccount[];
}

enum AccountStatus {
  Created = 'CREATED',
  Suspended = 'SUSPENDED',
  Activated = 'ACTIVATED'
}
