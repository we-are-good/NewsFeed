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
          <GrooveHeaderIconHome />
          <GrooveHeaderIconWrite />
          <GrooveHeaderIconMy />
          <GrooveAuth />
        </GrooveHeaderIconWrap>
      </GrooveHeaderWrap>
    </>
  );
}

export default GrooveHeader;
