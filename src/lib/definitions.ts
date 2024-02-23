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
