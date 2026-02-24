import { Box, useToken } from '@chakra-ui/react';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import useApi from '../../hooks/useApi';
import { FONT_DEFAULT } from '../../theme';

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

export const _CheckoutPaymentForm = () => {
	return (
		<Box>
			<PaymentElement options={{ layout: 'tabs' }} />
		</Box>
	);
};

export const CheckoutPaymentForm = () => {
	const [clientSecret, setClientSecret] = useState<string>('');
	const { postPublicResource } = useApi();
	const [gray100, gray400] = useToken('colors', [
		'gray.100',
		'gray.400',
	]);

	const loadStripe = async () => {
		const intentResponse = await postPublicResource(
			'payment/intent',
			{
				amount: 5000,
			},
		);
		if (!intentResponse.error) {
			setClientSecret((await intentResponse).data.clientSecret);
		}
	};

	useEffect(() => {
		loadStripe();
	}, []);

	console.log(clientSecret);

	return clientSecret ? (
		<Elements
			stripe={stripePromise}
			options={{
				clientSecret: clientSecret,
				fonts: [
					{
						cssSrc: 'https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@400&display=swap',
					},
				],
				appearance: {
					labels: 'floating',
					rules: {
						'.Label': {
							fontFamily: FONT_DEFAULT,
							fontSize: '18px',
						},
						'.Input': {
							fontFamily: FONT_DEFAULT,
							fontSize: '18px',
							border: '0',
							borderRadius: '3px',
							boxShadow: 'none',
							backgroundColor: gray100,
							paddingX: '10px',
							paddingTop: '10px',
							paddingBottom: '10px',
						},
						'.Input:focus': {
							outline: `1px solid ${gray400}`,
							boxShadow: 'none',
							border: '0',
						},
						'.Error': {
							fontFamily: FONT_DEFAULT,
							fontSize: '16px',
						},
					},
				},
			}}
		>
			<_CheckoutPaymentForm />
		</Elements>
	) : null;
};
