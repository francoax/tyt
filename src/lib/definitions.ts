import { StockMovement, Supplier, Product as p } from "@prisma/client";

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
  total_products?: number;
}

export interface CategoryForCreationEdition {
  id?: number;
  description: string;
}

export type ServerActionResponse = {
  message?: string;
  data?: any;
  status?: string;
  errors?: {
    [key: string]: string[] | undefined;
  };
};

export interface Unit extends BaseModel {
  description: string;
  total_products?: number;
}

export interface UnitForCreationEdition {
  id?: number;
  description: string;
}

export interface Product extends BaseModel, p {
  // name: string;
  // stock: number;
  // category_id: number;
  // unit_id: number;
  category: Category;
  unit: Unit;
  stock_movements: StockMovement[];
  suppliers: Supplier[];
}

export interface ProductForCreationEdition {
  id?: number;
  name: string;
  category_id: number;
  unit_id: number;
  suppliers?: number[];
}

export interface ProductTableFormatted extends BaseModel {
  name: string;
  category: string;
  unit: string;
  suppliers?: string[];
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface ProductDataForCreationEdition {
  categories: SelectOption[];
  units: SelectOption[];
  suppliers: SelectOption[];
}
