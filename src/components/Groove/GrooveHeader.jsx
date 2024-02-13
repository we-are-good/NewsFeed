import React from "react";
import {
  GrooveHeaderWrap,
  GrooveHeaderLogo,
  GrooveHeaderIconWrap,
  GrooveHeaderIconHome,
  GrooveHeaderIconWrite,
  GrooveHeaderIconMy
} from "../../style/GrooveHeaderStyle";
import { useNavigate } from "react-router-dom";
function GrooveHeader() {
  const navigate = useNavigate();

  return (
    <>
      <GrooveHeaderWrap>
        <GrooveHeaderLogo onClick={() => navigate("/")}>Groove</GrooveHeaderLogo>
        <GrooveHeaderIconWrap>
          <GrooveHeaderIconHome onClick={() => navigate("/")}>
            <i className="fa-solid fa-house"></i>
          </GrooveHeaderIconHome>
          <GrooveHeaderIconWrite onClick={() => navigate("/write")}>
            <i className="fa-solid fa-pen"></i>
          </GrooveHeaderIconWrite>
          <GrooveHeaderIconMy />
        </GrooveHeaderIconWrap>
      </GrooveHeaderWrap>
    </>
  );
}

export default GrooveHeader;
