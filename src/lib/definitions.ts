import {
  StockMovement as sm,
  Supplier as s,
  Category as c,
  Product as p,
  Unit as u,
} from "@prisma/client";

//#####################################################

//                 Sections order
//                 1. Base model
//                 2. Main models
//                 3. Server action model
//                 4. Rest of app models

//#####################################################

// Base model

interface BaseModel {
  id: number;
}

//Main models

export interface Category extends c {
  total_products?: number;
  products: Product[];
}

export interface Product extends p {
  category?: Category;
  unit?: Unit;
  suppliers?: Supplier[];
  stock_movements?: StockMovement[];
}

export interface Unit extends u {
  total_products?: number;
  products?: Product[];
}

export interface Supplier extends s {
  products?: Product[];
}

export interface StockMovement extends sm {}

// Server actions

export type ServerActionResponse = {
  message?: string;
  data?: any;
  status?: string;
  errors?: {
    [key: string]: string[] | undefined;
  };
};

// Rest of models

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

export interface CategoryForCreationEdition {
  id?: number;
  description: string;
}

export interface UnitForCreationEdition {
  id?: number;
  description: string;
}

export interface ProductForCreationEdition {
  id?: number;
  name: string;
  category_id: number;
  unit_id: number;
  suppliers?: { id?: number; name?: string }[];
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

export interface SupplierForCreationEdition extends BaseModel {
  name: string;
  email: string;
  tel: string;
  address: string;
}

export interface StockDataFormatted {
  product_id: number;
  product_name: string;
  actual_stock: string;
  last_movement: Date | null;
  hasPendingWithdraws?: boolean;
}

export interface ProductForAction {
  id: number;
  name: string;
}
