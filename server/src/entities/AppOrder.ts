import { OrderStatus } from '@heirloom/common/enums/OrderStatus';
import { AppOrder as GeneratedAppOrder } from './generated/AppOrder.js';

export class AppOrder extends GeneratedAppOrder {
	declare orderStatus: OrderStatus;
}
