
import { Prop, Vue, Watch } from 'vue-property-decorator';

/**
 Usage:

 parent:
 <my-component v-model="someProperty"></my-component>

 this:
 <some-input v-model="inputValue"></some-input>
 */

export default class VueModel<T> extends Vue {
	@Prop() public readonly value!: T;
	// tslint:disable-next-line: readonly-keyword
	public inputValue: T = this.value;

	@Watch('inputValue')
	public inputValueWatcher(value: T): void {
		this.$emit('input', value);
	}
}
