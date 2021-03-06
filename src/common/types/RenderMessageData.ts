
/** @internal */
export interface StatusData {
	outFrames: number;
	sampleRate: number;
	isQueueEmpty: boolean;
}

/** @internal */
export interface Base {
	type: string;
	data?: any;
}

/** @internal */
export interface Render extends Base {
	type: 'render';
	data: [ArrayBuffer, ArrayBuffer];
}

/** @internal */
export interface RenderedResponse extends Base {
	type: 'rendered';
	data: StatusData;
}

/** @internal */
export interface Status extends Base {
	type: 'status';
	data: StatusData;
}

/** @internal */
export interface QueueControl extends Base {
	type: 'queue';
	data: {
		pause: boolean;
	};
}

/** @internal */
export interface Pause extends Base {
	type: 'pause';
	data: {
		id: number;
		paused: boolean;
	};
}

/** @internal */
export interface Stop extends Base {
	type: 'stop';
	data?: never;
}

/** @internal */
export interface Release extends Base {
	type: 'release';
	data?: never;
}

/** @internal */
export type AllTypes = Render | RenderedResponse | Status | QueueControl |
	Pause | Stop | Release;

/** @internal */
export default AllTypes;
