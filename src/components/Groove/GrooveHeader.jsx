import React from "react";
import {
  GrooveHeaderWrap,
  GrooveHeaderLogo,
  GrooveHeaderIconWrap,
  GrooveHeaderIconHome,
  GrooveHeaderIconWrite,
  GrooveHeaderIconMy
} from "../../style/GrooveHeaderStyle";
import GrooveAuth from "./GrooveAuth";

function GrooveHeader() {
  return (
    <>
      <GrooveHeaderWrap>
        <GrooveHeaderLogo>Groove</GrooveHeaderLogo>

        <GrooveHeaderIconWrap>
          <GrooveAuth />
          <GrooveHeaderIconHome />
          <GrooveHeaderIconWrite />
          <GrooveHeaderIconMy />
        </GrooveHeaderIconWrap>
      </GrooveHeaderWrap>
    </>
  );
}

export default GrooveHeader;
