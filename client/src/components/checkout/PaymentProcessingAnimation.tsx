import { Box } from '@chakra-ui/react';
import { CARD_SWIPE_DURATION_MS, animationName } from '@client/theme';

const CARD_WIDTH = 108;
const CARD_HEIGHT = 148;
const SLOT_WIDTH = 162;
const SLOT_HEIGHT = 32;
const GROOVE_WIDTH = 124;
const GROOVE_HEIGHT = 12;
const GROOVE_TOP = (SLOT_HEIGHT - GROOVE_HEIGHT) / 2;
const GROOVE_MID = GROOVE_TOP + GROOVE_HEIGHT / 2;
const SIGNAL_ANIMATION_DURATION = '1.5s';
const SIGNAL_ARC_STROKE_WIDTH = 3.2;
const SIGNAL_ICON_SIZE = 26.4;
const SIGNAL_ICON_VIEWBOX = 24;
const SIGNAL_ICON_SCALE = SIGNAL_ICON_SIZE / SIGNAL_ICON_VIEWBOX;
const SIGNAL_DOT_CY = 19;
const SIGNAL_DOT_RADIUS = 1.8;
const SIGNAL_BOX_BOTTOM_OFFSET = 16;
const SIGNAL_BOX_LEFT_OFFSET = 16;
const SIGNAL_ICON_CENTER_X =
	SIGNAL_BOX_LEFT_OFFSET + SIGNAL_ICON_SIZE / 2;
const SIGNAL_BOX_TOP_WITHIN_CARD =
	CARD_HEIGHT - SIGNAL_BOX_BOTTOM_OFFSET - SIGNAL_ICON_SIZE;
const STRIPE_BOTTOM_WITHIN_CARD =
	SIGNAL_BOX_TOP_WITHIN_CARD +
	(SIGNAL_DOT_CY + SIGNAL_DOT_RADIUS) * SIGNAL_ICON_SCALE;
const STRIPE_WIDE_TOP = 24;
const STRIPE_WIDE_WIDTH = 9.9;
const STRIPE_NARROW_TOP = 24;
const STRIPE_NARROW_WIDTH = 7.7;
const STRIPE_LOWER_TOP = 66;
const CARD_GRADIENT_ACTIVE =
	'linear-gradient(135deg, #6b6b6b 0%, #454545 33%, #202020 66%, #0a0a0a 100%)';
const CARD_GRADIENT_TIMED_OUT =
	'linear-gradient(135deg, #b55454 0%, #7a2626 33%, #3d0f0f 66%, #1a0505 100%)';
const TIMEOUT_X_CENTER_X = 12;
const TIMEOUT_X_CENTER_Y = 12;
const TIMEOUT_X_ARM_OFFSET = 5.3;
const TIMEOUT_X_ROUND_CAP_EXTENSION =
	(SIGNAL_ARC_STROKE_WIDTH / 2) * Math.sin(Math.PI / 4);
const TIMEOUT_ICON_SIZE = 34;
const TIMEOUT_ICON_SCALE = TIMEOUT_ICON_SIZE / SIGNAL_ICON_VIEWBOX;
const TIMEOUT_X_BOTTOM_WITHIN_ICON =
	(TIMEOUT_X_CENTER_Y +
		TIMEOUT_X_ARM_OFFSET +
		TIMEOUT_X_ROUND_CAP_EXTENSION) *
	TIMEOUT_ICON_SCALE;
const TIMEOUT_BOX_BOTTOM_OFFSET =
	CARD_HEIGHT -
	TIMEOUT_ICON_SIZE +
	TIMEOUT_X_BOTTOM_WITHIN_ICON -
	STRIPE_BOTTOM_WITHIN_CARD;
const TIMEOUT_BOX_LEFT_OFFSET =
	SIGNAL_ICON_CENTER_X - TIMEOUT_ICON_SIZE / 2;

type Props = {
	timedOut?: boolean;
};

