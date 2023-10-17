interface IProps {
    fill?: string;
}
const Next = (props: IProps) => (
    <svg
        className="icon-next"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill={props.fill || '#ffffff'}
    >
        <path d="M91.009 992.703c-10.595-5.485-17.19-15.925-17.19-27.269l0-920.117c0-11.312 6.59599999-21.752 17.19-27.237 10.594-5.515 23.553-5.172 33.814 0.841l703.081 460.074c9.728 5.703 15.591 15.643 15.591 26.396 0 10.71999999-5.863 20.693-15.59100001 26.396l-703.08099999 460.074c-5.397 3.148-11.527 4.737-17.69 4.737-5.53 0-11.094-1.27800001-16.124-3.895z"></path>
        <path d="M792.524 928.009l0-852.001c0-42.032 36.4-76.007 81.252-76.007 44.85000001 0 81.252 33.97500001 81.252 76.007l0 852.001c0 41.95499999-36.4 76.007-81.252 76.007s-81.252-34.051-81.252-76.007z"></path>
    </svg>
);

export default Next;