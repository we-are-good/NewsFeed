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
import { useNavigate } from "react-router-dom";

function GrooveHeader() {
  const navigate = useNavigate();

  return (
    <>
      <GrooveHeaderWrap>
        <GrooveHeaderLogo onClick={() => navigate("/")}>Groove</GrooveHeaderLogo>
        <GrooveHeaderIconWrap>
          <GrooveAuth />
          <div>
            <GrooveHeaderIconHome onClick={() => navigate("/")}>
              <i className="fa-solid fa-house" />
            </GrooveHeaderIconHome>
            <GrooveHeaderIconWrite onClick={() => navigate("/write")}>
              <i className="fa-solid fa-pen" />
            </GrooveHeaderIconWrite>
            <GrooveHeaderIconMy>
              <i className="fa-solid fa-user" />
            </GrooveHeaderIconMy>
          </div>
        </GrooveHeaderIconWrap>
      </GrooveHeaderWrap>
    </>
  );
}

export default GrooveHeader;
