import {
	Alert,
	Box,
	Collapsible,
	Field,
	Fieldset,
	Flex,
	InputGroup,
	NativeSelect,
	Stack,
} from '@chakra-ui/react';
import { CheckoutHeading } from '@client/components/checkout/CheckoutHeading';
import { CheckoutShippingField } from '@client/components/checkout/CheckoutShippingField';
import { CheckoutShippingFieldError } from '@client/components/checkout/CheckoutShippingFieldError';
import { Layout } from '@client/constants';
import { useShoppingCart } from '@client/providers/ShoppingCartProvider';
import { fieldErrorColor, sansFontFamily } from '@client/theme';
import { extractAddressFields } from '@client/utils/addressUtils';
import { US_STATES } from '@heirloom/common/constants';
import { useLoadScript } from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';

const LIBRARIES: 'places'[] = ['places'];

type Props = {
	layout?: Layout;
	disabled?: boolean;
};

export const CheckoutShippingForm = (props: Props) => {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string,
		libraries: LIBRARIES,
	});

	const {
		checkoutEmail,
		checkoutEmailError,
		shippingAddress,
		shippingAddressErrors,
		shippingAddressUndeliverable,
		setCheckoutEmail,
		setShippingAddress,
		clearShippingAddressError,
		clearEmailError,
	} = useShoppingCart();

	const debounceRef =
		useRef<ReturnType<typeof setTimeout>>(undefined);
	const containerRef = useRef<HTMLDivElement>(null);

	const [addressInput, setAddressInput] = useState('');
	const [suggestions, setSuggestions] = useState<
		google.maps.places.AutocompleteSuggestion[]
	>([]);
	const [showSuggestions, setShowSuggestions] = useState(false);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(e.target as Node)
			) {
				setShowSuggestions(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener(
				'mousedown',
				handleClickOutside,
			);
	}, []);

	const fetchSuggestions = (value: string) => {
		if (debounceRef.current) clearTimeout(debounceRef.current);
		if (!value.trim() || !isLoaded) {
			setSuggestions([]);
			setShowSuggestions(false);
			return;
		}
		debounceRef.current = setTimeout(async () => {
			const { suggestions: results } =
				await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
					{
						input: value,
						includedRegionCodes: ['us'],
						includedPrimaryTypes: ['street_address'],
					},
				);
			setSuggestions(results);
			setShowSuggestions(true);
		}, 300);
	};

	const handleSelect = async (
		suggestion: google.maps.places.AutocompleteSuggestion,
	) => {
		setShowSuggestions(false);
		setSuggestions([]);

		const prediction = suggestion.placePrediction;
		if (!prediction) return;

		const place = prediction.toPlace();
		await place.fetchFields({
			fields: ['addressComponents'],
		});
		const fields = extractAddressFields(
			place.addressComponents || [],
		);
		setShippingAddress({ ...shippingAddress, ...fields });
		setAddressInput(fields.line1 || prediction.text?.text || '');
	};

	const fieldGap = 3;
	return (
		<Stack gap={fieldGap}>
			<CheckoutHeading
				Icon={() => <MdLocalShipping size={30} />}
			>
				Shipping
			</CheckoutHeading>
			<Fieldset.Root
				size="lg"
				disabled={props.disabled}
			>
				<Field.Root gap={0}>
					<CheckoutShippingField
						placeholder="Email address"
						name="email"
						type="email"
						value={checkoutEmail}
						onChange={(e) => {
							setCheckoutEmail(e.target.value);
							clearEmailError();
						}}
						invalid={!!checkoutEmailError}
					/>
					<CheckoutShippingFieldError
						errorText={checkoutEmailError}
					/>
				</Field.Root>

				<Flex
					gap={fieldGap}
					direction={
						props.layout === Layout.MOBILE
							? 'column'
							: 'row'
					}
				>
					<Field.Root>
						<CheckoutShippingField
							placeholder="First name"
							name="given-name"
							value={shippingAddress.firstName}
							onChange={(e) =>
								setShippingAddress({
									...shippingAddress,
									firstName: e.target.value,
								})
							}
						/>
					</Field.Root>
					<Field.Root gap={0}>
						<CheckoutShippingField
							placeholder="Last name"
							name="family-name"
							value={shippingAddress.lastName}
							onChange={(e) => {
								setShippingAddress({
									...shippingAddress,
									lastName: e.target.value,
								});
								clearShippingAddressError('lastName');
							}}
							invalid={!!shippingAddressErrors.lastName}
						/>
						<CheckoutShippingFieldError
							errorText={shippingAddressErrors.lastName}
						/>
					</Field.Root>
				</Flex>

				<Field.Root>
					<Box
						ref={containerRef}
						position="relative"
						width="100%"
					>
						<InputGroup startElement={<FaSearch />}>
							<CheckoutShippingField
								placeholder="Address"
								name="address-line1"
								value={
									addressInput ||
									shippingAddress.line1
								}
								onChange={(e) => {
									setShippingAddress({
										...shippingAddress,
										line1: e.target.value,
									});
									clearShippingAddressError(
										'line1',
									);

									setAddressInput(e.target.value);

									if (
										document.activeElement ===
										e.target
									) {
										fetchSuggestions(
											e.currentTarget.value,
										);
									}
								}}
								onFocus={() =>
									suggestions.length > 0 &&
									setShowSuggestions(true)
								}
								autoComplete="off"
								invalid={
									!!shippingAddressErrors.line1
								}
							/>
						</InputGroup>

						{showSuggestions &&
							suggestions.length > 0 && (
								<Box
									position="absolute"
									top="100%"
									left={0}
									right={0}
									zIndex="dropdown"
									bg="white"
									borderRadius="md"
									boxShadow="md"
									mt={1}
									overflow="hidden"
								>
									{suggestions.map(
										(suggestion, i) => (
											<Box
												key={i}
												px={3}
												py={2}
												cursor="pointer"
												fontSize={16}
												_hover={{
													bg: 'gray.100',
												}}
												onMouseDown={() =>
													handleSelect(
														suggestion,
													)
												}
											>
												{
													suggestion
														.placePrediction
														?.text?.text
												}
											</Box>
										),
									)}
								</Box>
							)}
						<CheckoutShippingFieldError
							errorText={shippingAddressErrors.line1}
						/>
					</Box>
				</Field.Root>
				<Field.Root>
					<CheckoutShippingField
						name="address-line2"
						placeholder="Apartment, suite, etc. (optional)"
						value={shippingAddress.line2}
						onChange={(e) =>
							setShippingAddress({
								...shippingAddress,
								line2: e.target.value,
							})
						}
					/>
				</Field.Root>

				<Flex
					gap={fieldGap}
					direction={
						props.layout === Layout.MOBILE
							? 'column'
							: 'row'
					}
				>
					<Field.Root gap={0}>
						<CheckoutShippingField
							placeholder="City"
							name="city"
							value={shippingAddress.city}
							onChange={(e) => {
								setShippingAddress({
									...shippingAddress,
									city: e.target.value,
								});
								clearShippingAddressError('city');
							}}
							invalid={!!shippingAddressErrors.city}
						/>
						<CheckoutShippingFieldError
							errorText={shippingAddressErrors.city}
						/>
					</Field.Root>
					<Field.Root gap={0}>
						<NativeSelect.Root
							variant="subtle"
							size="lg"
						>
							<NativeSelect.Field
								placeholder="State"
								name="address-level1"
								autoComplete="address-level1"
								height={12}
								fontFamily={sansFontFamily}
								fontSize={16}
								value={shippingAddress.state}
								onChange={(e) => {
									setShippingAddress({
										...shippingAddress,
										state: e.target.value,
									});
									clearShippingAddressError(
										'state',
									);
								}}
								border={
									shippingAddressErrors.state
										? `1px solid ${fieldErrorColor}`
										: undefined
								}
							>
								{US_STATES.map((s) => (
									<option
										key={s.value}
										value={s.value}
									>
										{s.label}
									</option>
								))}
							</NativeSelect.Field>

							<NativeSelect.Indicator />
						</NativeSelect.Root>
						<CheckoutShippingFieldError
							errorText={shippingAddressErrors.state}
						/>
					</Field.Root>
					<Field.Root gap={0}>
						<CheckoutShippingField
							placeholder="Zip code"
							name="postal-code"
							value={shippingAddress.zip}
							onChange={(e) => {
								setShippingAddress({
									...shippingAddress,
									zip: e.target.value,
								});
								clearShippingAddressError('zip');
							}}
							invalid={!!shippingAddressErrors.zip}
						/>
						<CheckoutShippingFieldError
							errorText={shippingAddressErrors.zip}
						/>
					</Field.Root>
				</Flex>
			</Fieldset.Root>
			<Collapsible.Root
				open={Boolean(shippingAddressUndeliverable)}
			>
				<Collapsible.Content>
					<Alert.Root status="error">
						<Alert.Indicator />
						<Alert.Content>
							<Alert.Title>
								Address validation failed.
							</Alert.Title>
						</Alert.Content>
					</Alert.Root>
				</Collapsible.Content>
			</Collapsible.Root>
		</Stack>
	);
};
