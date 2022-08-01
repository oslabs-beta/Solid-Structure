import type { Accessor, JSXElement, Setter } from 'solid-js';
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
    caches: Accessor<object[]>,
    setCaches: Setter<object[]>,
};
export type SignalListComponent = Component<SignalListProps>;

/* Graph.tsx */
type GraphProps = {
    tab: Accessor<TabType>,
    orientation: Accessor<OrientType>,
    boxsize?: Accessor<number>
};
export type GraphComponent = Component<GraphProps>;

/* GraphBox.tsx */
type GraphBoxProps = {
    
};
export type GraphBoxComponent = Component<GraphBoxProps>;
export type DiagonalLink = {
    source: { x: number; y: number };
    target: { x: number; y: number };
};

/* LogMonitor.tsx */
type LogMonitorProps = {
    record: Accessor<boolean>,
    setRecord: Setter<boolean>,
    caches: Accessor<object[]>,
    setCaches: Setter<object[]>,
};
export type LogMonitorComponent = Component<LogMonitorProps>;

/* Navbar.tsx */
type NavbarProps = {
    tab: Accessor<TabType>,
    setTab: Setter<TabType>
};
export type NavbarComponent = Component<NavbarProps>;

/* Log.tsx */
type LogProps = {
    cache: object
}
export type LogComponent = Component<LogProps>;
