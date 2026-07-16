import { Collapsible, Text } from '@chakra-ui/react';
import { FIELD_ERROR_COLOR } from '@client/theme';

export const CheckoutShippingFieldError = (props: {
	errorText?: String | null;
}) => (
	<Collapsible.Root open={Boolean(props.errorText)}>
		<Collapsible.Content>
			<Text
				fontSize={15}
				color={FIELD_ERROR_COLOR}
				lineHeight={1}
				paddingTop={2.5}
			>
				{props.errorText}
			</Text>
		</Collapsible.Content>
	</Collapsible.Root>
);
