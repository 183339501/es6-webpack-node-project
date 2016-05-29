/**
 * Created by pengyao on 16/5/28.
 */
import marked from 'marked';
import HighLight from "highlight.js";
import xss from "xss";

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});

marked.setOptions({
    highlight: function (code) {
        return HighLight.highlightAuto(code).value;
    }
});
const xssOptions = {
    whiteList: Object.assign({}, xss.whiteList)
};
xssOptions.whiteList.code = ['class'];
xssOptions.whiteList.p = ['class'];
xssOptions.whiteList.span = ['class'];
const myxss = new xss.FilterXSS(xssOptions);

export function markdownParse(text) {
    return myxss.process(marked(text));
}

