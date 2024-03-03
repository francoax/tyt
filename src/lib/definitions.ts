import {
  StockMovement as sm,
  Supplier as s,
  Category as c,
  Product as p,
  Unit as u,
} from "@prisma/client";

//#####################################################

//                     Sections order
//                     1. Base model
//                     2. Main models
//                     3. Server action model
//                     4. Rest of app models

//#####################################################

// Base model

interface BaseModel {
  id: number;
}

//Main models

export interface Category extends c {
  total_products?: number;
}

export interface Product extends p {}

export interface Unit extends u {
  total_products?: number;
}

export interface Supplier extends s {}

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