export const PaymentProcessingAnimation = ({
	timedOut = false,
}: Props) => (
	<Box
		position="relative"
		width={`${SLOT_WIDTH}px`}
		height="160px"
		overflow="hidden"
	>
		<Box
			position="absolute"
			left="50%"
			top="0px"
			width={`${SLOT_WIDTH}px`}
			height={`${SLOT_HEIGHT}px`}
			marginLeft={`-${SLOT_WIDTH / 2}px`}
			borderRadius={`${SLOT_HEIGHT / 2}px`}
			background="gray.200"
			zIndex={0}
		/>
		<Box
			position="absolute"
			left="50%"
			top={`${GROOVE_MID}px`}
			width={`${GROOVE_WIDTH}px`}
			height={`${GROOVE_HEIGHT / 2}px`}
			marginLeft={`-${GROOVE_WIDTH / 2}px`}
			borderRadius={`0 0 ${GROOVE_HEIGHT / 2}px ${GROOVE_HEIGHT / 2}px`}
			background="gray.400"
			zIndex={0}
		/>

		<Box
			position="absolute"
			left="50%"
			top="0px"
			width={`${CARD_WIDTH}px`}
			height={`${CARD_HEIGHT}px`}
			marginLeft={`-${CARD_WIDTH / 2}px`}
			borderRadius="10px"
			background={
				timedOut
					? CARD_GRADIENT_TIMED_OUT
					: CARD_GRADIENT_ACTIVE
			}
			boxShadow="md"
			zIndex={1}
			animation={
				timedOut
					? undefined
					: `${animationName.cardSwipe} ${CARD_SWIPE_DURATION_MS}ms ease-in-out infinite`
			}
		>
			<Box
				position="absolute"
				top="30px"
				left="16px"
				width="24px"
				height="18px"
				borderRadius="3px"
				background="white"
			/>
			<Box
				position="absolute"
				top={`${STRIPE_WIDE_TOP}px`}
				right="36px"
				width={`${STRIPE_WIDE_WIDTH}px`}
				height={`${STRIPE_BOTTOM_WITHIN_CARD - STRIPE_WIDE_TOP}px`}
				borderRadius="4px"
				background="white"
			/>
			<Box
				position="absolute"
				top={`${STRIPE_NARROW_TOP}px`}
				right="19px"
				width={`${STRIPE_NARROW_WIDTH}px`}
				height="34px"
				borderRadius="3px"
				background="rgba(255, 255, 255, 0.85)"
			/>
			<Box
				position="absolute"
				top={`${STRIPE_LOWER_TOP}px`}
				right="19px"
				width={`${STRIPE_NARROW_WIDTH}px`}
				height={`${STRIPE_BOTTOM_WITHIN_CARD - STRIPE_LOWER_TOP}px`}
				borderRadius="3px"
				background="rgba(255, 255, 255, 0.85)"
			/>
			<Box
				position="absolute"
				bottom={`${timedOut ? TIMEOUT_BOX_BOTTOM_OFFSET : SIGNAL_BOX_BOTTOM_OFFSET}px`}
				left={`${timedOut ? TIMEOUT_BOX_LEFT_OFFSET : SIGNAL_BOX_LEFT_OFFSET}px`}
				width={`${timedOut ? TIMEOUT_ICON_SIZE : SIGNAL_ICON_SIZE}px`}
				height={`${timedOut ? TIMEOUT_ICON_SIZE : SIGNAL_ICON_SIZE}px`}
			>
				<svg
					viewBox={`0 0 ${SIGNAL_ICON_VIEWBOX} ${SIGNAL_ICON_VIEWBOX}`}
					width={
						timedOut
							? TIMEOUT_ICON_SIZE
							: SIGNAL_ICON_SIZE
					}
					height={
						timedOut
							? TIMEOUT_ICON_SIZE
							: SIGNAL_ICON_SIZE
					}
				>
					{timedOut ? (
						<>
							<line
								x1={
									TIMEOUT_X_CENTER_X -
									TIMEOUT_X_ARM_OFFSET
								}
								y1={
									TIMEOUT_X_CENTER_Y -
									TIMEOUT_X_ARM_OFFSET
								}
								x2={
									TIMEOUT_X_CENTER_X +
									TIMEOUT_X_ARM_OFFSET
								}
								y2={
									TIMEOUT_X_CENTER_Y +
									TIMEOUT_X_ARM_OFFSET
								}
								stroke="white"
								strokeWidth={SIGNAL_ARC_STROKE_WIDTH}
								strokeLinecap="round"
							/>
							<line
								x1={
									TIMEOUT_X_CENTER_X +
									TIMEOUT_X_ARM_OFFSET
								}
								y1={
									TIMEOUT_X_CENTER_Y -
									TIMEOUT_X_ARM_OFFSET
								}
								x2={
									TIMEOUT_X_CENTER_X -
									TIMEOUT_X_ARM_OFFSET
								}
								y2={
									TIMEOUT_X_CENTER_Y +
									TIMEOUT_X_ARM_OFFSET
								}
								stroke="white"
								strokeWidth={SIGNAL_ARC_STROKE_WIDTH}
								strokeLinecap="round"
							/>
						</>
					) : (
						<>
							<circle
								cx="12"
								cy={SIGNAL_DOT_CY}
								r={SIGNAL_DOT_RADIUS}
								fill="white"
								style={{
									animation: `${animationName.signalArcOne} ${SIGNAL_ANIMATION_DURATION} steps(1, jump-end) infinite`,
								}}
							/>
							<path
								d="M8 15 a6 6 0 0 1 8 0"
								stroke="white"
								strokeWidth={SIGNAL_ARC_STROKE_WIDTH}
								fill="none"
								strokeLinecap="round"
								style={{
									animation: `${animationName.signalArcTwo} ${SIGNAL_ANIMATION_DURATION} steps(1, jump-end) infinite`,
								}}
							/>
							<path
								d="M4.5 10.5 a11 11 0 0 1 15 0"
								stroke="white"
								strokeWidth={SIGNAL_ARC_STROKE_WIDTH}
								fill="none"
								strokeLinecap="round"
								style={{
									animation: `${animationName.signalArcThree} ${SIGNAL_ANIMATION_DURATION} steps(1, jump-end) infinite`,
								}}
							/>
						</>
					)}
				</svg>
			</Box>
		</Box>

		<Box
			position="absolute"
			left="50%"
			top="0px"
			width={`${SLOT_WIDTH}px`}
			height={`${GROOVE_MID}px`}
			marginLeft={`-${SLOT_WIDTH / 2}px`}
			borderRadius={`${SLOT_HEIGHT / 2}px ${SLOT_HEIGHT / 2}px 0 0`}
			background="gray.200"
			zIndex={2}
		/>
		<Box
			position="absolute"
			left="50%"
			top={`${GROOVE_TOP}px`}
			width={`${GROOVE_WIDTH}px`}
			height={`${GROOVE_HEIGHT / 2}px`}
			marginLeft={`-${GROOVE_WIDTH / 2}px`}
			borderRadius={`${GROOVE_HEIGHT / 2}px ${GROOVE_HEIGHT / 2}px 0 0`}
			background="gray.400"
			zIndex={2}
		/>
	</Box>
);
