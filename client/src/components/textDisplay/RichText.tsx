import { BoxProps, Text } from '@chakra-ui/react';

type Props = BoxProps & {
	htmlString: string;
};

export const RichText = (props: Props) => {
	return (
		<Text
			{...props}
			css={{
				'& p': {
					fontSize: 16,
					lineHeight: 'base',
					marginBottom: 2,
				},
				'& h1': {
					fontSize: 20,
					marginTop: 4,
					marginBottom: 2,
					fontWeight: 'bold',
				},
				'& ul, & ol': {
					marginLeft: '1.5rem',
					marginBottom: '1rem',
					listStyleType: 'disc',
				},
				'& li': {
					marginBottom: '0.5rem',
				},
			}}
			dangerouslySetInnerHTML={{
				__html: props.htmlString,
			}}
		/>
	);
};
