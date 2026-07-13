import { useState } from 'react';

export const usePersonalization = () => {
	const [enabled, setEnabled] = useState(false);
	const [text, setText] = useState('');
	const [textError, setTextError] = useState<string | null>(null);

	const onToggle = (checked: boolean) => {
		setEnabled(checked);
		if (!checked) setTextError(null);
	};

	const onTextChange = (value: string) => {
		setText(value);
		if (value.trim()) setTextError(null);
	};

	const validate = (): boolean => {
		if (enabled && !text.trim()) {
			setTextError('This field is required.');
			return false;
		}
		return true;
	};

	return { enabled, text, textError, onToggle, onTextChange, validate };
};
