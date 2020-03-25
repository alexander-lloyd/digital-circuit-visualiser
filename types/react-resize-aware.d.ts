declare module 'react-resize-aware' {
    const useResizeAware: () => [JSX.Element, {
        height: number;
        width: number;
    }];

    export = useResizeAware;
}
