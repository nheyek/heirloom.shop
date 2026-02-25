import {
	GridItem,
	Presence,
	SimpleGrid,
	Skeleton,
	useToken,
} from '@chakra-ui/react';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useRef, useState } from 'react';
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

const FormSkeletonRow = () => <Skeleton height="53px" />;

const FormSkeleton = () => (
	<SimpleGrid
		columns={2}
		gap={1.5}
	>
		<GridItem colSpan={2}>
			<FormSkeletonRow />
		</GridItem>
		<GridItem colSpan={1}>
			<FormSkeletonRow />
		</GridItem>
		<GridItem colSpan={1}>
			<FormSkeletonRow />
		</GridItem>
		<GridItem colSpan={1}>
			<FormSkeletonRow />
		</GridItem>
		<GridItem colSpan={1}>
			<FormSkeletonRow />
		</GridItem>
	</SimpleGrid>
);

export const _CheckoutPaymentForm = () => {
	const [ready, setReady] = useState<boolean>(false);

	return (
		<>
			<Presence present={!ready}>
				<FormSkeleton />
			</Presence>
			<Presence present={ready}>
				<PaymentElement
					options={{ layout: 'tabs' }}
					onReady={() => {
						setReady(true);
					}}
				/>
			</Presence>
		</>
	);
};

type Props = {
	invertColors?: boolean;
};

export const CheckoutPaymentForm = (props: Props) => {
	const clientSecret = useRef<string | null>(null);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	const { postPublicResource } = useApi();
	const [gray100, gray300, gray400, gray500] = useToken('colors', [
		'gray.100',
		'gray.300',
		'gray.400',
		'gray.500',
	]);

	const loadStripe = async () => {
		const intentResponse = await postPublicResource(
			'payment/intent',
			{
				amount: 5000,
			},
		);
		if (!intentResponse.error) {
			clientSecret.current = intentResponse.data.clientSecret;
			setIsLoaded(true);
		}
	};

	useEffect(() => {
		loadStripe();
	}, []);

	return isLoaded && clientSecret.current ? (
		<Elements
			stripe={stripePromise}
			options={{
				loader: 'never',
				clientSecret: clientSecret.current,
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
							backgroundColor: props.invertColors
								? 'transparent'
								: gray100,
							color: props.invertColors
								? 'white'
								: 'black',
							border: props.invertColors
								? '1px solid white'
								: 'none',
							paddingTop: '10px',
							paddingBottom: '10px',
							paddingLeft: '12px',
							fontWeight: '500',
						},
						'.Input:focus': {
							outline: `1px solid ${props.invertColors ? 'white' : gray400}`,
							boxShadow: 'none',
							border: props.invertColors
								? '1px solid white'
								: '0',
						},
						'.Error': {
							fontSize: '16px',
						},
						'.Label': {
							color: props.invertColors
								? gray300
								: gray500,
						},
					},
				},
			}}
		>
			<_CheckoutPaymentForm />
		</Elements>
	) : (
		<FormSkeleton />
	);
};
