import { createContext, useContext, useState } from 'react';

export enum CheckoutType {
	ApplePay,
	StandardCheckout,
}

type CheckoutStatusContext = {
	pendingSubmission: CheckoutType | null;
	pendingConfirmation: boolean;
	timedOut: boolean;
	pendingCheckout: boolean;
	startSubmitting: (type: CheckoutType) => void;
	startConfirming: () => void;
	settle: () => void;
	triggerTimeout: () => void;
	dismissTimeout: () => void;
};

export const CheckoutStatusContext = createContext<
	CheckoutStatusContext | undefined
>(undefined);

export const CheckoutStatusProvider = (props: {
	children: React.ReactNode;
}) => {
	const [pendingSubmission, setPendingSubmission] =
		useState<CheckoutType | null>(null);
	const [pendingConfirmation, setPendingConfirmation] =
		useState(false);
	const [timedOut, setTimedOut] = useState(false);

	return (
		<CheckoutStatusContext.Provider
			value={{
				pendingSubmission,
				pendingConfirmation,
				timedOut,
				pendingCheckout:
					pendingSubmission !== null || pendingConfirmation,
				startSubmitting: (type) => {
					setPendingSubmission(type);
					setPendingConfirmation(false);
					setTimedOut(false);
				},
				startConfirming: () => {
					setPendingSubmission(null);
					setPendingConfirmation(true);
				},
				settle: () => {
					setPendingSubmission(null);
					setPendingConfirmation(false);
				},
				triggerTimeout: () => {
					setPendingConfirmation(false);
					setTimedOut(true);
				},
				dismissTimeout: () => setTimedOut(false),
			}}
		>
			{props.children}
		</CheckoutStatusContext.Provider>
	);
};

export const useCheckoutStatus = () => {
	const context = useContext(CheckoutStatusContext);
	if (!context) {
		throw new Error(
			'useCheckoutStatus must be used within CheckoutStatusProvider',
		);
	}
	return context;
};
