export interface Lineage {
	source: string;
	dataset: string;
	raw_file_id: string;
}

export interface Variable {
	name: string;
	value: number;
	unit: string;
	ref_timestamp: string;
	actual_lat: number;
	actual_lon: number;
	lineage: Lineage | null;
}

export interface Score {
	thiccness: number;
	sweatiness: number;
	irritation: number;
	warmth: number;
}

export interface Location {
	lat: number;
	lon: number;
}

export interface ButtprintResponse {
	svg: string;
	location: Location;
	requested_timestamp: string;
	variables: Variable[];
	score: Score;
}
