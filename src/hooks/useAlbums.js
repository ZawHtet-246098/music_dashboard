/** @format */

import { useQuery } from "@tanstack/react-query";
import {
	fetchAlbums
} from "../services/api/albumsApi";

export const useFetchAlbums = () => {
	return useQuery({ queryKey: ["albums"], queryFn: fetchAlbums });
};

