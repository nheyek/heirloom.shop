import { createContext, useContext, useState } from 'react';

type CheckoutStatusContext = {
	pending: boolean;
	timedOut: boolean;
	startPending: () => void;
	settlePending: () => void;
	triggerTimeout: () => void;
	dismissTimeout: () => void;
};

export const CheckoutStatusContext = createContext<
	CheckoutStatusContext | undefined
>(undefined);

export const CheckoutStatusProvider = (props: {
	children: React.ReactNode;
}) => {
	const [pending, setPending] = useState(false);
	const [timedOut, setTimedOut] = useState(false);

	return (
		<CheckoutStatusContext.Provider
			value={{
				pending,
				timedOut,
				startPending: () => {
					setPending(true);
					setTimedOut(false);
				},
				settlePending: () => setPending(false),
				triggerTimeout: () => {
					setPending(false);
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
