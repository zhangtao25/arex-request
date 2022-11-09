// @ts-nocheck
import { useEffect, useState } from 'react';
import { EditorView } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import { EditorState, StateEffect } from '@codemirror/state';
import { getStatistics } from './utils';
import { oneDark } from '@codemirror/theme-one-dark';
export function useCodeMirror(props) {
    const { value, initialState, root, onCreateEditor, theme = 'light', extensions, height, onStatistics, onChange, } = props;
    const [container, setContainer] = useState();
    const [view, setView] = useState();
    const [state, setState] = useState();
    const defaultLightThemeOption = EditorView.theme({
        '&': {
            backgroundColor: '#fff',
        },
        '.cm-scroller': {
            fontFamily: '"Roboto Mono", monospace',
            fontSize: '14px',
        },
    }, {
        dark: false,
    });
    const defaultThemeOption = EditorView.theme({
        '&': {
            height,
        },
    });
    const updateListener = EditorView.updateListener.of((vu) => {
        if (vu.docChanged && typeof onChange === 'function') {
            const doc = vu.state.doc;
            const value = doc.toString();
            onChange(value, vu);
        }
        onStatistics && onStatistics(getStatistics(vu));
    });
    let getExtensions = [updateListener, defaultThemeOption];
    getExtensions.unshift(basicSetup); //存疑
    switch (theme) {
        case 'light':
            getExtensions.push(defaultLightThemeOption);
            break;
        case 'dark':
            getExtensions.push(oneDark);
            break;
        default:
            getExtensions.push(theme);
            break;
    }
    getExtensions = getExtensions.concat(extensions);
    useEffect(() => {
        if (container && !state) {
            const config = {
                doc: value,
                extensions: getExtensions,
            };
            const stateCurrent = initialState
                ? EditorState.fromJSON(initialState.json, config, initialState.fields)
                : EditorState.create(config);
            setState(stateCurrent);
            if (!view) {
                const viewCurrent = new EditorView({
                    state: stateCurrent,
                    parent: container,
                    root,
                });
                setView(viewCurrent);
                onCreateEditor && onCreateEditor(viewCurrent, stateCurrent);
            }
        }
        return () => {
            if (view) {
                setState(undefined);
                setView(undefined);
            }
        };
    }, [container, state]);
    useEffect(() => setContainer(props.container), [props.container]);
    // view改变，更新
    useEffect(() => () => {
        if (view) {
            view.destroy();
            setView(undefined);
        }
    }, [view]);
    // 外部配置改变，更新
    useEffect(() => {
        if (view) {
            view.dispatch({ effects: StateEffect.reconfigure.of(getExtensions) });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme, extensions, height]);
    // 外部value改变，更新
    useEffect(() => {
        const currentValue = view ? view.state.doc.toString() : '';
        if (view && value !== currentValue) {
            view.dispatch({
                changes: { from: 0, to: currentValue.length, insert: value || '' },
            });
        }
    }, [value, view]);
    return { state, setState, view, setView, container, setContainer };
}
