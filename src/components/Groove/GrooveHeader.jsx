import React from "react";
import {
  GrooveHeaderWrap,
  GrooveHeaderLogo,
  GrooveHeaderIconWrap,
  GrooveHeaderIconHome,
  GrooveHeaderIconWrite,
  GrooveHeaderIconMy
} from "../../style/GrooveHeaderStyle";
function GrooveHeader() {
  return (
    <>
      <GrooveHeaderWrap>
        <GrooveHeaderLogo>Groove</GrooveHeaderLogo>

        <GrooveHeaderIconWrap>
          <GrooveHeaderIconHome />
          <GrooveHeaderIconWrite />
          <GrooveHeaderIconMy />
        </GrooveHeaderIconWrap>
      </GrooveHeaderWrap>
    </>
  );
}

export default GrooveHeader;
