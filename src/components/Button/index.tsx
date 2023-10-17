import styled from "styled-components";

type propsType = {
    name: string;
    size: string;
    plate: boolean;
}

const ButtonWrap =
    styled.button`
      -webkit-appearance: none;
      background: none;
      border: none;
      cursor: pointer;
    `

const Button = (props: propsType) => {
    return (
        <ButtonWrap
            type="button"
            data-size={props.size}
            data-plate={props.plate}
        >

        </ButtonWrap>
    )
}

export default Button;