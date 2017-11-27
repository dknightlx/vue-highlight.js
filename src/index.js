import HighlightCode from './HighlightCode';
import HighlightCodes from './HighlightCodes';

import './languages';

/**
 * Install Vue Highlight.js as plugin.
 *
 * @param {Vue} Vue
 */
function install(Vue) {
	Vue.component('highlight-code', HighlightCode);
	Vue.component('highlight-codes', HighlightCodes);
}

if ((typeof window !== 'undefined') && window.Vue) {
	install(window.Vue);
}

export default {
	install
};
