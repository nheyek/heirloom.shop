import { Collapsible, Text } from '@chakra-ui/react';
import { ERROR_COLOR, SANS_FONT_FAMILY } from '@client/constants';

export const CheckoutFieldError = (props: {
	errorText?: String | null;
}) => (
	<Collapsible.Root open={Boolean(props.errorText)}>
		<Collapsible.Content>
			<Text
				fontFamily={SANS_FONT_FAMILY}
				fontSize={14}
				color={ERROR_COLOR}
				lineHeight={1}
				paddingTop={2.5}
			>
				{props.errorText}
			</Text>
		</Collapsible.Content>
	</Collapsible.Root>
);
