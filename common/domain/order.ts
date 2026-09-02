import { OrderStatus } from '../constants.js';
import { OrderTimelineEntry } from '../contract.js';

export const deriveOrderStatus = (
	timeline: OrderTimelineEntry[],
): OrderStatus =>
	timeline.length > 0
		? timeline[timeline.length - 1].status
		: OrderStatus.PENDING;
