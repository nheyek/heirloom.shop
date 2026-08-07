import { useToken } from '@chakra-ui/react';
import { breakpoints, sansFontFamily } from '@client/theme';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ReactNode, useRef } from 'react';

const stripePromise = loadStripe(
	'pk_test_51T45cDQ5g6WbwJsUBcf1MIcU1OLAfvZ3dKWFQf1ly9DOIFU9mFqUvbylLBLkOYoVHpaMinK7Zst2l68Js0Ez0MPt00g6hawzCL',
	{
		developerTools: {
			assistant: {
				enabled: true,
			},
		},
	},
);

type Props = { children: ReactNode };

export const StripeProvider = ({ children }: Props) => {
	const [gray100, gray200, gray400, gray500] = useToken('colors', [
		'gray.100',
		'gray.200',
		'gray.400',
		'gray.500',
	]);

	const useDarkMode = !window.matchMedia(
		`(min-width: ${breakpoints.md})`,
	).matches;

	const optionsRef = useRef<object | null>(null);
	if (!optionsRef.current && gray100) {
		optionsRef.current = {
			mode: 'payment',
			amount: 99999,
			currency: 'usd',
			fonts: [
				{
					cssSrc: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap',
				},
			],
			appearance: {
				labels: 'floating',
				variables: {
					spacingUnit: '4px',
					fontFamily: `${sansFontFamily}, sans-serif`,
				},
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
						border: useDarkMode ? '1px solid white' : '0',
					},
					'.Error': {
						fontSize: '14px',
						paddingTop: '2px',
					},
					'.Label': {
						color: useDarkMode ? gray200 : gray500,
					},
					'.Label--resting': {
						fontSize: '16px',
					},
					'.Label--floating': {
						fontSize: '14px',
					},
				},
			},
		};
	}

	if (!optionsRef.current) return <>{children}</>;

	return (
		<Elements
			stripe={stripePromise}
			options={optionsRef.current}
		>
			{children}
		</Elements>
	);
};
