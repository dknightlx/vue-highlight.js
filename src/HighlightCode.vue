<script>
import * as hljs from 'highlight.js';

import { escape, getSlotText, indentCode } from '@/lib';

import '@/assets/code-pre.css';

export default {
	name: 'highlight-code',
	props: {
		lang: String,
		inline: {
			type: Boolean,
			default: false
		},
		code: String,
		auto: Boolean,
		ln: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			inlineStyles: {
				'display': `inline !important`,
				'vertical-align': `middle`
			}
		};
	},
	computed: {
		hasCode() {
			return (typeof this.code === 'string') && (this.code.length > 0);
		}
	},
	render(createElement) {
		let hasCode = this.hasCode;
		let lang = this.lang;
		let inline = this.inline;
		let code = hasCode ? this.code : getSlotText(this.$slots.default); // If no `code`, get text from default slot.
		let auto = this.auto;
		let ln = this.ln;
		code = !inline ? indentCode(code) : code; // Don't indent code if in inline mode.
		let highlightedCode, codeLine = '';
		if (auto) {
			({ language: lang, value: highlightedCode } = hljs.highlightAuto(code));
		} else {
			highlightedCode = lang ? hljs.highlight(lang, code).value : escape(code); // If no `lang`, just display plain code.
		}
		if (ln) {
			codeLine = highlightedCode.split('\n').map(function(val, index) {
				return `<li class="code-pre-item">${index}</li>`;
			}).join('');
		}
		return createElement(
			!inline ? 'pre' : 'span',
			{
				'class': [
					'code-container'
				]
			},
			[
				ln && createElement(
					'ul', {
					'class': [
						'code-pre'
					],
					domProps: {
						innerHTML: codeLine
					}
				}),
				createElement('code', {
					'class': [
						'hljs',
						'code-box',
						...(lang ? [lang] : [])
					],
					style: inline ? this.inlineStyles : {},
					domProps: {
						innerHTML: highlightedCode
					}
				})
				
			]
		);
	}
};
</script>
