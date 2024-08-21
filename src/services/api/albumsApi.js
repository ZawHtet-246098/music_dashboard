/** @format */

import { URL } from "../api_endpont";
import { requestGetOption } from "../api_header";

export const fetchAlbums = async () => {
	try {
		const response = await fetch(`${URL}/json/2/searchalbum.php?s=daft_punk`, requestGetOption);
		const data = await response.json();
		if (!response.ok) throw new Error(data.message);
		return data;
	} catch (error) {
		throw error;
	}
};

