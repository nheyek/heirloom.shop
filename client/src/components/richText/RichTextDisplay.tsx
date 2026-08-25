import { BoxProps, Text } from '@chakra-ui/react';
import { displayFontFamily } from '@client/theme';

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
					minHeight: 2,
				},
				'& h1': {
					fontSize: fontSize + 4,
					fontFamily: displayFontFamily,
					marginTop: 2,
					marginBottom: 1,
					fontWeight: 500,
				},
				'& ul, & ol': {
					marginLeft: 6,
					listStyleType: 'disc',
				},
				'& li': {
					fontSize,
					marginBottom: 2,
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
