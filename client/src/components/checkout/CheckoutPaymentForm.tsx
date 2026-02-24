import { Skeleton, useToken } from '@chakra-ui/react';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import useApi from '../../hooks/useApi';

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
	const [ready, setReady] = useState<boolean>(false);

	return (
		<Skeleton loading={!ready}>
			<PaymentElement
				options={{ layout: 'tabs' }}
				onReady={() => setTimeout(() => setReady(true), 1000)}
			/>
		</Skeleton>
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

	return clientSecret ? (
		<Elements
			stripe={stripePromise}
			options={{
				loader: 'never',
				clientSecret: clientSecret,
				fonts: [
					{
						cssSrc: 'https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@400&display=swap',
					},
				],
				appearance: {
					labels: 'floating',
					variables: { spacingUnit: '3px' },
					rules: {
						'.Input': {
							fontSize: '16px',
							border: '0',
							borderRadius: '3px',
							boxShadow: 'none',
							backgroundColor: gray100,
							paddingTop: '10px',
							paddingBottom: '10px',
							paddingLeft: '12px',
							fontWetight: 'bold',
						},
						'.Input:focus': {
							outline: `1px solid ${gray400}`,
							boxShadow: 'none',
							border: '0',
						},
						'.Error': {
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
