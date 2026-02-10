import { Alert, Box } from '@chakra-ui/react';
import { JSX } from 'react';

type Props = {
	title: string;
	content?: string | JSX.Element;
};

export const AppError = (props: Props) => (
	<Box m={5}>
		<Alert.Root status="error">
			<Alert.Indicator />
			<Alert.Content>
				<Alert.Title>{props.title}</Alert.Title>
				{props.content && (
					<Alert.Description>
						{props.content}
					</Alert.Description>
				)}
			</Alert.Content>
		</Alert.Root>
	</Box>
);
