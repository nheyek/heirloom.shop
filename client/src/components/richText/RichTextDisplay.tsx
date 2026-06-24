import { BoxProps, Text } from '@chakra-ui/react';

type Props = BoxProps & {
	htmlString: string;
	fontSize?: number;
};

export const RichTextDisplay = (props: Props) => {
	const fontSize = props.fontSize || 18;
	return (
		<Text
			{...props}
			css={{
				'& p': {
					fontSize,
					lineHeight: 'base',
					marginBottom: 2,
				},
				'& h1': {
					fontSize: fontSize + 4,
					marginTop: 4,
					marginBottom: 2,
					fontWeight: 'bold',
				},
				'& ul, & ol': {
					marginLeft: '1rem',
					marginBottom: '0.5rem',
					listStyleType: 'disc',
				},
				'& li': {
					marginBottom: '0.25rem',
				},
				'& em': {
					fontStyle: 'italic',
				},
				'& u': {
					textDecoration: 'underline',
				},
			}}
			dangerouslySetInnerHTML={{
				__html: props.htmlString,
			}}
		/>
	);
};
