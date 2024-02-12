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
          <GrooveHeaderIconHome>
            <i class="fa-solid fa-house"></i>
          </GrooveHeaderIconHome>
          <GrooveHeaderIconWrite>
            <i class="fa-solid fa-pen"></i>
          </GrooveHeaderIconWrite>
          <GrooveHeaderIconMy />
        </GrooveHeaderIconWrap>
      </GrooveHeaderWrap>
    </>
  );
}

export default GrooveHeader;
