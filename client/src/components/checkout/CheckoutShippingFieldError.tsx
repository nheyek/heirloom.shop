import { Collapsible, Text } from '@chakra-ui/react';
import { fieldErrorColor } from '@client/theme';

export const CheckoutShippingFieldError = (props: {
	errorText?: String | null;
}) => (
	<Collapsible.Root open={Boolean(props.errorText)}>
		<Collapsible.Content>
			<Text
				fontSize={15}
				color={fieldErrorColor}
				lineHeight={1}
				paddingTop={2.5}
			>
				{props.errorText}
			</Text>
		</Collapsible.Content>
	</Collapsible.Root>
);
