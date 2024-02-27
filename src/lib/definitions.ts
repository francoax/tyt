interface BaseModel {
  id: number;
}

export interface StockHistoryMovement {
  productName: string;
  categoryName: string;
  unitName: string;
  stock: number;
  lastMovement: Date;
}

export interface StockHistoryDetail {
  amountInvolved: number;
  dollarAtDate?: number;
  dateAction: Date;
  typeAction: string;
}

export interface StockWithdraw {
  amountInvolved: number;
}

export interface StockDeposit {
  amountInvolved: number;
  dollarAtDate: number;
  productId: string;
}

export interface Category extends BaseModel {
  description: string;
  total_products: number;
}

export interface CategoryForCreation {
  description: string;
}

export type StateForm = {
  status?: boolean;
  errors?: {
    [key: string]: string[] | undefined;
  };
  message?: string | null;
};
