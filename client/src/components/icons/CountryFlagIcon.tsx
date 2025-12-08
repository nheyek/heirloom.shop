import { CountryCode } from '../../constants';
import { FaLocationDot } from 'react-icons/fa6';

export const CountryFlagIcon = (props: { countryCode: CountryCode | null }) => {
	if (!props.countryCode) {
		return <FaLocationDot size="20px" />;
	}
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512 512">
			<mask id="a">
				<circle cx="256" cy="256" r="256" fill="#fff" />
			</mask>
			<g mask="url(#a)">
				{props.countryCode === CountryCode.US && (
					<>
						<path
							fill="#eee"
							d="M256 0h256v64l-32 32 32 32v64l-32 32 32 32v64l-32 32 32 32v64l-256 32L0 448v-64l32-32-32-32v-64z"
						/>
						<path
							fill="#d80027"
							d="M224 64h288v64H224Zm0 128h288v64H256ZM0 320h512v64H0Zm0 128h512v64H0Z"
						/>
						<path fill="#0052b4" d="M0 0h256v256H0Z" />
						<path
							fill="#eee"
							d="m187 243 57-41h-70l57 41-22-67zm-81 0 57-41H93l57 41-22-67zm-81 0 57-41H12l57 41-22-67zm162-81 57-41h-70l57 41-22-67zm-81 0 57-41H93l57 41-22-67zm-81 0 57-41H12l57 41-22-67Zm162-82 57-41h-70l57 41-22-67Zm-81 0 57-41H93l57 41-22-67zm-81 0 57-41H12l57 41-22-67Z"
						/>
					</>
				)}
				{props.countryCode === CountryCode.CA && (
					<>
						<path
							fill="#d80027"
							d="M0 0v512h144l112-64 112 64h144V0H368L256 64 144 0Z"
						/>
						<path fill="#eee" d="M144 0h224v512H144Z" />
						<path
							fill="#d80027"
							d="m301 289 44-22-22-11v-22l-45 22 23-44h-23l-22-34-22 33h-23l23 45-45-22v22l-22 11 45 22-12 23h45v33h22v-33h45z"
						/>
					</>
				)}
				{props.countryCode === CountryCode.UK && (
					<>
						<path
							fill="#eee"
							d="m0 0 8 22-8 23v23l32 54-32 54v32l32 48-32 48v32l32 54-32 54v68l22-8 23 8h23l54-32 54 32h32l48-32 48 32h32l54-32 54 32h68l-8-22 8-23v-23l-32-54 32-54v-32l-32-48 32-48v-32l-32-54 32-54V0l-22 8-23-8h-23l-54 32-54-32h-32l-48 32-48-32h-32l-54 32L68 0H0z"
						/>
						<path
							fill="#0052b4"
							d="M336 0v108L444 0Zm176 68L404 176h108zM0 176h108L0 68ZM68 0l108 108V0Zm108 512V404L68 512ZM0 444l108-108H0Zm512-108H404l108 108Zm-68 176L336 404v108z"
						/>
						<path
							fill="#d80027"
							d="M0 0v45l131 131h45L0 0zm208 0v208H0v96h208v208h96V304h208v-96H304V0h-96zm259 0L336 131v45L512 0h-45zM176 336 0 512h45l131-131v-45zm160 0 176 176v-45L381 336h-45z"
						/>
					</>
				)}
				{props.countryCode === CountryCode.IT && (
					<>
						<path fill="#eee" d="M167 0h178l25.9 252.3L345 512H167l-29.8-253.4z" />
						<path fill="#6da544" d="M0 0h167v512H0z" />
						<path fill="#d80027" d="M345 0h167v512H345z" />
					</>
				)}
				{props.countryCode === CountryCode.FR && (
					<>
						<path fill="#eee" d="M167 0h178l25.9 252.3L345 512H167l-29.8-253.4z" />
						<path fill="#0052b4" d="M0 0h167v512H0z" />
						<path fill="#d80027" d="M345 0h167v512H345z" />
					</>
				)}
				{props.countryCode === CountryCode.DE && (
					<>
						<path fill="#ffda44" d="m0 345 256.7-25.5L512 345v167H0z" />
						<path fill="#d80027" d="m0 167 255-23 257 23v178H0z" />
						<path fill="#333" d="M0 0h512v167H0z" />
					</>
				)}
				{props.countryCode === CountryCode.BE && (
					<>
						<path fill="#333" d="M0 0h167l38.2 252.6L167 512H0z" />
						<path fill="#d80027" d="M345 0h167v512H345l-36.7-256z" />
						<path fill="#ffda44" d="M167 0h178v512H167z" />
					</>
				)}
				{props.countryCode === CountryCode.CZ && (
					<>
						<path fill="#eee" d="M0 0h512v256l-265 45.2z" />
						<path fill="#d80027" d="M210 256h302v256H0z" />
						<path fill="#0052b4" d="M0 0v512l256-256L0 0z" />
					</>
				)}
				{props.countryCode === CountryCode.CZ && (
					<>
						<path fill="#eee" d="m0 167 253.8-19.3L512 167v178l-254.9 32.3L0 345z" />
						<path fill="#a2001d" d="M0 0h512v167H0z" />
						<path fill="#0052b4" d="M0 345h512v167H0z" />
					</>
				)}
				{props.countryCode === CountryCode.AT && (
					<>
						<path
							fill="#d80027"
							d="M0 0h512v167l-23.2 89.7L512 345v167H0V345l29.4-89L0 167z"
						/>
						<path fill="#eee" d="M0 167h512v178H0z" />
					</>
				)}
				{props.countryCode === CountryCode.CH && (
					<>
						<path fill="#d80027" d="M0 0h512v512H0z" />
						<path
							fill="#eee"
							d="M389.6 211.5h-89v-89h-89.1v89h-89v89h89v89h89v-89h89z"
						/>
					</>
				)}
				{props.countryCode === CountryCode.PT && (
					<>
						<path fill="#6da544" d="M0 512h167l37.9-260.3L167 0H0z" />
						<path fill="#d80027" d="M512 0H167v512h345z" />
						<circle cx="167" cy="256" r="89" fill="#ffda44" />
						<path fill="#d80027" d="M116.9 211.5V267a50 50 0 1 0 100.1 0v-55.6H117z" />
						<path
							fill="#eee"
							d="M167 283.8c-9.2 0-16.7-7.5-16.7-16.7V245h33.4v22c0 9.2-7.5 16.7-16.7 16.7z"
						/>
					</>
				)}
			</g>
		</svg>
	);
};
