import {EventEmitter} from 'events';
import React, {createContext, ReactNode, useContext, useState} from 'react';

export enum EventTypes {
	TOGGLE_HELP = 'toggle-help',
	DOC_CHANGED = 'doc-changed'
}

export interface EventBus {
	fire(type: EventTypes.TOGGLE_HELP): this;
	on(type: EventTypes.TOGGLE_HELP, listener: () => void): this;
	off(type: EventTypes.TOGGLE_HELP, listener: () => void): this;
	fire(type: EventTypes.DOC_CHANGED, doc: string): this;
	on(type: EventTypes.DOC_CHANGED, listener: (doc: string) => void): this;
	off(type: EventTypes.DOC_CHANGED, listener: (doc: string) => void): this;
}

const Context = createContext<EventBus>({} as EventBus);
Context.displayName = 'eeb';

export const EventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const [bus] = useState(() => {
		const emitter = new EventEmitter().setMaxListeners(999999);
		return {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			fire: (type: string, ...data: Array<any>) => {
				emitter.emit(type, ...data);
			},
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			once: (type: string, listener: (...data: Array<any>) => void) => emitter.once(type, listener),
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			on: (type: string, listener: (...data: Array<any>) => void) => {
				if (emitter.rawListeners(type).includes(listener)) {
					console.error(`Listener on [${type}] was added into event bus, check it.`);
				}
				emitter.on(type, listener);
			},
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			off: (type: string, listener: (...data: Array<any>) => void) => emitter.off(type, listener)
		} as unknown as EventBus;
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useEventBus = () => useContext(Context);
