import { Alert } from '@chakra-ui/react';
import { sansFontFamily } from '@client/theme';
import { JSX } from 'react';

type Props = {
	title: string;
	content?: string | JSX.Element;
};

export const AppError = (props: Props) => (
	<Alert.Root
		status="error"
		fontFamily={sansFontFamily}
	>
		<Alert.Indicator />
		<Alert.Content>
			<Alert.Title>{props.title}</Alert.Title>
			{props.content && (
				<Alert.Description>{props.content}</Alert.Description>
			)}
		</Alert.Content>
	</Alert.Root>
);
