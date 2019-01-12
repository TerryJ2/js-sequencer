
import * as JSSynth from 'js-synthesizer';

type Flatten<T> = { [P in keyof T]: T[P]; };
type PartialRequired<T, TKeys extends keyof T> = Flatten<{
	[P in keyof T]: T[P];
} & {
	[P in TKeys]-?: T[P];
}>;

/** @internal */
export interface Base {
	id?: number | null;
	type: string;
}

/** @internal */
export interface ConfigBase {
	interval?: number;
	framesCount?: number;
	gain?: number;
	channel16IsDrums?: boolean;
}
/** @internal */
export type InitConfig = PartialRequired<ConfigBase, 'interval'>;

/** @internal */
export interface Initialize extends Base, InitConfig {
	id: number;
	type: 'initialize';
	port: MessagePort;
	deps: string[];
	sampleRate?: number;
	channelCount?: number;
}

/** @internal */
export interface Close extends Base {
	id?: never;
	type: 'close';
}

/** @internal */
export interface Configure extends Base, ConfigBase {
	id: number;
	type: 'config';
}

/** @internal */
export interface LoadSoundfont extends Base {
	id: number;
	type: 'load-sfont';
	data: ArrayBuffer;
}

/** @internal */
export interface UnloadSoundfont extends Base {
	id: number;
	type: 'unload-sfont';
	sfontId: number;
}

/** @internal */
export interface Start extends Base {
	id?: never;
	type: 'start';
	renderPort?: MessagePort;
}

/** @internal */
export interface Stop extends Base {
	id?: never;
	type: 'stop';
}

/** @internal */
export interface Release extends Base {
	id?: never;
	type: 'release';
	resetSynth?: boolean;
}

/** @internal */
export interface Event extends Base {
	id?: never;
	type: 'event';
	data: JSSynth.SequencerEvent;
	/** in milliseconds, or null for send immediately */
	time: number | null;
}

/** @internal */
export interface SysEx extends Base {
	id?: never;
	type: 'sysex';
	data: ArrayBuffer;
	/** in milliseconds, or null for send immediately */
	time: number | null;
}

/** @internal */
export interface FinishMarker extends Base {
	id?: never;
	type: 'finish';
	/** in milliseconds, or null for send immediately */
	time: number | null;
}

/** @internal */
export type AllTypes = Initialize | Close | Configure | LoadSoundfont | UnloadSoundfont |
	Start | Stop | Release | Event | SysEx | FinishMarker;
/** @internal */
export default AllTypes;