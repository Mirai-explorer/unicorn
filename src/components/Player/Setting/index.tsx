import {styled} from "styled-components";
import React, {SetStateAction, useEffect, useState} from "react";


const SettingWrap =
    styled.div`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      -webkit-backdrop-filter: blur(8px) contrast(0.5);
      backdrop-filter: blur(8px) contrast(0.5);
      background: rgba(255,255,255,.3);
      z-index: 999;
      content-visibility: auto;

      &.show {
        display: block;
      }
    `

const SettingStack =
    styled.div`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    `

const SettingCard =
    styled.div`
      width: 90vw;
      background: #ffffff;
      height: 90vh;
      border-radius: 0.5rem;
      box-shadow: 1px 2px 4px rgba(0,0,0,.1);
      color: black;
      display: flex;
      flex-direction: column;
      padding: 24px;
      font-size: 16px;
      gap: 16px;
    `

const SettingCardTitle =
    styled.div`
      display: flex;
      align-items: center;
      width: 100%;
      height: 40px;
      gap: 16px;
    `

const SettingCardContent =
    styled.div`
      display: block;
      overflow: auto;
      flex: 1;
    `

const Setting = ({isShowing, setIsShowing} : {
    isShowing: boolean,
    setIsShowing: React.Dispatch<SetStateAction<boolean>>,
}) => {

    return(
        <SettingWrap className={`${isShowing?'show':'hidden'}`}>
            <SettingStack>
                <SettingCard>
                    <SettingCardTitle>
                        <div onClick={() => {setIsShowing(false)}}>×</div>
                        <div>实验性选项</div>
                    </SettingCardTitle>
                    <SettingCardContent>
                        <div>Checkbox1</div>
                        <div>Checkbox2</div>
                    </SettingCardContent>
                </SettingCard>
            </SettingStack>
        </SettingWrap>
    )
}

export default Setting;