interface IProps {
    fill?: string;
}

const Pause = (props: IProps) => (
    <svg
        className="icon-pause"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill={props.fill || '#ffffff'}
    >
        <path d="M735.9 64.9c-51.2 0-96 44.7-96 95.8v702.6c0 51.1 44.8 95.8 96 95.8s96-44.7 96-95.8V160.7c0-51.1-44.8-95.8-96-95.8z m-447.8 0c-51.2 0-96 44.7-96 95.8v702.6c0 51.1 44.8 95.8 96 95.8s96-44.7 96-95.8V160.7c-0.1-51.1-44.9-95.8-96-95.8z"></path>
    </svg>
);

export default Pause;