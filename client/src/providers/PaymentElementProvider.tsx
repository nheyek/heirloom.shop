import { useBreakpointValue, useToken } from '@chakra-ui/react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ReactNode } from 'react';
import { Layout } from '../constants';

const stripePromise = loadStripe(
	'pk_test_51T45cDQ5g6WbwJsUBcf1MIcU1OLAfvZ3dKWFQf1ly9DOIFU9mFqUvbylLBLkOYoVHpaMinK7Zst2l68Js0Ez0MPt00g6hawzCL',
	{
		developerTools: {
			assistant: {
				enabled: false,
			},
		},
	},
);

type Props = { children: ReactNode };

export const PaymentElementProvider = ({ children }: Props) => {
	const [gray100, gray200, gray400, gray500] = useToken('colors', [
		'gray.100',
		'gray.200',
		'gray.400',
		'gray.500',
	]);

	const layout = useBreakpointValue({
		base: Layout.COMPACT,
		md: Layout.STANDARD,
	});
	const useDarkMode = layout === Layout.COMPACT;

	return (
		<Elements
			stripe={stripePromise}
			options={{
				mode: 'payment',
				amount: 5000,
				currency: 'usd',
				fonts: [
					{
						cssSrc: 'https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@400&display=swap',
					},
				],
				appearance: {
					labels: 'floating',
					variables: { spacingUnit: '4px' },
					rules: {
						'.Input': {
							fontSize: '16px',
							borderRadius: '5px',
							boxShadow: 'none',
							backgroundColor: useDarkMode
								? 'transparent'
								: gray100,
							color: useDarkMode ? 'white' : 'black',
							border: useDarkMode
								? '1px solid white'
								: 'none',
							paddingTop: '10px',
							paddingBottom: '10px',
							paddingLeft: '12px',
						},
						'.Input:focus': {
							outline: `1px solid ${useDarkMode ? 'white' : gray400}`,
							boxShadow: 'none',
							border: useDarkMode
								? '1px solid white'
								: '0',
						},
						'.Error': {
							fontSize: '15px',
							paddingTop: '6px',
						},
						'.Label': {
							color: useDarkMode ? gray200 : gray500,
						},
					},
				},
			}}
		>
			{children}
		</Elements>
	);
};
