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
import { CheckoutField } from '@client/components/checkout/CheckoutField';
import { CheckoutFieldError } from '@client/components/checkout/CheckoutFieldError';
import { CheckoutHeading } from '@client/components/checkout/CheckoutHeading';
import {
	CHECKOUT_FIELD_GAP,
	CHECKOUT_FIELD_HEIGHT,
} from '@client/components/checkout/checkoutLayout';
import {
	FIELD_ERROR_COLOR,
	Layout,
	SANS_FONT_FAMILY,
} from '@client/constants';
import { useShoppingCart } from '@client/providers/ShoppingCartProvider';
import { extractAddressFields } from '@client/utils/addressUtils';
import { US_STATES } from '@heirloom/common/constants';
import { useLoadScript } from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

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
		shippingAddress,
		shippingAddressErrors,
		shippingAddressUndeliverable,
		setShippingAddress,
		clearShippingAddressError,
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

	return (
		<Stack gap={0}>
			<CheckoutHeading>Ship To</CheckoutHeading>
			<Fieldset.Root
				size="lg"
				mt={CHECKOUT_FIELD_GAP}
				disabled={props.disabled}
			>
				<Flex
					gap={CHECKOUT_FIELD_GAP}
					direction={
						props.layout === Layout.MOBILE
							? 'column'
							: 'row'
					}
				>
					<Field.Root>
						<CheckoutField
							placeholder="First name"
							name="given-name"
							autoComplete="given-name"
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
						<CheckoutField
							placeholder="Last name"
							name="family-name"
							autoComplete="family-name"
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
						<CheckoutFieldError
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
							<CheckoutField
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
								autoComplete="address-line1"
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
						<CheckoutFieldError
							errorText={shippingAddressErrors.line1}
						/>
					</Box>
				</Field.Root>
				<Field.Root>
					<CheckoutField
						name="address-line2"
						autoComplete="address-line2"
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
					gap={CHECKOUT_FIELD_GAP}
					direction={
						props.layout === Layout.MOBILE
							? 'column'
							: 'row'
					}
				>
					<Field.Root gap={0}>
						<CheckoutField
							placeholder="City"
							name="city"
							autoComplete="address-level2"
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
						<CheckoutFieldError
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
								height={CHECKOUT_FIELD_HEIGHT}
								fontFamily={SANS_FONT_FAMILY}
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
										? `1px solid ${FIELD_ERROR_COLOR}`
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
						<CheckoutFieldError
							errorText={shippingAddressErrors.state}
						/>
					</Field.Root>
					<Field.Root gap={0}>
						<CheckoutField
							placeholder="Zip code"
							name="postal-code"
							autoComplete="postal-code"
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
						<CheckoutFieldError
							errorText={shippingAddressErrors.zip}
						/>
					</Field.Root>
				</Flex>
			</Fieldset.Root>
			<Collapsible.Root
				open={Boolean(shippingAddressUndeliverable)}
			>
				<Collapsible.Content pt={CHECKOUT_FIELD_GAP}>
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
