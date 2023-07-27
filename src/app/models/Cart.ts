export class Cart {
  items?: CartItem[];
}

export class CartItem {
  productId?: string;
  quantity?: number;
}

export class CartItemsDetails {
  product?: any;
  quantity?: number;
}
