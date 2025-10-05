import { ICartItem } from '../redux/slices/cart/types';

export const calcTotalPrice = (items: ICartItem[]) => {
    return items.reduce((acc, curr) => acc + curr.price * curr.count, 0);
};