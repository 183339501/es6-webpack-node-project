/**
 * Created by pengyao on 16/5/28.
 */
import marked from 'marked';
import HighLight from "highlight.js";

marked.setOptions({
    highlight: function (code) {
        return HighLight.highlightAuto(code).value;
    }
});
export function markdownParse(text) {
    return marked(text);
}