import type { Accessor, Setter } from 'solid-js';
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

/* Inspect.tsx */
type InspectProps = {
    record: Accessor<boolean>,
    setRecord: Setter<boolean>,
    caches: Accessor<object[]>,
    setCaches: Setter<object[]>,
};
export type InspectComponent = Component<InspectProps>;

/* Graph.tsx */
type GraphProps = {
    tab: Accessor<TabType>,
    orientation: Accessor<OrientType>,
    boxsize?: Accessor<number>
};
export type GraphComponent = Component<GraphProps>;

/* GraphBox.tsx */
type GraphBoxProps = {
    type: string
};
export type GraphBoxComponent = Component<GraphBoxProps>;

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
