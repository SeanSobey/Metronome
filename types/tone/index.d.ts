declare namespace Tone {

	// ======================
	// Core
	// ======================

	/**
	 * A single master output which is connected to the AudioDestinationNode (aka your speakers). It provides useful conveniences such as the ability to set the volume and mute the entire application. It also gives you the ability to apply master effects to your application.
	 *
	 * Like Tone.Transport, A single Tone.Master is created on initialization and you do not need to explicitly construct one.
	 * @example
	 * //the audio will go from the oscillator to the speakers
	 * oscillator.connect(Tone.Master);
	 * //a convenience for connecting to the master output is also provided:
	 * oscillator.toMaster();
	 * //the above two examples are equivalent.
	 */
	export class MasterConstructor extends Tone {
		/**
		 * Is an instanceof Tone.Master
		 */
		public isMaster: boolean;
		/**
		 * Mute the output.
		 * @example
		 * //mute the output
		 * Tone.Master.mute = true;
		 */
		public mute: boolean;
		/**
		 * The volume of the master output.
		 */
		public volume: Decibels;

		/**
		 * Add a master effects chain. NOTE: this will disconnect any nodes which were previously chained in the master effects chain.
		 *
		 * @param args All arguments will be connected in a row and the Master will be routed through it.
		 * @example
		 * //some overall compression to keep the levels in check
		 * var masterCompressor = new Tone.Compressor({
		 * 	 "threshold" : -6,
		 * 	 "ratio" : 3,
		 * 	 "attack" : 0.5,
		 * 	 "release" : 0.1
		 * });
		 * //give a little boost to the lows
		 * var lowBump = new Tone.Filter(200, "lowshelf");
		 * //route everything through the filter
		 * //and compressor before going to the speakers
		 * Tone.Master.chain(lowBump, masterCompressor);
		 */
		public chain(...args: Array<AudioNode | Tone>): this;
		/**
		 * Clean up
		 */
		public dispose(): this;
	}

	/**
	 * Tone.Emitter gives classes which extend it the ability to listen for and emit events. Inspiration and reference from Jerome Etienne’s MicroEvent. MIT (c) 2011 Jerome Etienne.
	 *
	 * @see https://tonejs.github.io/docs/r13/Emitter
	 */
	export class Emitter extends Tone {

		/**
		 *
		 */
		public dispose(): this;
		/**
		 * Invoke all of the callbacks bound to the event with any arguments passed in.
		 *
		 * @param event The name of the event.
		 * @param args The arguments to pass to the functions listening.
		 */
		public emit(event: string, ...args: Array<any>): this;
		/**
		 * Remove the event listener.
		 *
		 * @param event The event to stop listening to.
		 * @param callback The callback which was bound to the event with Tone.Emitter.on. If no callback is given, all callbacks events are removed.
		 */
		public off(event: string, callback: Function): this;
		/**
		 * Bind a callback to a specific event.
		 *
		 * @param event The name of the event to listen for.
		 * @param callback The callback to invoke when the event is emitted
		 */
		public on(event: string, callback: Function): this;
		/**
		 * Bind a callback which is only invoked once
		 *
		 * @param event The name of the event to listen for.
		 * @param callback The callback to invoke when the event is emitted
		 */
		public once(event: string, callback: Function): this;

		/**
		 * Add Emitter functions (on/off/emit) to the object
		 *
		 * @param object The object or class to extend.
		 */
		public static mixin(object: Object | Function): Emitter;
	}

	/**
	 * Wrapper around the native AudioContext.
	 *
	 * @see https://tonejs.github.io/docs/r13/Context
	 */
	export class Context extends Emitter {

	}

	/**
	 * Tone.AudioNode is the base class for classes which process audio. AudioNodes have inputs and outputs.
	 *
	 * @see https://tonejs.github.io/docs/r13/AudioNode
	 */
	export class AudioNode extends Tone {
		/**
		 * channelCount is the number of channels used when up-mixing and down-mixing connections to any inputs to the node. The default value is 2 except for specific nodes where its value is specially determined.
		 */
		public readonly channelCount: number;
		/**
		 * channelCountMode determines how channels will be counted when up-mixing and down-mixing connections to any inputs to the node. The default value is “max”. This attribute has no effect for nodes with no inputs.
		 */
		public readonly channelCountMode: string;
		/**
		 * channelInterpretation determines how individual channels will be treated when up-mixing and down-mixing connections to any inputs to the node. The default value is “speakers”.
		 */
		public readonly channelInterpretation: string;
		/**
		 * The number of inputs feeding into the AudioNode. For source nodes, this will be 0.
		 */
		public readonly numberOfInputs: number;
		/**
		 * The number of outputs coming out of the AudioNode.
		 */
		public readonly numberOfOutputs: number;

		/**
		 * Connect the output of this node to the rest of the nodes in series.
		 *
		 * @param nodes
		 * @example
		 * //connect a node to an effect, panVol and then to the master output
		 * node.chain(effect, panVol, Tone.Master);
		 */
		public chain(nodes: AudioParam | Tone | AudioNode): this;
		/**
		 * Connect the output of a ToneNode to an AudioParam, AudioNode, or ToneNode
		 *
		 * @param unit
		 * @param outputNum optionally which output to connect from
		 * @param inputNum optionally which input to connect to
		 */
		public connect(unit: Tone | AudioParam | AudioNode, outputNum?: number, inputNum?: number): this;
		/**
		 * disconnect the output
		 *
		 * @param output Either the output index to disconnect if the output is an array, or the node to disconnect from.
		 */
		public disconnect (output: number | AudioNode): this;
		/**
		 * Dispose and disconnect
		 */
		public dispose (): this;
		/**
		 * connect the output of this node to the rest of the nodes in parallel.
		 */
		public fan(nodes: AudioParam | Tone | AudioNode): this;
		/**
		 * Connect ‘this’ to the master output. Shorthand for this.connect(Tone.Master)
		 *
		 * @example
		 * //connect an oscillator to the master output
		 * var osc = new Tone.Oscillator().toMaster();
		 */
		public toMaster(): this;
	}

	/**
	 * Tone.Param wraps the native Web Audio’s AudioParam to provide additional unit conversion functionality. It also serves as a base-class for classes which have a single, automatable parameter.
	 *
	 * @see https://tonejs.github.io/docs/r13/Param
	 */
	export class Param extends AudioNode {
		/**
		 * @param param The parameter to wrap.
		 * @param units The units of the audio param.
		 * @param convert If the param should be converted.
		 */
		constructor(param: AudioParam, units: Type, convert: boolean);

		/**
		 * If the value should be converted or not
		 */
		public convert: boolean;
		/**
		 * The units of the parameter
		 */
		public units: Type;
		/**
		 * The current value of the parameter.
		 */
		public value: number;
		/**
		 * The minimum output value of the parameter
		 */
		public minValue: number;
		/**
		 * The maximum output value of the parameter
		 */
		public maxValue: number;

		/**
		 * This is similar to cancelScheduledValues except it holds the automated value at time until the next automated event.
		 *
		 * @param time
		 */
		public cancelAndHoldAtTime(time: Time): this;
		/**
		 * Cancels all scheduled parameter changes with times greater than or equal to startTime.
		 *
		 * @param time
		 */
		public cancelScheduledValues(time: Time): this;
		/**
		 */
		public dispose(): this;
		/**
		 * Start exponentially approaching the target value at the given time. Since it is an exponential approach it will continue approaching after the ramp duration. The rampTime is the time that it takes to reach over 99% of the way towards the value. This methods is similar to setTargetAtTime except the third argument is a time instead of a ‘timeConstant’
		 *
		 * @param value The value to ramp to.
		 * @param time When the ramp should start.
		 * @param rampTime the time that it takes the value to ramp from it’s current value
		 */
		public exponentialApproachValueAtTime(value: number, time: Time, rampTime: Time): this;
		/**
		 * Start exponentially approaching the target value at the given time. Since it is an exponential approach it will continue approaching after the ramp duration. The rampTime is the time that it takes to reach over 99% of the way towards the value. This methods is similar to setTargetAtTime except the third argument is a time instead of a ‘timeConstant’
		 *
		 * @param value The value to ramp to.
		 * @param rampTime the time that it takes the value to ramp from it’s current value
		 * @param startTime When the ramp should start.
		 * @example
		 * //exponentially ramp to the value 2 over 4 seconds.
		 * signal.exponentialRampTo(2, 4);
		 */
		public exponentialRampTo(value: number, rampTime: Time, startTime: Time): this;
		/**
		 * Schedules an exponential continuous change in parameter value from the previous scheduled parameter value to the given value.
		 *
		 * @param value
		 * @param endTime
		 */
		public exponentialRampToValueAtTime(value: number, endTime: Time): this;
		/**
		 * Get the signals value at the given time. Subsequent scheduling may invalidate the returned value.
		 *
		 * @param value When to get the value
		 */
		public getValueAtTime(value: number): this;
		/**
		 * Schedules an linear continuous change in parameter value from the current time and current value to the given value over the duration of the rampTime.
		 *
		 * @param value The value to ramp to.
		 * @param rampTime the time that it takes the value to ramp from it’s current value
		 * @param startTime When the ramp should start.
		 * @example
		 * //linearly ramp to the value 4 over 3 seconds.
		 * signal.linearRampTo(4, 3);
		 */
		public linearRampTo(value: number, rampTime: Time, startTime?: Time): this;
		/**
		 * Schedules a linear continuous change in parameter value from the previous scheduled parameter value to the given value.
		 *
		 * @param value
		 * @param endTime
		 */
		public linearRampToValueAtTime(value: number, endTime: Time): this;
		/**
		 * Ramps to the given value over the duration of the rampTime. Automatically selects the best ramp type (exponential or linear) depending on the units of the signal
		 *
		 * @param value
		 * @param rampTime The time that it takes the value to ramp from it’s current value
		 * @param startTime When the ramp should start.
		 * @example
		 * //ramp to the value either linearly or exponentially
		 * //depending on the "units" value of the signal
		 * signal.rampTo(0, 10);
		 *
		 * //schedule it to ramp starting at a specific time
		 * signal.rampTo(0, 10, 5)
		 */
		public rampTo(value: number, rampTime: Time, startTime?: Time): this;
		/**
		 * Creates a schedule point with the current value at the current time. This is useful for creating an automation anchor point in order to schedule changes from the current value.
		 *
		 * @param now (Optionally) pass the now value in.
		 */
		public setRampPoint(now?: number): this;
		/**
		 * Start exponentially approaching the target value at the given time with a rate having the given time constant.
		 *
		 * @param value
		 * @param startTime
		 * @param timeConstant
		 */
		public setTargetAtTime(value: number, startTime: Time, timeConstant: number): this;
		/**
		 * Schedules a parameter value change at the given time.
		 *
		 * @param value The value to set the signal.
		 * @param time The time when the change should occur.
		 * @example
		 * //set the frequency to "G4" in exactly 1 second from now.
		 * freq.setValueAtTime("G4", "+1");
		 */
		public setValueAtTime(value: number, time: Time): this;
		/**
		 * Sets an array of arbitrary parameter values starting at the given time for the given duration.
		 *
		 * @param values
		 * @param startTime
		 * @param duration
		 * @param scaling If the values in the curve should be scaled by some value
		 */
		public setValueCurveAtTime(values: Array<number>, startTime: Time, duration: Time, scaling: NormalRange): this;
		/**
		 * Start exponentially approaching the target value at the given time. Since it is an exponential approach it will continue approaching after the ramp duration. The rampTime is the time that it takes to reach over 99% of the way towards the value.
		 *
		 * @param value The value to ramp to.
		 * @param rampTime the time that it takes the value to ramp from it’s current value
		 * @param startTime When the ramp should start.
		 * @example
		 * //exponentially ramp to the value 2 over 4 seconds.
		 * signal.exponentialRampTo(2, 4);
		 */
		public targetRampTo(value: number, rampTime: Time, startTime?: Time): this;
	}

	/**
	 * Transport for timing musical events. Supports tempo curves and time changes. Unlike browser-based timing (setInterval, requestAnimationFrame) Tone.Transport timing events pass in the exact time of the scheduled event in the argument of the callback function. Pass that time value to the object you’re scheduling.
 	*
 	* A single transport is created for you when the library is initialized.
 	*
 	* The transport emits the events: “start”, “stop”, “pause”, and “loop” which are called with the time of that event as the argument.
	 */
	export class TransportConstructor extends Emitter {
		/**
		 * Pulses Per Quarter note. This is the smallest resolution the Transport timing supports. This should be set once on initialization and not set again. Changing this value after other objects have been created can cause problems.
		 */
		public PPQ: number;
		/**
		 * The Beats Per Minute of the Transport.
		 */
		public bpm: BPM;
		/**
		 * Is an instanceof Tone.Transport
		 */
		public isTransport: boolean;
		/**
		 * If the transport loops or not.
		 */
		public loop: boolean;
		/**
		 * When the Tone.Transport.loop = true, this is the ending position of the loop.
		 */
		public loopEnd: Time;
		/**
		 * When the Tone.Transport.loop = true, this is the starting position of the loop.
		 */
		public loopStart: Time;
		/**
		 * The Transport’s position in Bars:Beats:Sixteenths. Setting the value will jump to that position right away.
		 */
		public position: BarsBeatsSixteenths;
		/**
		 * The Transport’s loop position as a normalized value. Always returns 0 if the transport if loop is not true.
		 */
		public progress: NormalRange;
		/**
		 * The Transport’s loop position as a normalized value. Always returns 0 if the transport if loop is not true.
		 */
		public seconds: Seconds;
		/**
		 * Returns the playback state of the source, either “started”, “stopped”, or “paused”
		 */
		public state: "started" | "stopped" | "paused";
		/**
		 * The swing value. Between 0-1 where 1 equal to the note + half the subdivision.
		 */
		public swing: NormalRange;
		/**
		 * Set the subdivision which the swing will be applied to. The default value is an 8th note. Value must be less than a quarter note.
		 */
		public swingSubdivision: Time;
		/**
		 * The transports current tick position.
		 */
		public ticks: Ticks;
		/**
		 * The time signature as just the numerator over 4. For example 4/4 would be just 4 and 6/8 would be 3.
		 * @example
		 * //common time
		 * Tone.Transport.timeSignature = 4;
		 * // 7/8
		 * Tone.Transport.timeSignature = [7, 8];
		 * //this will be reduced to a single number
		 * Tone.Transport.timeSignature; //returns 3.5
		 */
		public timeSignature: number | Array<number>;

		/**
		 * Remove scheduled events from the timeline after the given time. Repeated events will be removed if their startTime is after the given time
		 *
		 * @param after Clear all events after this time.
		 */
		public cancel(after?: TransportTime): this;
		/**
		 * Clear the passed in event id from the timeline
		 *
		 * @param after The id of the event.
		 */
		public clear(eventId: number): this;
		/**
		 * Return the elapsed seconds at the given time.
		 *
		 * @param time When to get the elapsed seconds
		 */
		public getSecondsAtTime(time: Time): Seconds
		/**
		 * Get the clock’s ticks at the given time.
		 *
		 * @param time When to get the tick value
		 */
		public getTicksAtTime(time: Time): Ticks;
		/**
		 * Returns the time aligned to the next subdivision of the Transport. If the Transport is not started, it will return 0. Note: this will not work precisely during tempo ramps.
		 *
		 * @param time The subdivision to quantize to
		 * @example
		 * Tone.Transport.start(); //the transport must be started
		 * Tone.Transport.nextSubdivision("4n");
		 */
		public nextSubdivision(subdivision: Time): number;
		/**
		 * Pause the transport and all sources synced to the transport.
		 *
		 * @param time
		 */
		public pause(time?: Time): Ticks;
		/**
		 * Schedule an event along the timeline.
		 *
		 * @param callback The callback to be invoked at the time.
		 * @param time The time to invoke the callback at.
		 * @example
		 * //trigger the callback when the Transport reaches the desired time
		 * Tone.Transport.schedule(function(time){
		 * 	envelope.triggerAttack(time);
		 * }, "128i");
		 */
		public schedule(callback: Function, time: Time): number;
		/**
		 * Schedule an event that will be removed after it is invoked. Note that if the given time is less than the current transport time, the event will be invoked immediately.
		 *
		 * @param callback The callback to invoke once.
		 * @param time The time the callback should be invoked.
		 */
		public scheduleOnce(callback: Function, time: Time): number;
		/**
		 * Schedule a repeated event along the timeline. The event will fire at the interval starting at the startTime and for the specified duration.
		 *
		 * @param callback The callback to invoke.
		 * @param interval The duration between successive callbacks. Must be a positive number.
		 * @param startTime When along the timeline the events should start being invoked.
		 * @param duration How long the event should repeat.
		 * @example
		 * //a callback invoked every eighth note after the first measure
		 * Tone.Transport.scheduleRepeat(callback, "8n", "1m");
		 */
		public scheduleRepeat(callback: Function, interval: Time, startTime?: TransportTime, duration?: Time): number;
		/**
		 * Set the loop start and stop at the same time.
		 *
		 * @param startPosition
		 * @param endPosition
		 * @example
		 * //loop over the first measure
		 * Tone.Transport.setLoopPoints(0, "1m");
		 * Tone.Transport.loop = true;
		 */
		public setLoopPoints(startPosition: TransportTime, endPosition: TransportTime): this;
		/**
		 * Set the loop start and stop at the same time.
		 *
		 * @param time The time when the transport should start.
		 * @param offset The timeline offset to start the transport.
		 * @example
		 * //start the transport in one second starting at beginning of the 5th measure.
		 * Tone.Transport.start("+1", "4:0:0");
		 */
		public start(time?: Time, offset?: TransportTime): this;
		/**
		 * Set the loop start and stop at the same time.
		 *
		 * @param time The time when the transport should stop.
		 * @example
		 * Tone.Transport.stop();
		 */
		public stop(time?: Time): this;
		/**
		 * Attaches the signal to the tempo control signal so that any changes in the tempo will change the signal in the same ratio.
		 *
		 * @param signal
		 * @param ratio Optionally pass in the ratio between the two signals. Otherwise it will be computed based on their current values.
		 */
		public syncSignal(signal: Signal, ratio?: number): this;
		/**
		 * Toggle the current state of the transport. If it is started, it will stop it, otherwise it will start the Transport.
		 *
		 * @param time The time of the event
		 */
		public toggle(time: Time): this;
		/**
		 * Unsyncs a previously synced signal from the transport’s control. See Tone.Transport.syncSignal.
		 *
		 * @param signal The time of the event
		 */
		public unsyncSignal(signal: Signal): this;
	}

	/**
	 * Buffer loading and storage. Tone.Buffer is used internally by all classes that make requests for audio files such as Tone.Player, Tone.Sampler and Tone.Convolver. Aside from load callbacks from individual buffers, Tone.Buffer provides events which keep track of the loading progress of all of the buffers. These are Tone.Buffer.on(“load” / “progress” / “error”)
	 *
	 * @see https://tonejs.github.io/docs/r13/Buffer
	 */
	export class Buffer extends Tone {
	}

	// ======================
	// Types
	// ======================

	export enum Type {
		/**
		 *  Default units
		 */
		Default = "number",
		/**
		 *  Time can be described in a number of ways. Read more [Time](https://github.com/Tonejs/Tone.js/wiki/Time).
		 *
		 *  * Numbers, which will be taken literally as the time (in seconds).
		 *  * Notation, ("4n", "8t") describes time in BPM and time signature relative values.
		 *  * TransportTime, ("4:3:2") will also provide tempo and time signature relative times
		 *  in the form BARS:QUARTERS:SIXTEENTHS.
		 *  * Frequency, ("8hz") is converted to the length of the cycle in seconds.
		 *  * Now-Relative, ("+1") prefix any of the above with "+" and it will be interpreted as
		 *  "the current time plus whatever expression follows".
		 *  * Object, ({"4n" : 3, "8t" : -1}). The resulting time is equal to the sum of all of the keys multiplied by the values in the object.
		 *  * No Argument, for methods which accept time, no argument will be interpreted as
		 *  "now" (i.e. the currentTime).
		 */
		Time = "time",
		/**
		 *  Frequency can be described similar to time, except ultimately the
		 *  values are converted to frequency instead of seconds. A number
		 *  is taken literally as the value in hertz. Additionally any of the
		 *  Time encodings can be used. Note names in the form
		 *  of NOTE OCTAVE (i.e. C4) are also accepted and converted to their
		 *  frequency value.
		 */
		Frequency = "frequency",
		/**
		 *  TransportTime describes a position along the Transport's timeline. It is
		 *  similar to Time in that it uses all the same encodings, but TransportTime specifically
		 *  pertains to the Transport's timeline, which is startable, stoppable, loopable, and seekable.
		 *  [Read more](https://github.com/Tonejs/Tone.js/wiki/TransportTime)
		 */
		TransportTime = "transportTime",
		/**
		 *  Ticks are the basic subunit of the Transport. They are
		 *  the smallest unit of time that the Transport supports.
		 */
		Ticks = "ticks",
		/**
		 *  Normal values are within the range [0, 1].
		 */
		NormalRange = "normalRange",
		/**
		 *  AudioRange values are between [-1, 1].
		 */
		AudioRange = "audioRange",
		/**
		 *  Decibels are a logarithmic unit of measurement which is useful for volume
		 *  because of the logarithmic way that we perceive loudness. 0 decibels
		 *  means no change in volume. -10db is approximately half as loud and 10db
		 *  is twice is loud.
		 */
		Decibels = "db",
		/**
		 *  Half-step note increments, i.e. 12 is an octave above the root. and 1 is a half-step up.
		 */
		Interval = "interval",
		/**
		 *  Beats per minute.
		 */
		BPM = "bpm",
		/**
		 *  The value must be greater than or equal to 0.
		 */
		Positive = "positive",
		/**
		 *  Gain is the ratio between input and output of a signal.
		 *  A gain of 0 is the same as silencing the signal. A gain of
		 *  1, causes no change to the incoming signal.
		 */
		Gain = "gain",
		/**
		 *  A cent is a hundredth of a semitone.
		 */
		Cents = "cents",
		/**
		 *  Angle between 0 and 360.
		 */
		Degrees = "degrees",
		/**
		 *  A number representing a midi note.
		 */
		MIDI = "midi",
		/**
		 *  A colon-separated representation of time in the form of
		 *  Bars:Beats:Sixteenths.
		 */
		BarsBeatsSixteenths = "barsBeatsSixteenths",
		/**
		 *  Sampling is the reduction of a continuous signal to a discrete signal.
		 *  Audio is typically sampled 44100 times per second.
		 */
		Samples = "samples",
		/**
		 *  Hertz are a frequency representation defined as one cycle per second.
		 */
		Hertz = "hertz",
		/**
		 *  A frequency represented by a letter name,
		 *  accidental and octave. This system is known as
		 *  [Scientific Pitch Notation](https://en.wikipedia.org/wiki/Scientific_pitch_notation).
		 */
		Note = "note",
		/**
		 *  One millisecond is a thousandth of a second.
		 */
		Milliseconds = "milliseconds",
		/**
		 *  Seconds are the time unit of the AudioContext. In the end,
		 *  all values need to be evaluated to seconds.
		 */
		Seconds = "seconds",
		/**
		 *  A string representing a duration relative to a measure.
		 *  * "4n" = quarter note
		 *  * "2m" = two measures
		 *  * "8t" = eighth-note triplet
		 *  @typedef {Notation}
		 */
		Notation = "notation",
	}

	/**
	 * Gain is the ratio between input and output of a signal. A gain of 0 is the same as silencing the signal. A gain of 1, causes no change to the incoming signal.
	 *
	 * @see https://tonejs.github.io/docs/r13/Type#gain
	 */
	export type Gain = Param;

	/**
	 * Decibels are a logarithmic unit of measurement which is useful for volume because of the logarithmic way that we perceive loudness. 0 decibels means no change in volume. -10db is approximately half as loud and 10db is twice is loud.
	 *
	 * @see https://tonejs.github.io/docs/r13/Type#decibels
	 */
	export type Decibels = Param;

	/**
	 * Normal values are within the range [0, 1].
	 *
	 * @see https://tonejs.github.io/docs/r13/Type#normalrange
	 */
	export type NormalRange = Param;

	/**
	 * Beats per minute.
	 *
	 * @see https://tonejs.github.io/docs/r13/Type#bpm
	 */
	export type BPM = Param;

	/**
	 * A colon-separated representation of time in the form of Bars:Beats:Sixteenths.
	 *
	 * @see https://tonejs.github.io/docs/r13/Type#barsbeatssixteenths
	 */
	export type BarsBeatsSixteenths = string;

	/**
	 * Half-step note increments, i.e. 12 is an octave above the root. and 1 is a half-step up.
	 *
	 * @see https://tonejs.github.io/docs/r13/Type#interval
	 */
	export type Interval = number;

	/**
	 * Angle between 0 and 360.
	 *
	 * @see https://tonejs.github.io/docs/r13/Type#degrees
	 */
	export type Degrees = number;

	/**
	 * A string representing a duration relative to a measure. * “4n” = quarter note * “2m” = two measures * “8t” = eighth-note triplet
	 *
	 * @see https://tonejs.github.io/docs/r13/Type#notation
	 */
	export type Notation = string;

	/**
	 * A frequency represented by a letter name, accidental and octave. This system is known as Scientific Pitch Notation.
	 *
	 * @see https://tonejs.github.io/docs/r13/Type#note
	 */
	export type Note = string;

	/**
	 * The value must be greater than or equal to 0.
	 *
	 * @see https://tonejs.github.io/docs/r13/Type#positive
	 */
	export type Positive = number;

	/**
	 * Sampling is the reduction of a continuous signal to a discrete signal. Audio is typically sampled 44100 times per second.
	 *
	 * @see https://tonejs.github.io/docs/r13/Type#samples
	 */
	export type Samples = string;

	/**
	 * Seconds are the time unit of the AudioContext. In the end, all values need to be evaluated to seconds.
	 *
	 * @see https://tonejs.github.io/docs/r13/Type#seconds
	 */
	export type Seconds = string;

	/**
	 * Ticks are the basic subunit of the Transport. They are the smallest unit of time that the Transport supports.
	 *
	 * @see https://tonejs.github.io/docs/r13/Type#ticks
	 */
	export type Ticks = number;

	/**
	 * Time can be described in a number of ways. Read more [Time](https://github.com/Tonejs/Tone.js/wiki/Time). * Numbers, which will be taken literally as the time (in seconds). * Notation, (“4n”, “8t”) describes time in BPM and time signature relative values. * TransportTime, (“4:3:2”) will also provide tempo and time signature relative times in the form BARS:QUARTERS:SIXTEENTHS. * Frequency, (“8hz”) is converted to the length of the cycle in seconds. * Now-Relative, (“+1”) prefix any of the above with “+” and it will be interpreted as “the current time plus whatever expression follows”. * Object, ({“4n” : 3, “8t” : -1}). The resulting time is equal to the sum of all of the keys multiplied by the values in the object. * No Argument, for methods which accept time, no argument will be interpreted as “now” (i.e. the currentTime).
	 *
	 * @see https://tonejs.github.io/docs/r13/Type#time
	 */
	export type Time = number | string | TimeObject;

	export type TimeObject = {
		h: number,
		m: number,
		s: number,
		ms: number,
	};

	/**
	 * TransportTime describes a position along the Transport’s timeline. It is similar to Time in that it uses all the same encodings, but TransportTime specifically pertains to the Transport’s timeline, which is startable, stoppable, loopable, and seekable.
	 *
	 * @see https://tonejs.github.io/docs/r13/Type#transporttime
	 */
	export type TransportTime  = string;

	// ======================
	// Source
	// ======================

	/**
	 * Tone.AudioNode is the base class for classes which process audio. AudioNodes have inputs and outputs.
	 *
	 * @see https://tonejs.github.io/docs/r13/AudioNode
	 */
	export class Source extends AudioNode {
		/**
		 * The fadeIn time of the amplitude envelope.
		 */
		public fadeIn: Time;
		/**
		 * The fadeOut time of the amplitude envelope.
		 */
		public fadeOut: Time;
		/**
		 * Mute the output.
		 * @example
		 * //mute the output
		 * source.mute = true;
		 */
		public mute: boolean;
		/**
		 * Returns the playback state of the source, either “started” or “stopped”.
		 */
		public readonly state: "started" | "stopped";
		/**
		 * The volume of the output in decibels.
		 */
		public readonly volume: Decibels;

		/**
		 * Start the source at the specified time. If no time is given, start the source now.
		 *
		 * @param time When the source should be started.
		 * @example
		 * source.start("+0.5"); //starts the source 0.5 seconds from now
		 */
		public start(time?: Time): this;
		/**
		 * Stop the source at the specified time. If no time is given, stop the source now.
		 *
		 * @param time When the source should be stopped.
		 * @example
		 * source.stop(); // stops the source immediately
		 */
		public stop(time?: Time): this;
		/**
		 * Sync the source to the Transport so that all subsequent calls to start and stop are synced to the TransportTime instead of the AudioContext time.
		 *
		 * @example
		 * //sync the source so that it plays between 0 and 0.3 on the Transport's timeline
		 * source.sync().start(0).stop(0.3);
		 * //start the transport.
		 * Tone.Transport.start();
		 * //start the transport with an offset and the sync'ed sources
		 * //will start in the correct position
		 * source.sync().start(0.1);
		 * //the source will be invoked with an offset of 0.4
		 * Tone.Transport.start("+0.5", 0.5);
		 */
		public sync(): this;
		/**
		 * Unsync the source to the Transport. See Tone.Source.sync
		 */
		public unsync(): this;
	}

	/**
	 * Tone.Player is an audio file player with start, loop, and stop functions.
	 *
	 * @see https://tonejs.github.io/docs/r13/Player
	 */
	export class Player extends Source {
		/**
		 * @param url Either the AudioBuffer or the url from which to load the AudioBuffer
		 * @param onload The function to invoke when the buffer is loaded. Recommended to use Tone.Buffer.on(‘load’) instead.
		 */
		constructor(url: string | AudioBuffer, onload?: Function);
		/**
		 * If the file should play as soon as the buffer is loaded.
		 * @example
		 * //will play as soon as it's loaded
		 * var player = new Tone.Player({
		 *	 "url" : "./path/to/sample.mp3",
		 *	 "autostart" : true,
		 * }).toMaster();
		 */
		public autostart: boolean;
		/**
		 * The audio buffer belonging to the player.
		 */
		public buffer: Buffer;
		/**
		 * The fadeIn time of the amplitude envelope.
		 */
		public fadeIn: Time;
		/**
		 * The fadeOut time of the amplitude envelope.
		 */
		public fadeOut: Time;
		/**
		 * If all the buffer is loaded
		 */
		public loaded: boolean;
		/**
		 * If the buffer should loop once it’s over.
		 */
		public loop: boolean;
		/**
		 * If loop is true, the loop will end at this position.
		 */
		public loopEnd: Time;
		/**
		 * If loop is true, the loop will start at this position.
		 */
		public loopStart: Time;
		/**
		 * The playback speed. 1 is normal speed. This is not a signal because Safari and iOS currently don’t support playbackRate as a signal.
		 */
		public playbackRate: number;
		/**
		 * The direction the buffer should play in
		 */
		public reverse: boolean;

		/**
		 * Load the audio file as an audio buffer. Decodes the audio asynchronously and invokes the callback once the audio buffer loads. Note: this does not need to be called if a url was passed in to the constructor. Only use this if you want to manually load a new url.
		 *
		 * @param url The url of the buffer to load. Filetype support depends on the browser.
		 * @param callback The function to invoke once the sample is loaded.
		 */
		public load(url: string, callback: Function): Promise<void>;
		/**
		 * Stop and then restart the player from the beginning (or offset)
		 *
		 * @param startTime When the player should start.
		 * @param offset The offset from the beginning of the sample to start at.
		 * @param duration How long the sample should play. If no duration is given, it will default to the full length of the sample (minus any offset)
		 */
		public restart(startTime?: Time, offset?: Time, duration?: Time): this;
		/**
		 * Seek to a specific time in the player’s buffer. If the source is no longer playing at that time, it will stop. If you seek to a time that
		 *
		 * @param offset When the player should start.
		 * @param time The time for the seek event to occur.
		 * @example
		 * source.start(0.2);
		 * source.stop(0.4);
		 */
		public seek(offset: Time, time?: Time): this;
		/**
		 * Seek to a specific time in the player’s buffer. If the source is no longer playing at that time, it will stop. If you seek to a time that
		 *
		 * @param loopStart The loop end time
		 * @param loopEnd The loop end time
		 * @example
		 * //loop 0.1 seconds of the file.
		 * player.setLoopPoints(0.2, 0.3);
		 * player.loop = true;
		 */
		public setLoopPoints(loopStart: Time, loopEnd: Time): this;
		/**
		 * Play the buffer at the given startTime. Optionally add an offset and/or duration which will play the buffer from a position within the buffer for the given duration.
		 *
		 * @param startTime When the player should start.
		 * @param offset The offset from the beginning of the sample to start at.
		 * @param duration How long the sample should play. If no duration is given, it will default to the full length of the sample (minus any offset)
		 */
		public start(startTime?: Time, offset?: Time, duration?: Time): this;
	}

	// ======================
	// Instrument
	// ======================

	/**
	 * Base-class for all instruments
	 *
	 * @see https://tonejs.github.io/docs/r13/Instrument
	 */
	export class Instrument extends AudioNode {

	}

	/**
	 * This is an abstract base class for other monophonic instruments to extend. IMPORTANT: It does not make any sound on its own and shouldn’t be directly instantiated.
	 *
	 * @see https://tonejs.github.io/docs/r13/Monophonic
	 */
	export class Monophonic extends Instrument {

	}

	/**
	 * Tone.Synth is composed simply of a Tone.OmniOscillator routed through a Tone.AmplitudeEnvelope.
	 *
	 * @see https://tonejs.github.io/docs/r13/Synth
	 */
	export class Synth extends Monophonic {
	}

	// ======================
	// Signal
	// ======================

	/**
	 * A signal is an audio-rate value. Tone.Signal is a core component of the library. Unlike a number, Signals can be scheduled with sample-level accuracy. Tone.Signal has all of the methods available to native Web Audio AudioParam as well as additional conveniences. Read more about working with signals here.
	 *
	 * @see https://tonejs.github.io/docs/r13/Signal
	 */
	export class Signal extends Param {

	}
}

/**
 * Tone is the base class of all other classes.
 *
 * @see https://tonejs.github.io/docs/r13/Tone
 */
declare class Tone {
	/**
	 * Get the audio context belonging to this instance.
	 */
	public readonly context: Tone.Context;

	public static Transport: Tone.TransportConstructor;
	public static Master: Tone.MasterConstructor;

	/**
	 * Return the current time of the AudioContext clock without any lookAhead.
	 */
	public static immediate(): number;
	/**
	 * Convert an interval (in semitones) to a frequency ratio.
	 */
	public static intervalToFrequencyRatio(interval: Tone.Interval): number;
	/**
	 * Returns a Promise which resolves when all of the buffers have loaded
	 */
	public static loaded(): Promise<void>;
	/**
	 * Return the current time of the AudioContext clock plus the lookAhead.
	 */
	public static now(): number;
	/**
	 * Most browsers will not play any audio until a user clicks something (like a play button). Invoke this method on a click or keypress event handler to start the audio context. More about the Autoplay policy [here](https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio)
	 */
	public static start (): Promise<void>;
}

declare module 'tone' {

	export = Tone;
}
