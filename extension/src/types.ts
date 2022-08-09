import type { Accessor, JSXElement, Setter, getOwner } from 'solid-js';
import type { JSX, Component } from 'solid-js';

/* GLOBAL TYPE */
export type TabType = 'inspector' | 'graph' | 'logmonitor';
export type OrientType = 'vertical' | 'horizontal';
export type HandleClick = JSX.EventHandler<HTMLInputElement, MouseEvent>;

/* App.tsx */
export type SolidComponent = Component;

/* Header.tsx */
type HeaderProps = {
    tab: Accessor<TabType>,
    orientation: Accessor<OrientType>, 
    setOrientation: Setter<OrientType>,
};
export type HeaderComponent = Component<HeaderProps>;

/* SignalList.tsx */
type SignalListProps = {
    root: NonNullable<ReturnType<typeof getOwner>>,
    selectedSig: Accessor<object>,
    setSelectedSig: Setter<object>,
    sigIds: object,
};
export type SignalListComponent = Component<SignalListProps>;

/* Signal.tsx */
type SignalProps = {
    sigId: string,
    signal: object,
    selectedSig: Accessor<object>,
    setSelectedSig: Setter<object>,
}
export type SignalComponent = Component<SignalProps>;

/* Graph.tsx */
type GraphProps = {
    tab: Accessor<TabType>,
    orientation: Accessor<OrientType>,
    boxsize?: Accessor<number>,
    selectedSig: Accessor<object>,
    setSelectedSig: Setter<object>,
    rootTree: NonNullable<ReturnType<typeof getOwner>>,
};
export type GraphComponent = Component<GraphProps>;

/* GraphBox.tsx */
type GraphBoxProps = {
    selectedSig: Accessor<object>,
    // rootTree: NonNullable<ReturnType<typeof getOwner>>,
    rootTree: Accessor<object>,
};
export type GraphBoxComponent = Component<GraphBoxProps>;
export type DiagonalLink = {
    source: { x: number; y: number },
    target: { x: number; y: number },
};

/* LogMonitor.tsx */
type LogMonitorProps = {
    record: Accessor<boolean>,
    setRecord: Setter<boolean>,
    logs: Accessor<object[]>,
    setLogs: Setter<object[]>,
    sigIds: object,
};
export type LogMonitorComponent = Component<LogMonitorProps>;

/* Log.tsx */
type LogProps = {
    sigName: string,
    log: object,
}
export type LogComponent = Component<LogProps>;

/* Navbar.tsx */
type NavbarProps = {
    tab: Accessor<TabType>,
    setTab: Setter<TabType>,
};
export type NavbarComponent = Component<NavbarProps>;