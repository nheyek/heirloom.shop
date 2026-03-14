import {
	Alert,
	Box,
	Collapsible,
	Field,
	Fieldset,
	Flex,
	Input,
	InputGroup,
	InputProps,
	NativeSelect,
	Stack,
	Text,
} from '@chakra-ui/react';
import { useLoadScript } from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import { Layout, US_STATES } from '../../constants';
import { useShoppingCart } from '../../providers/ShoppingCartProvider';
import { extractAddressFields } from '../../utils/addressUtils';
import { CheckoutHeading } from './CheckoutHeading';

const ERROR_COLOR = '#df1b41';
const LIBRARIES: 'places'[] = ['places'];

type Props = {
	layout?: Layout;
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

	const fieldGap = 3;
	return (
		<Stack gap={fieldGap}>
			<CheckoutHeading
				Icon={() => <MdLocalShipping size={30} />}
			>
				Shipping
			</CheckoutHeading>
			<Fieldset.Root size="lg">
				<Field.Root gap={0}>
					<FormInput
						placeholder="Email address"
						name="email"
						type="email"
						value={shippingAddress.email}
						onChange={(e) => {
							setShippingAddress({
								...shippingAddress,
								email: e.target.value,
							});
							clearShippingAddressError('email');
						}}
						invalid={!!shippingAddressErrors.email}
					/>
					{renderFieldError(shippingAddressErrors.email)}
				</Field.Root>

				<Flex
					gap={fieldGap}
					direction={
						props.layout === Layout.COMPACT
							? 'column'
							: 'row'
					}
				>
					<Field.Root>
						<FormInput
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
						<FormInput
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
						{renderFieldError(
							shippingAddressErrors.lastName,
						)}
					</Field.Root>
				</Flex>

				<Field.Root>
					<Box
						ref={containerRef}
						position="relative"
						width="100%"
					>
						<InputGroup startElement={<FaSearch />}>
							<FormInput
								placeholder="Address"
								name="address-line1"
								value={addressInput}
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
									zIndex={10}
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
												fontSize={14}
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
						{renderFieldError(
							shippingAddressErrors.line1,
						)}
					</Box>
				</Field.Root>
				<Field.Root>
					<FormInput
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
						props.layout === Layout.COMPACT
							? 'column'
							: 'row'
					}
				>
					<Field.Root gap={0}>
						<FormInput
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
						{renderFieldError(shippingAddressErrors.city)}
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
										? `1px solid ${ERROR_COLOR}`
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
						{renderFieldError(
							shippingAddressErrors.state,
						)}
					</Field.Root>
					<Field.Root gap={0}>
						<FormInput
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
						{renderFieldError(shippingAddressErrors.zip)}
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

const FormInput = ({
	invalid,
	...rest
}: InputProps & { invalid?: boolean }) => (
	<Input
		variant="subtle"
		fontSize={16}
		p={3}
		height={12}
		borderRadius={5}
		border={invalid ? `1px solid ${ERROR_COLOR}` : undefined}
		{...rest}
	/>
);

const renderFieldError = (errorText?: String) => (
	<Collapsible.Root open={Boolean(errorText)}>
		<Collapsible.Content>
			<Text
				fontSize={15}
				color={ERROR_COLOR}
				lineHeight={1}
				paddingTop={2.5}
			>
				{errorText}
			</Text>
		</Collapsible.Content>
	</Collapsible.Root>
);
