import { ProgressBar } from './ProgressBar';
import { ControlButtons } from './ControlButtons';
import { SideButtons } from './SideButtons';

export function PlayerControls() {
    return (
        <section className="controls">
            <ProgressBar />

            <div className="control_area">
                <SideButtons />
                <ControlButtons />
                <SideButtons position="right" />
            </div>
        </section>
    );
}
