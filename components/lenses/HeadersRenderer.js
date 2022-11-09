import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import LensesHeadersRendererEntry from './HeadersRendererEntry';
const LensesHeadersRenderer = ({ headers }) => {
    console.log(headers, 'headers');
    return (_jsx("div", { children: [].map((header, index) => {
            return _jsx(LensesHeadersRendererEntry, { header: header }, index);
        }) }));
};
export default LensesHeadersRenderer;
