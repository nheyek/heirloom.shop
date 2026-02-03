import { Alert } from '@chakra-ui/react';
import { JSX } from 'react';

type Props = {
	title: string;
	content?: string | JSX.Element;
};

export const AppError = (props: Props) => (
	<Alert.Root status="error">
		<Alert.Indicator />
		<Alert.Content>
			<Alert.Title>{props.title}</Alert.Title>
			<Alert.Description>
				{props.content}
			</Alert.Description>
		</Alert.Content>
	</Alert.Root>
);
