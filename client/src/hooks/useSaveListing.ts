import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import useApi from './useApi';

export const useSaveListing = () => {
	const { isAuthenticated, loginWithRedirect } = useAuth0();
	const { postProtectedResource, deleteProtectedResource } = useApi();
	const [isSaving, setIsSaving] = useState(false);

	const toggleSave = async (listingShortId: string, currentSavedState: boolean) => {
		if (!isAuthenticated) {
			// Store listing to save in sessionStorage before redirecting
			sessionStorage.setItem('pendingListingSave', listingShortId);
			
			// Redirect to login, will return to /saved page
			loginWithRedirect({
				appState: { returnTo: '/saved' }
			});
			return;
		}

		setIsSaving(true);
		
		if (currentSavedState) {
			// Unsave
			await deleteProtectedResource(`listings/${listingShortId}/save`);
		} else {
			// Save
			await postProtectedResource(`listings/${listingShortId}/save`, {});
		}
		
		setIsSaving(false);
	};

	return { toggleSave, isSaving };
};
