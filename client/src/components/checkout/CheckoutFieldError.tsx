import {
	FIELD_ERROR_COLOR,
	SANS_FONT_FAMILY,
} from '@client/constants';
import { Collapsible, Text } from '@chakra-ui/react';

export const CheckoutFieldError = (props: {
	errorText?: String | null;
}) => (
	<Collapsible.Root open={Boolean(props.errorText)}>
		<Collapsible.Content>
			<Text
				fontFamily={SANS_FONT_FAMILY}
				fontSize={14}
				color={FIELD_ERROR_COLOR}
				lineHeight={1}
				paddingTop={2.5}
			>
				{props.errorText}
			</Text>
		</Collapsible.Content>
	</Collapsible.Root>
);
