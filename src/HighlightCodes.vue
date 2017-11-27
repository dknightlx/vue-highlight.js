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
		code: Array,
		auto: Boolean,
		ln: {
			type: Boolean,
			default: true
		},
		start: {
			type: Number,
			default: 0
		},
		remark: {
			type: Array,
			default: []
		},
	},
	data() {
		return {
		};
	},
	computed: {
		hasCode() {
			return (Array.isArray(this.code)) && (this.code.length > 0);
		}
	},
	render(createElement) {
		let hasCode = this.hasCode;
		let lang = this.lang;
		let inline = this.inline;
		let code = hasCode ? this.code : []; // If no `code`, get text from default slot.
		let auto = this.auto;
		let ln = this.ln;
		let highlightedCode, codeLines = [];
        highlightedCode = code.map((str, index) => {
            let codeOneLine = '';
            if (auto) {
                ({ language: lang, value: codeOneLine } = hljs.highlightAuto(str));
            } else {
                codeOneLine = lang ? hljs.highlight(lang, str).value : escape(str); // If no `lang`, just display plain code.
            }
            codeLines.push(`<li class="code-pre-item">${this.start + index}</li>`);
            return codeOneLine ? `<li class="code-li ${this.remark.indexOf(this.start + index) > -1 ? 'code-remark' : 'code-no-remark'}"><code class="hljs ${lang}">${codeOneLine}</code></li>` : '';
        }).join('');
		return createElement(
			'pre',
			{
				'class': [
					'code-container'
				],
			},
			[
				ln && createElement(
					'ul' , {
					'class': [
						'codes-pre'
					],
					domProps: {
						innerHTML: codeLines.join('')
					}
				}),
				createElement('ul', {
					'class': [
                        'code-ul',
						...(lang ? [lang] : [])
					],
					domProps: {
						innerHTML: highlightedCode
					}
				})
				
			]
		);
	}
};
</script>
