import { OrderStatus } from '@common/enums/OrderStatus';
import { AppOrder as GeneratedAppOrder } from './generated/AppOrder';

export class AppOrder extends GeneratedAppOrder {
	declare orderStatus: OrderStatus;
}
